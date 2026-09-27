'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product, ProductVariant } from '@/types/product';
import { formatRupiah } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
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
} from 'lucide-react';

function getImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v0/website', '') || 'http://localhost:5000';
  return `${base}${url}`;
}

export default function RentalDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['product-rental', productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
  });

  // Check availability when dates are set
  const { data: availabilityRes, isLoading: availLoading } = useQuery({
    queryKey: ['availability', productId, selectedVariant?.id, pickupDate, returnDate],
    queryFn: () =>
      productService.getAvailability(productId, {
        variantId: selectedVariant?.id,
        pickupDate,
        returnDate,
      }),
    enabled: !!productId && !!pickupDate && !!returnDate,
  });

  const product: Product | null = res?.data || null;
  const images = product?.images || [];
  const variants = product?.variants?.filter((v) => v.stockRent > 0) || [];
  const currentImage = images[selectedImageIndex];

  const getRentPrice = () => {
    if (selectedVariant?.priceRentOverride) return formatRupiah(selectedVariant.priceRentOverride);
    if (product?.basePriceRent) return formatRupiah(product.basePriceRent);
    return 'Hubungi Kami';
  };

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const pricePerDay = selectedVariant?.priceRentOverride
    ? parseFloat(selectedVariant.priceRentOverride)
    : product?.basePriceRent
    ? parseFloat(product.basePriceRent)
    : 0;
  const estimatedTotal = days * pricePerDay;

  if (isLoading) {
    return (
      <div className="w-full pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          <Skeleton className="w-64 h-5 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-[400px] rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="w-24 h-6 rounded-lg" />
              <Skeleton className="w-full h-8 rounded" />
              <Skeleton className="w-3/4 h-5 rounded" />
              <Skeleton className="w-full h-32 rounded-xl" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
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
            <h3 className="text-base font-bold text-[#172033]">Item Sewa Tidak Ditemukan</h3>
            <p className="text-sm text-[#667085] max-w-md">
              Server backend/database belum aktif atau item ini tidak tersedia untuk disewa.
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

  return (
    <div className="w-full pb-16">
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
              Penyewaan
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E5E7EB] rounded-2xl flex items-center justify-center relative overflow-hidden">
              {currentImage ? (
                <Image
                  src={getImageUrl(currentImage.imageUrl)}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Package className="w-8 h-8 text-[#1E3A8A]/60" />
                  </div>
                  <span className="text-sm text-[#98A2B3] font-medium">Gambar Produk</span>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#172033]" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-[#172033]" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                        : 'border-[#E5E7EB] hover:border-[#1E3A8A]/40'
                    }`}
                  >
                    <Image
                      src={getImageUrl(img.imageUrl)}
                      alt={`${product.name} ${idx + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Rental Info & Booking */}
          <div className="space-y-5">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="border border-[#1E3A8A]/20 bg-[#EAF0FF] text-[#1E3A8A] px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide">
                {product.category?.name || 'Penyewaan'}
              </span>
              <span className="border border-[#F59E0B]/30 bg-amber-50 text-amber-900 px-3 py-1 rounded-lg text-xs font-semibold">
                SEWA
              </span>
            </div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-[#17245F] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rent Price */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#F59E0B]">{getRentPrice()}</span>
                <span className="text-sm text-[#667085]">/ unit / hari</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#172033]">Deskripsi</h3>
                <p className="text-sm text-[#667085] leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Size Selector */}
            {variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#172033] flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#1E3A8A]" />
                  Pilih Ukuran Sewa
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(isSelected ? null : variant)}
                        className={`h-10 px-4 rounded-xl text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-sm'
                            : 'bg-white text-[#344054] border-[#E5E7EB] hover:border-[#1E3A8A] hover:bg-[#EAF0FF]'
                        }`}
                      >
                        {variant.size}
                        <span className="ml-1.5 text-[10px] opacity-70">({variant.stockRent} unit)</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Date Picker */}
            <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[#172033] flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#1E3A8A]" />
                Tanggal Pemakaian
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#667085] font-medium block mb-1">Tanggal Ambil</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#667085] font-medium block mb-1">Tanggal Kembali</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all"
                  />
                </div>
              </div>

              {/* Estimated Total */}
              {days > 0 && pricePerDay > 0 && (
                <div className="p-3 bg-[#EAF0FF]/50 border border-[#1E3A8A]/10 rounded-lg space-y-1">
                  <div className="flex justify-between text-xs text-[#667085]">
                    <span>Durasi Sewa</span>
                    <span className="font-semibold text-[#172033]">{days} hari</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#667085]">
                    <span>Harga / hari</span>
                    <span>{formatRupiah(pricePerDay)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1E3A8A] pt-1 border-t border-[#1E3A8A]/10">
                    <span>Estimasi Total</span>
                    <span>{formatRupiah(estimatedTotal)}</span>
                  </div>
                  <p className="text-[10px] text-[#98A2B3] flex items-center gap-1 pt-1">
                    <Info className="w-3 h-3" />
                    Harga final akan dikonfirmasi setelah verifikasi ketersediaan oleh admin
                  </p>
                </div>
              )}

              {availLoading && (
                <div className="text-xs text-[#667085] animate-pulse">Memeriksa ketersediaan...</div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/pesan-seragam"
                className="flex-1 h-12 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                Ajukan Penyewaan
              </Link>
              <Link
                href="/konsultasi-chat"
                className="flex-1 h-12 border border-[#1E3A8A]/20 hover:border-[#1E3A8A] bg-[#EAF0FF]/60 hover:bg-[#1E3A8A] hover:text-white text-[#1E3A8A] font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasi
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Sterilisasi Terjamin</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <ClipboardCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>SPK Sekolah Diterima</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <Truck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Kirim H-2 Acara</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
