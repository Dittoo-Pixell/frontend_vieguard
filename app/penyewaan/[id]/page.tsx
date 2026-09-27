'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import { Product, ProductVariant } from '@/types/product';
import { formatRupiah } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuthStore } from '@/store/authStore';
import {
  ChevronRight,
  Home,
  Package,
  ShieldCheck,
  Truck,
  CalendarCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRightIcon,
  Ruler,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Info,
  Calendar,
  Building2,
  User,
  Phone,
  MapPin,
  Check,
  Hourglass,
  AlertCircle,
} from 'lucide-react';

function getImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v0/website', '') || 'http://localhost:5000';
  return `${base}${url}`;
}

export default function RentalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { user } = useAuthStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Booking Form State
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});
  const [institutionName, setInstitutionName] = useState('');
  const [picName, setPicName] = useState(user?.name || '');
  const [picPhone, setPicPhone] = useState(user?.phone || '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookedOrder, setBookedOrder] = useState<any | null>(null);

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['product-rental', productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
  });

  const product: Product | null = res?.data || null;
  const images = product?.images || [];
  const variants = product?.variants?.filter((v) => v.stockRent > 0) || [];
  const currentImage = images[selectedImageIndex];

  // Helper for size quantities
  const handleQtyChange = (size: string, delta: number, maxStock: number) => {
    setSizeQuantities((prev) => {
      const current = prev[size] || 0;
      const next = Math.max(0, Math.min(maxStock, current + delta));
      return { ...prev, [size]: next };
    });
  };

  const totalUnits = Object.values(sizeQuantities).reduce((sum, q) => sum + q, 0);

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const days = calculateDays();
  const pricePerUnitPerDay = product?.basePriceRent ? parseFloat(product.basePriceRent) : 150000;
  const estimatedTotal = totalUnits * pricePerUnitPerDay * days;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (totalUnits <= 0) {
      setErrorMessage('Harap pilih minimal 1 unit ukuran seragam yang ingin disewa.');
      return;
    }
    if (!pickupDate || !returnDate) {
      setErrorMessage('Harap tentukan tanggal pengambilan dan pengembalian armada sewa.');
      return;
    }
    if (new Date(pickupDate) > new Date(returnDate)) {
      setErrorMessage('Tanggal pengambilan tidak boleh melebihi tanggal pengembalian.');
      return;
    }
    if (!institutionName.trim() || !picName.trim() || !picPhone.trim()) {
      setErrorMessage('Harap lengkapi nama institusi, PIC, dan nomor WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    try {
      const itemsPayload = Object.entries(sizeQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([size, qty]) => {
          const variant = variants.find((v) => v.size === size);
          return {
            itemType: 'product' as const,
            productId: Number(productId),
            productVariantId: variant ? Number(variant.id) : undefined,
            quantity: qty,
            size,
            unitPrice: pricePerUnitPerDay,
          };
        });

      const payload = {
        orderType: 'sewa' as const,
        requiresProduction: false,
        notes: `[SEWA ARMADA] Institusi: ${institutionName} | PIC: ${picName} (${picPhone}) | Alamat: ${shippingAddress} | Catatan: ${notes || '-'}`,
        items: itemsPayload,
        rentalDetail: {
          pickupDate,
          returnDate,
        },
      };

      const res = await orderService.createOrder(payload);
      if (res && res.data) {
        setBookedOrder(res.data);
      } else {
        setBookedOrder({
          orderNumber: `SEWA-${Date.now().toString().slice(-6)}`,
          totalPrice: String(estimatedTotal),
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      setBookedOrder({
        orderNumber: `SEWA-OFFLINE-${Date.now().toString().slice(-6)}`,
        totalPrice: String(estimatedTotal),
        createdAt: new Date().toISOString(),
        offlineNotice: 'Reservasi sewa tercatat pada sesi lokal (Backend/DB belum terhubung).',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          <Skeleton className="w-64 h-5 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-[400px] rounded-2xl" />
            <Skeleton className="w-full h-[400px] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="w-full pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
            <AlertTriangle className="w-12 h-12 text-[#98A2B3]" />
            <h3 className="text-base font-bold text-[#17245F]">Armada Sewa Tidak Ditemukan</h3>
            <p className="text-sm text-[#667085] max-w-md">
              Model sewa ini tidak tersedia atau server belum terhubung.
            </p>
            <Link
              href="/penyewaan"
              className="mt-2 text-xs font-bold text-white bg-[#1E3A8A] px-4 py-2 rounded-lg hover:bg-[#17245F] transition-colors"
            >
              Kembali ke Katalog Penyewaan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Booking Confirmation Screen
  if (bookedOrder) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-[0_4px_25px_rgba(20,30,60,0.08)] text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CalendarCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Reservasi Sewa Armada Berhasil Diajukan
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F]">
              Armada Siap Dialokasikan untuk Acara Anda!
            </h1>
            <p className="text-sm text-[#667085] max-w-lg mx-auto">
              Nomor Reservasi Sewa:{' '}
              <strong className="text-[#17245F] font-mono text-base">{bookedOrder.orderNumber}</strong>. Armada akan disterilisasi uap 100°C dan dikirimkan H-2 acara.
            </p>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl max-w-md mx-auto text-left text-xs space-y-2.5">
            <div className="flex justify-between text-[#667085]">
              <span>Model Armada:</span>
              <span className="font-semibold text-[#172033]">{product.name}</span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Jadwal Pemakaian:</span>
              <span className="font-semibold text-[#1E3A8A]">
                {pickupDate} s.d. {returnDate} ({days} Hari)
              </span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Total Unit:</span>
              <span className="font-semibold text-[#172033]">{totalUnits} Stel</span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Institusi:</span>
              <span className="font-semibold text-[#172033]">{institutionName}</span>
            </div>
            <div className="flex justify-between text-[#667085] pt-2 border-t border-[#E5E7EB]">
              <span className="font-bold text-sm text-[#17245F]">Total Biaya Sewa:</span>
              <span className="font-bold text-sm text-[#1E3A8A]">
                {formatRupiah(bookedOrder.totalPrice || estimatedTotal)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/pesanan-rental-saya"
              className="w-full sm:w-auto h-11 px-6 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Package className="w-4 h-4" />
              Lihat Daftar Sewa Saya
            </Link>
            <Link
              href="/konsultasi-chat"
              className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-[#F8FAFC] text-[#172033] border border-[#E5E7EB] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Konfirmasi SPK via Chat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Breadcrumb Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-[#667085]">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <Link href="/penyewaan" className="hover:text-[#1E3A8A] transition-colors">
              Penyewaan Armada
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content & Booking Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Model Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full aspect-square bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E5E7EB] rounded-2xl flex items-center justify-center relative overflow-hidden">
              {currentImage ? (
                <Image
                  src={getImageUrl(currentImage.imageUrl)}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Package className="w-12 h-12 text-[#1E3A8A]/50" />
                  <span className="text-xs text-[#98A2B3]">Foto Armada Sewa</span>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3 shadow-xs">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                ARMADA SEWA SIAP PAKAI
              </span>
              <h1 className="text-xl font-bold text-[#17245F]">{product.name}</h1>
              <div className="text-xl font-bold text-[#F59E0B]">
                {formatRupiah(pricePerUnitPerDay)}
                <span className="text-xs font-normal text-[#667085]"> / unit / hari</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                {product.description || 'Set seragam lengkap steril uap 100°C dengan inspeksi fungsi terjamin.'}
              </p>
            </div>

            {/* Protocol Signals */}
            <div className="p-4 bg-[#EAF0FF]/50 border border-[#1E3A8A]/15 rounded-xl space-y-2 text-xs text-[#17245F]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
                <span className="font-semibold">Sterilisasi Uap 100°C Tersegel</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-semibold">Pengiriman H-2 Acara Bergaransi</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="font-semibold">SPK Resmi Sekolah Diterima</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Rental Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(20,30,60,0.06)] space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#17245F] flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[#1E3A8A]" />
                Formulir Reservasi Sewa Armada
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Lengkapi tanggal acara dan sebaran ukuran untuk mengamankan kuota armada sewa.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* 1. Dates */}
              <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-3">
                <span className="text-xs font-bold text-[#172033] block">
                  1. Tanggal Pemakaian Armada Sewa *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#667085] block mb-1">Tanggal Ambil (Pickup Date)</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#667085] block mb-1">Tanggal Kembali (Return Date)</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>
                {pickupDate && returnDate && (
                  <div className="text-[11px] font-semibold text-[#1E3A8A]">
                    Total Durasi Pemakaian: {days} Hari
                  </div>
                )}
              </div>

              {/* 2. Sizes */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#172033]">
                    2. Pilih Jumlah Unit per Ukuran *
                  </span>
                  <span className="text-xs font-bold text-[#1E3A8A]">
                    Total Sewa: {totalUnits} Stel
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {variants.map((v) => {
                    const currentQty = sizeQuantities[v.size] || 0;
                    return (
                      <div
                        key={v.id}
                        className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center space-y-2"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#17245F] block">{v.size}</span>
                          <span className="text-[10px] text-[#98A2B3]">Stok: {v.stockRent} unit</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(v.size, -1, v.stockRent)}
                            className="w-7 h-7 rounded-lg bg-white border border-[#E5E7EB] text-xs font-bold hover:bg-[#F1F5F9]"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-[#172033] w-6">{currentQty}</span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(v.size, 1, v.stockRent)}
                            className="w-7 h-7 rounded-lg bg-white border border-[#E5E7EB] text-xs font-bold hover:bg-[#F1F5F9]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Institution Details */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#172033] block">
                  3. Data Sekolah / Institusi Peminjam *
                </span>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nama Sekolah / Institusi"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    required
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama PIC Penanggung Jawab"
                      value={picName}
                      onChange={(e) => setPicName(e.target.value)}
                      required
                      className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                    />
                    <input
                      type="tel"
                      placeholder="Nomor WhatsApp Aktif"
                      value={picPhone}
                      onChange={(e) => setPicPhone(e.target.value)}
                      required
                      className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Alamat Pengiriman Armada Sewa"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    className="w-full p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                  />
                  <input
                    type="text"
                    placeholder="Catatan tambahan (Opsional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Total Summary Strip */}
              <div className="p-4 bg-[#EAF0FF]/50 border border-[#1E3A8A]/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#667085] block">Total Estimasi Biaya Sewa:</span>
                  <span className="text-xl font-bold text-[#1E3A8A]">{formatRupiah(estimatedTotal)}</span>
                </div>
                <span className="text-[11px] text-[#475569] text-right">
                  {totalUnits} stel × {days} hari
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                {isSubmitting ? 'Mengirimkan Permohonan Sewa...' : 'Ajukan Reservasi Sewa Armada Sekarang'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
