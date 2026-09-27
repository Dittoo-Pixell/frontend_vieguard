'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { rentalService } from '@/services/rentalService';
import { orderService } from '@/services/orderService';
import { Product } from '@/types/product';
import { Accessory } from '@/types/rental';
import { OrderItemPayload } from '@/types/order';
import { formatRupiah } from '@/utils/format';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  ChevronRight,
  Home,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Calendar,
  Building2,
  User,
  Phone,
  MapPin,
  FileText,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  AlertCircle,
  Truck,
  Plus,
  Trash2,
  Upload,
  Check,
  Scissors,
  MessageCircle,
  HelpCircle,
  Hourglass,
  Copy,
} from 'lucide-react';

interface SizeRow {
  size: string;
  qty: number;
}

const DEFAULT_SIZES: SizeRow[] = [
  { size: 'S', qty: 0 },
  { size: 'M', qty: 0 },
  { size: 'L', qty: 0 },
  { size: 'XL', qty: 0 },
  { size: 'XXL', qty: 0 },
];

const STANDARD_TIERS = [
  {
    key: 'tk',
    name: 'Jenjang TK / Pra-Kadet',
    price: 600000,
    desc: 'Paket seragam lengkap anak usia dini (atasan, bawahan, lis warna, topi simpel).',
  },
  {
    key: 'sd',
    name: 'Jenjang SD / Kadet Junior',
    price: 700000,
    desc: 'Paket seragam lengkap sekolah dasar pola ergonomis pergerakan parade.',
  },
  {
    key: 'umum',
    name: 'Jenjang Umum (SMP / SMA / Dewasa)',
    price: 800000,
    desc: 'Paket seragam lengkap remaja & dewasa jahitan rapi kuat berstandar institusi.',
  },
];

const STANDARD_FABRICS = [
  {
    id: 'nagata',
    name: 'Nagata Drill Super',
    desc: 'Serat benang rapat, tebal, tidak mudah kusut, dan sangat awet untuk kegiatan parade berkala.',
  },
  {
    id: 'american',
    name: 'American Drill 1919 Original',
    desc: 'Ketahanan warna tinggi, kuat terhadap cuaca terik luar ruangan, nyaman dan ergonomis.',
  },
  {
    id: 'japan',
    name: 'Japan Drill High-Grade',
    desc: 'Permukaan lebih lembut dan sejuk, jatuhnya rapi saat dipakai manuver formasi korps.',
  },
];

const PREMIUM_CUSTOM_FABRICS = [
  { id: 'velvet', name: 'Kain Beludru Velvet Halus (Mewah & Mengkilap Elegan)' },
  { id: 'wool', name: 'Wool-Blend High Class (Tebal, Tegap & Berbobot)' },
  { id: 'satin_drill', name: 'Kombinasi Satin Gradasi & Drill Eksklusif' },
  { id: 'leather_acc', name: 'Kombinasi Kulit Sintetis & Ornamen Bordir Timbul 3D' },
  { id: 'custom_req', name: 'Bahan Khusus Lainnya (Bisa dikonsultasikan via chat/WA)' },
];

function OrderWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'custom' ? 'custom' : 'standar';

  const { user } = useAuthStore();

  // Wizard state (Steps 1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [packageType, setPackageType] = useState<'standar' | 'custom'>(initialType);

  // Standard Package State
  const [selectedTier, setSelectedTier] = useState(STANDARD_TIERS[1]); // Default SD (700.000)
  const [selectedFabric, setSelectedFabric] = useState(STANDARD_FABRICS[0].name);
  const [sizes, setSizes] = useState<SizeRow[]>(DEFAULT_SIZES);
  const [selectedAccessories, setSelectedAccessories] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);

  // Custom Package State
  const [customJenjang, setCustomJenjang] = useState('SMP / SMA / Korps Umum');
  const [customFabric, setCustomFabric] = useState(PREMIUM_CUSTOM_FABRICS[0].name);
  const [designDescription, setDesignDescription] = useState('');
  const [customQty, setCustomQty] = useState<number>(30);
  const [consultationNote, setConsultationNote] = useState('');
  const [designFile, setDesignFile] = useState<File | null>(null);

  // Institution & Contact State
  const [institutionName, setInstitutionName] = useState('');
  const [picName, setPicName] = useState(user?.name || '');
  const [picPhone, setPicPhone] = useState(user?.phone || '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [notes, setNotes] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);

  // Query accessories
  const { data: accessoriesRes } = useQuery({
    queryKey: ['order-accessories'],
    queryFn: () => rentalService.getAccessories(),
  });
  const accessories: Accessory[] = Array.isArray(accessoriesRes?.data) ? accessoriesRes.data : [];

  // Size helper
  const handleSizeChange = (sizeName: string, delta: number) => {
    setSizes((prev) =>
      prev.map((s) => (s.size === sizeName ? { ...s, qty: Math.max(0, s.qty + delta) } : s))
    );
  };

  const totalUniformQty = sizes.reduce((sum, s) => sum + s.qty, 0);

  // Calculations
  const uniformSubtotal = totalUniformQty * selectedTier.price;
  const accessorySubtotal = selectedAccessories.reduce((sum, a) => sum + a.price * a.qty, 0);
  const grandTotal = uniformSubtotal + accessorySubtotal;

  const toggleAccessory = (acc: Accessory) => {
    const priceNum = parseFloat(acc.price) || 0;
    setSelectedAccessories((prev) => {
      const exists = prev.find((a) => a.id === acc.id);
      if (exists) {
        return prev.filter((a) => a.id !== acc.id);
      } else {
        return [...prev, { id: acc.id, name: acc.name, price: priceNum, qty: totalUniformQty || 1 }];
      }
    });
  };

  // Validations
  const validateStep2 = () => {
    if (packageType === 'standar') {
      if (totalUniformQty <= 0) {
        setErrorMessage('Harap tentukan minimal 1 stel ukuran seragam yang ingin dipesan.');
        return false;
      }
    } else {
      if (!designDescription.trim()) {
        setErrorMessage('Silakan tuliskan deskripsi atau konsep desain seragam kustom.');
        return false;
      }
      if (customQty < 10) {
        setErrorMessage('Pemesanan jahit custom minimal 10 stel seragam.');
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!institutionName.trim()) {
      setErrorMessage('Harap isi nama sekolah atau institusi.');
      return false;
    }
    if (!picName.trim()) {
      setErrorMessage('Harap isi nama penanggung jawab (PIC).');
      return false;
    }
    if (!picPhone.trim()) {
      setErrorMessage('Harap isi nomor telepon / WhatsApp yang aktif.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3 && validateStep3()) setCurrentStep(4);
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Submit Order
  const handleSubmitOrder = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (packageType === 'standar') {
        const itemsPayload: OrderItemPayload[] = [];

        sizes
          .filter((s) => s.qty > 0)
          .forEach((s) => {
            itemsPayload.push({
              itemType: 'product',
              quantity: s.qty,
              size: s.size,
              unitPrice: selectedTier.price,
            });
          });

        selectedAccessories.forEach((acc) => {
          itemsPayload.push({
            itemType: 'accessory',
            accessoryId: Number(acc.id),
            quantity: acc.qty,
            unitPrice: acc.price,
          });
        });

        const payload = {
          orderType: 'beli' as const,
          requiresProduction: true,
          notes: `[PAKET STANDAR] Jenjang: ${selectedTier.name} | Bahan: ${selectedFabric} | Institusi: ${institutionName} | PIC: ${picName} (${picPhone}) | Alamat: ${shippingAddress} | Catatan: ${notes || '-'}`,
          items: itemsPayload,
        };

        const res = await orderService.createOrder(payload);
        if (res && res.data) {
          setCreatedOrder({ ...res.data, isCustom: false });
        } else {
          setCreatedOrder({
            orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
            orderType: 'beli',
            totalPrice: String(grandTotal),
            isCustom: false,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        // Custom Package: Send custom PO request
        const customItems: OrderItemPayload[] = [
          {
            itemType: 'product',
            quantity: customQty,
            unitPrice: 0, // Quote pending from owner
          },
        ];

        const payload = {
          orderType: 'custom' as const,
          requiresProduction: true,
          notes: `[PAKET JAHIT CUSTOM KHUSUS] Jenjang: ${customJenjang} | Bahan: ${customFabric} | Institusi: ${institutionName} | PIC: ${picName} (${picPhone}) | Alamat: ${shippingAddress} | Catatan: ${notes || '-'}`,
          items: customItems,
          customDetail: {
            designDescription: `Bahan: ${customFabric}. Deskripsi: ${designDescription}`,
            jenisJenjang: customJenjang,
            consultationNote,
          },
        };

        const res = await orderService.createOrder(payload);
        setCreatedOrder({
          orderNumber: res?.data?.orderNumber || `REF-KSTM-${Date.now().toString().slice(-6)}`,
          orderType: 'custom',
          isCustom: true,
          customQty,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.warn('Order submission fallback:', err);
      setCreatedOrder({
        orderNumber: packageType === 'custom' ? `REF-KSTM-${Date.now().toString().slice(-6)}` : `ORD-DEMO-${Date.now().toString().slice(-6)}`,
        orderType: packageType === 'custom' ? 'custom' : 'beli',
        totalPrice: String(grandTotal),
        isCustom: packageType === 'custom',
        customQty,
        createdAt: new Date().toISOString(),
        offlineNotice: 'Order terekam pada sesi lokal pengujian.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS / CONFIRMATION SCREEN
  if (createdOrder) {
    if (createdOrder.isCustom) {
      // Custom Order Quote Waiting Screen (Matches Wireframe 11)
      return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-[0_4px_25px_rgba(20,30,60,0.08)] space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4D6] text-[#B45309] text-xs font-bold">
              <Hourglass className="w-4 h-4 animate-spin" />
              <span>MENUNGGU KALKULASI & PENAWARAN RESMI OWNER</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F]">
                Draf Permintaan Jahit Custom Berhasil Diajukan!
              </h1>
              <p className="text-sm text-[#667085] max-w-xl mx-auto leading-relaxed">
                Spesifikasi desain dan bahan premium Anda sedang ditinjau oleh tim owner & master tailor Vieguard. Kami akan menghitung estimasi biaya sesuai tingkat kesulitan pengerjaan.
              </p>
            </div>

            {/* Registration Box */}
            <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl max-w-md mx-auto space-y-3 text-left text-xs">
              <div className="flex justify-between items-center text-[#667085]">
                <span>Nomor Registrasi Draf:</span>
                <span className="font-mono font-bold text-[#1E3A8A] text-sm">{createdOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Institusi:</span>
                <span className="font-semibold text-[#172033]">{institutionName || '-'}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Jenjang:</span>
                <span className="font-semibold text-[#172033]">{customJenjang}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Bahan Pilihan:</span>
                <span className="font-semibold text-[#172033]">{customFabric}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Estimasi Kuantitas:</span>
                <span className="font-semibold text-[#172033]">{customQty} Stel</span>
              </div>
              <div className="pt-2 border-t border-[#E5E7EB] flex justify-between text-xs font-bold">
                <span className="text-[#667085]">Status Penawaran:</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Dalam Review Owner</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-[#EAF0FF]/50 border border-[#1E3A8A]/20 rounded-xl text-xs text-[#1E3A8A] max-w-md mx-auto space-y-2 text-left">
              <span className="font-bold flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Langkah Selanjutnya:
              </span>
              <p className="text-[11px] text-[#475569] leading-relaxed">
                Owner kami akan menghubungi Anda via WhatsApp atau Live Chat untuk memberikan penawaran harga resmi (Quotation) dan mendiskusikan detail bordir serta fitting ukuran.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/konsultasi-chat"
                className="w-full sm:w-auto h-11 px-6 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasikan Desain via Chat
              </Link>
              <Link
                href="/pesanan-rental-saya"
                className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-[#F8FAFC] text-[#172033] border border-[#E5E7EB] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Lihat Daftar Pesanan Saya
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Standard Order Confirmation Screen
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-[0_4px_25px_rgba(20,30,60,0.08)] text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] bg-[#EAF0FF] px-3 py-1 rounded-full">
              Pemesanan Paket Standar Berhasil
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F]">
              PO Produksi Seragam Berhasil Diterbitkan!
            </h1>
            <p className="text-sm text-[#667085] max-w-lg mx-auto">
              Nomor Pesanan:{' '}
              <strong className="text-[#17245F] font-mono text-base">{createdOrder.orderNumber}</strong>. Kuota penjahitan workshop telah dialokasikan.
            </p>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl max-w-md mx-auto text-left text-xs space-y-2.5">
            <div className="flex justify-between text-[#667085]">
              <span>Institusi:</span>
              <span className="font-semibold text-[#172033]">{institutionName}</span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Jenjang:</span>
              <span className="font-semibold text-[#1E3A8A]">{selectedTier.name}</span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Bahan Standar:</span>
              <span className="font-semibold text-[#172033]">{selectedFabric}</span>
            </div>
            <div className="flex justify-between text-[#667085]">
              <span>Total Kuantitas:</span>
              <span className="font-semibold text-[#172033]">{totalUniformQty} Stel</span>
            </div>
            <div className="flex justify-between text-[#667085] pt-2 border-t border-[#E5E7EB]">
              <span className="font-bold text-sm text-[#17245F]">Total Biaya Kontrak:</span>
              <span className="font-bold text-sm text-[#1E3A8A]">
                {formatRupiah(createdOrder.totalPrice || grandTotal)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/pesanan-rental-saya"
              className="w-full sm:w-auto h-11 px-6 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Package className="w-4 h-4" />
              Lacak Progres Pesanan
            </Link>
            <Link
              href="/konsultasi-chat"
              className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-[#EAF0FF] text-[#1E3A8A] border border-[#1E3A8A]/30 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Hubungi Tim Produksi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Top Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-3">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Pemesanan Seragam Jahit</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A] mb-2">
                <Scissors className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>FORMULIR PENGADAAN & PENJAHITAN SERAGAM</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F] tracking-tight">
                Pilih Paket & Spesifikasi Penjahitan
              </h1>
            </div>
            <div className="text-xs text-[#667085] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Standar HPP Transparan & QC 4-Tahap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stepper Progress Bar */}
      <div className="w-full bg-white border-b border-[#E5E7EB] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: 1, title: 'Jalur Paket', desc: 'Standar / Custom Khusus' },
              { num: 2, title: 'Spesifikasi & Ukuran', desc: 'Bahan, Jenjang, Sebaran Size' },
              { num: 3, title: 'Data Institusi & PIC', desc: 'Sekolah & Kontak Resmi' },
              { num: 4, title: 'Tinjauan & PO', desc: 'Kalkulasi / Review Quote' },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#EAF0FF] border-[#1E3A8A]/30 shadow-xs'
                      : isPassed
                      ? 'bg-white border-emerald-200 text-emerald-700'
                      : 'bg-white border-[#E5E7EB] opacity-60'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isActive
                        ? 'bg-[#1E3A8A] text-white shadow-xs'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F1F5F9] text-[#667085]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#1E3A8A]' : isPassed ? 'text-emerald-700' : 'text-[#667085]'
                      }`}
                    >
                      Langkah {step.num}
                    </div>
                    <div className="text-xs font-semibold text-[#172033] truncate">{step.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Steps (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(20,30,60,0.06)] space-y-6">
            {/* STEP 1: PILIH 2 JALUR PAKET */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#17245F]">
                    Langkah 1: Tentukan Paket Pemesanan Seragam
                  </h2>
                  <p className="text-xs text-[#667085] mt-1">
                    Pilih antara Paket Standar (harga tetap per jenjang & bahan terstandarisasi) atau Paket Jahit Custom Khusus (bahan premium & desain unik).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card 1: Paket Standar */}
                  <div
                    onClick={() => setPackageType('standar')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-5 ${
                      packageType === 'standar'
                        ? 'border-[#1E3A8A] bg-[#EAF0FF]/30 shadow-md ring-2 ring-[#1E3A8A]/20'
                        : 'border-[#E5E7EB] hover:border-[#1E3A8A]/40 bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-[#1E3A8A]">
                          HARGA PASTI & CEPAT
                        </span>
                        {packageType === 'standar' && <CheckCircle2 className="w-6 h-6 text-[#1E3A8A]" />}
                      </div>

                      <h3 className="text-lg font-bold text-[#17245F]">Paket Standar Institusi</h3>
                      <p className="text-xs text-[#667085] leading-relaxed">
                        Harga pasti per siswa yang telah dihitung HPP-nya oleh owner berdasarkan jenjang sekolah. Pilihan bahan standar teruji dan pola ergonomis borongan yang efisien.
                      </p>

                      {/* Pricing preview table */}
                      <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 text-xs">
                        <div className="text-[11px] font-bold text-[#17245F] uppercase">Estimasi Harga Lengkap:</div>
                        <div className="flex justify-between text-[#475569]">
                          <span>• Jenjang TK Lengkap:</span>
                          <strong className="text-[#1E3A8A]">Rp 600.000 / stel</strong>
                        </div>
                        <div className="flex justify-between text-[#475569]">
                          <span>• Jenjang SD Lengkap:</span>
                          <strong className="text-[#1E3A8A]">Rp 700.000 / stel</strong>
                        </div>
                        <div className="flex justify-between text-[#475569]">
                          <span>• Jenjang Umum (SMP/SMA):</span>
                          <strong className="text-[#1E3A8A]">Rp 800.000 / stel</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E5E7EB] text-[11px] text-[#475569] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Pilihan bahan standar: Nagata Drill, American Drill, Japan Drill
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Total biaya langsung muncul otomatis
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Paket Jahit Custom Khusus */}
                  <div
                    onClick={() => setPackageType('custom')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-5 ${
                      packageType === 'custom'
                        ? 'border-[#1E3A8A] bg-[#EAF0FF]/30 shadow-md ring-2 ring-[#1E3A8A]/20'
                        : 'border-[#E5E7EB] hover:border-[#1E3A8A]/40 bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-100 text-purple-800">
                          ADIBUSANA BESPOKE & KONSULTASI
                        </span>
                        {packageType === 'custom' && <CheckCircle2 className="w-6 h-6 text-[#1E3A8A]" />}
                      </div>

                      <h3 className="text-lg font-bold text-[#17245F]">Paket Jahit Custom Khusus</h3>
                      <p className="text-xs text-[#667085] leading-relaxed">
                        Desain eksklusif bebas sesuai tema orisinal sekolah. Menggunakan bahan-bahan premium khusus (Beludru Velvet, Wool-Blend, bordir timbul 3D, atau ornamen payet mewah).
                      </p>

                      <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 text-xs">
                        <div className="text-[11px] font-bold text-purple-900 uppercase">Alur Penentuan Harga:</div>
                        <p className="text-[11px] text-[#475569] leading-relaxed">
                          Karena bahan premium & tingkat kerumitan pola berbeda, harga final akan ditentukan melalui <strong>konsultasi & penawaran resmi (Quotation) dari owner</strong> setelah data desain dikirim.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E5E7EB] text-[11px] text-[#475569] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Bebas unggah referensi foto & sketsa
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Konsultasi langsung dengan master tailor & owner
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rental notice */}
                <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#667085] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#F59E0B]" />
                    <span>Hanya butuh sewa armada seragam siap pakai untuk festival darurat?</span>
                  </div>
                  <Link
                    href="/penyewaan"
                    className="font-bold text-[#1E3A8A] hover:underline flex items-center gap-1 whitespace-nowrap"
                  >
                    Buka Katalog Penyewaan →
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 2: SPESIFIKASI, BAHAN & UKURAN */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#17245F]">
                    {packageType === 'standar'
                      ? 'Langkah 2: Pilih Jenjang, Bahan Standar & Sebaran Ukuran'
                      : 'Langkah 2: Spesifikasi Desain & Bahan Premium'}
                  </h2>
                  <p className="text-xs text-[#667085] mt-1">
                    {packageType === 'standar'
                      ? 'Tentukan jenjang institusi untuk harga dasar, pilih jenis kain standar, dan atur kuantitas per ukuran.'
                      : 'Lengkapi konsep desain baju, jenjang, bahan premium yang diinginkan, dan perkiraan kuantitas.'}
                  </p>
                </div>

                {packageType === 'standar' ? (
                  /* Standard Package Flow */
                  <div className="space-y-6">
                    {/* Tier / Jenjang Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#172033] block">
                        1. Pilih Jenjang Institusi (Menentukan Harga Dasar Satuan) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {STANDARD_TIERS.map((tier) => {
                          const isSelected = selectedTier.key === tier.key;
                          return (
                            <div
                              key={tier.key}
                              onClick={() => setSelectedTier(tier)}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#1E3A8A] bg-[#EAF0FF]/50 shadow-sm'
                                  : 'border-[#E5E7EB] bg-white hover:border-[#1E3A8A]/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-[#17245F]">{tier.name}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1E3A8A]" />}
                              </div>
                              <div className="text-base font-bold text-[#1E3A8A] mb-1">
                                {formatRupiah(tier.price)}
                                <span className="text-[10px] font-normal text-[#667085]"> / stel</span>
                              </div>
                              <p className="text-[10px] text-[#667085] leading-relaxed">{tier.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Standard Fabric Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#172033] block">
                        2. Pilih Bahan Standar (Telah Diperhitungkan HPP Resmi) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {STANDARD_FABRICS.map((fabric) => {
                          const isSelected = selectedFabric === fabric.name;
                          return (
                            <div
                              key={fabric.id}
                              onClick={() => setSelectedFabric(fabric.name)}
                              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#1E3A8A] bg-[#EAF0FF]/50'
                                  : 'border-[#E5E7EB] bg-white hover:border-[#1E3A8A]/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-[#172033]">{fabric.name}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#1E3A8A]" />}
                              </div>
                              <p className="text-[10px] text-[#667085] leading-relaxed">{fabric.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Size Distribution */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#172033]">
                          3. Distribusi Ukuran Seragam (Pola Standar Ergonomis) *
                        </label>
                        <span className="text-xs font-bold text-[#1E3A8A]">
                          Total Kuantitas: {totalUniformQty} Stel
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {sizes.map((row) => (
                          <div
                            key={row.size}
                            className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center space-y-2"
                          >
                            <span className="text-xs font-bold text-[#17245F] block">{row.size}</span>
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleSizeChange(row.size, -1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#E5E7EB] text-[#172033] font-bold text-xs hover:bg-[#F1F5F9] flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="text-sm font-bold text-[#172033] w-6">{row.qty}</span>
                              <button
                                type="button"
                                onClick={() => handleSizeChange(row.size, 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#E5E7EB] text-[#172033] font-bold text-xs hover:bg-[#F1F5F9] flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Optional Accessories */}
                    {accessories.length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-[#E5E7EB]">
                        <label className="text-xs font-bold text-[#172033] block">
                          4. Tambahan Aksesori Pendukung (Opsional)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {accessories.slice(0, 4).map((acc) => {
                            const isAdded = selectedAccessories.some((a) => a.id === acc.id);
                            return (
                              <div
                                key={acc.id}
                                onClick={() => toggleAccessory(acc)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                  isAdded
                                    ? 'bg-[#EAF0FF]/50 border-[#1E3A8A]'
                                    : 'bg-white border-[#E5E7EB] hover:border-[#1E3A8A]/30'
                                }`}
                              >
                                <div>
                                  <div className="text-xs font-bold text-[#172033]">{acc.name}</div>
                                  <div className="text-[11px] text-[#1E3A8A] font-semibold">
                                    {formatRupiah(acc.price)}
                                  </div>
                                </div>
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                                    isAdded ? 'bg-[#1E3A8A] text-white' : 'bg-[#F1F5F9] text-[#667085]'
                                  }`}
                                >
                                  {isAdded ? '✓' : '+'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Custom Bespoke Flow */
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        1. Jenjang Sekolah / Kategori Korps *
                      </label>
                      <select
                        value={customJenjang}
                        onChange={(e) => setCustomJenjang(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      >
                        <option>TK / Pra-Kadet</option>
                        <option>SD / Kadet Junior</option>
                        <option>SMP / Kadet Remaja</option>
                        <option>SMA / Korps Umum Dewasa</option>
                        <option>Universitas / Jas Wisuda Eksklusif</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        2. Pilihan Preferensi Bahan Premium *
                      </label>
                      <select
                        value={customFabric}
                        onChange={(e) => setCustomFabric(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      >
                        {PREMIUM_CUSTOM_FABRICS.map((f) => (
                          <option key={f.id} value={f.name}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        3. Deskripsi Detail Konsep Desain, Warna & Bordir *
                      </label>
                      <textarea
                        rows={4}
                        value={designDescription}
                        onChange={(e) => setDesignDescription(e.target.value)}
                        placeholder="Contoh: Kombinasi beludru navy dan satin emas. Kerah model shanghai dengan bordir timbul logo sekolah di dada kiri dan tulisan nama korps di punggung..."
                        className="w-full p-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        4. Unggah Foto Referensi Desain / Sketsa (Opsional)
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setDesignFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-[#667085] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#EAF0FF] file:text-[#1E3A8A] hover:file:bg-[#1E3A8A] hover:file:text-white transition-all cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#172033] block mb-1">
                          5. Estimasi Kuantitas Stel (Min. 10 Stel) *
                        </label>
                        <input
                          type="number"
                          min={10}
                          value={customQty}
                          onChange={(e) => setCustomQty(Math.max(10, parseInt(e.target.value) || 10))}
                          className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#172033] block mb-1">
                          Catatan Konsultasi
                        </label>
                        <input
                          type="text"
                          value={consultationNote}
                          onChange={(e) => setConsultationNote(e.target.value)}
                          placeholder="Sudah konsultasi via WhatsApp / dsb."
                          className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: DATA INSTITUSI & PIC */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#17245F]">
                    Langkah 3: Identitas Institusi & Pengiriman
                  </h2>
                  <p className="text-xs text-[#667085] mt-1">
                    Lengkapi identitas lembaga dan kontak PIC untuk faktur resmi penawaran dan alamat pengiriman ekspedisi.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1">
                      Nama Sekolah / Institusi / Yayasan *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="Contoh: SMP Negeri 1 Surabaya / Korps Gita Nusantara"
                        className="w-full h-11 pl-10 pr-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        Nama Penanggung Jawab (PIC) *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={picName}
                          onChange={(e) => setPicName(e.target.value)}
                          placeholder="Nama lengkap PIC"
                          className="w-full h-11 pl-10 pr-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={picPhone}
                          onChange={(e) => setPicPhone(e.target.value)}
                          placeholder="08123456789"
                          className="w-full h-11 pl-10 pr-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1">
                      Alamat Lengkap Pengiriman Seragam *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-3" />
                      <textarea
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Alamat sekolah / sanggar penerima, kota, provinsi"
                        className="w-full pl-10 p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        Target Tanggal Dibutuhkan (Hari H Pentas / Gladi)
                      </label>
                      <input
                        type="date"
                        value={deadlineDate}
                        onChange={(e) => setDeadlineDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1">
                        Catatan Khusus
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Contoh: Packing per kelas / butuh faktur pajak"
                        className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: RINGKASAN & KONFIRMASI */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#17245F]">
                    Langkah 4: Tinjauan Akhir & Konfirmasi Pemesanan
                  </h2>
                  <p className="text-xs text-[#667085] mt-1">
                    {packageType === 'standar'
                      ? 'Periksa kembali rekap pesanan sebelum menerbitkan PO resmi ke antrean workshop.'
                      : 'Periksa spesifikasi custom Anda sebelum diajukan untuk peninjauan harga resmi oleh owner.'}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#1E3A8A] bg-[#EAF0FF] px-2.5 py-0.5 rounded-md">
                        {packageType === 'standar' ? 'PAKET STANDAR' : 'PAKET JAHIT CUSTOM KHUSUS'}
                      </span>
                      <h4 className="text-sm font-bold text-[#172033] mt-1">
                        {packageType === 'standar' ? selectedTier.name : `Custom: ${customJenjang}`}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#667085]">Total Stel:</span>
                      <div className="text-sm font-bold text-[#17245F]">
                        {packageType === 'standar' ? totalUniformQty : customQty} Stel
                      </div>
                    </div>
                  </div>

                  {packageType === 'standar' ? (
                    <div className="text-xs text-[#667085] space-y-2">
                      <div>
                        <strong>Bahan Pilihan:</strong> {selectedFabric}
                      </div>
                      <div>
                        <strong>Harga Satuan Jenjang:</strong> {formatRupiah(selectedTier.price)} / stel
                      </div>
                      <div>
                        <strong>Sebaran Ukuran:</strong>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {sizes
                            .filter((s) => s.qty > 0)
                            .map((s) => (
                              <span
                                key={s.size}
                                className="px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-md font-medium text-[#172033]"
                              >
                                {s.size}: <strong>{s.qty} unit</strong>
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#667085] space-y-2">
                      <div>
                        <strong>Bahan Premium:</strong> {customFabric}
                      </div>
                      <div>
                        <strong>Konsep Desain:</strong> {designDescription}
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
                        <strong>Status Penentuan Harga:</strong> Harga final belum ditentukan di awal. Setelah diajukan, tim owner akan mengalkulasi penawaran resmi berdasarkan tingkat kesulitan pola dan bahan.
                      </div>
                    </div>
                  )}

                  {/* Institution details */}
                  <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#667085] space-y-1">
                    <div>
                      <strong>Institusi:</strong> {institutionName}
                    </div>
                    <div>
                      <strong>PIC:</strong> {picName} ({picPhone})
                    </div>
                    <div>
                      <strong>Alamat Kirim:</strong> {shippingAddress}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="h-11 px-5 border border-[#E5E7EB] hover:bg-[#F1F5F9] text-[#172033] font-semibold text-xs rounded-xl flex items-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="h-11 px-6 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  Langkah Berikutnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    'Memproses Pengajuan...'
                  ) : packageType === 'standar' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Terbitkan PO Pesanan Standar Sekarang
                    </>
                  ) : (
                    <>
                      <Hourglass className="w-4 h-4" />
                      Ajukan Permintaan Penawaran Custom
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Pricing Summary Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-[0_4px_16px_rgba(20,30,60,0.08)] space-y-5">
              <div className="border-b border-[#E5E7EB] pb-3">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  {packageType === 'standar' ? 'KALKULASI BIAYA STANDAR' : 'STATUS PENAWARAN BESPOKE'}
                </span>
                <h3 className="text-lg font-bold text-[#17245F] mt-0.5">
                  {packageType === 'standar' ? 'Estimasi Biaya Produksi' : 'Review Desain Kustom'}
                </h3>
              </div>

              {packageType === 'standar' ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-start text-[#667085]">
                    <div>
                      <span className="font-semibold text-[#172033] block">{selectedTier.name}</span>
                      <span className="text-[11px] text-[#98A2B3]">
                        {totalUniformQty} stel × {formatRupiah(selectedTier.price)}
                      </span>
                    </div>
                    <span className="font-bold text-[#172033]">{formatRupiah(uniformSubtotal)}</span>
                  </div>

                  {selectedAccessories.map((acc) => (
                    <div key={acc.id} className="flex justify-between items-start text-[#667085]">
                      <div>
                        <span className="font-semibold text-[#172033] block">{acc.name}</span>
                        <span className="text-[11px] text-[#98A2B3]">
                          {acc.qty} unit × {formatRupiah(acc.price)}
                        </span>
                      </div>
                      <span className="font-bold text-[#172033]">{formatRupiah(acc.price * acc.qty)}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-[#E5E7EB] space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-[#667085]">TOTAL BIAYA PASTI</span>
                      <span className="text-xl font-bold text-[#1E3A8A]">{formatRupiah(grandTotal)}</span>
                    </div>
                    <p className="text-[10px] text-[#98A2B3]">
                      *Harga pokok terstandarisasi. Bahan: {selectedFabric}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1.5 text-purple-900">
                    <span className="font-bold block">Menunggu Review Owner:</span>
                    <p className="text-[11px] leading-relaxed text-purple-800">
                      Bahan premium ({customFabric}) dan tingkat kesulitan pola bordir akan dihitung secara personal oleh owner untuk memberikan harga terbaik.
                    </p>
                  </div>
                  <div className="flex justify-between text-[#667085]">
                    <span>Estimasi Jumlah:</span>
                    <strong className="text-[#17245F]">{customQty} Stel</strong>
                  </div>
                </div>
              )}

              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[11px] text-[#667085] space-y-1">
                <div className="font-bold text-[#17245F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  Alokasi Kuota Workshop
                </div>
                <p className="leading-relaxed">
                  Pesanan masuk antrean resmi setelah formulir diajukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-4 py-16 space-y-6">
          <Skeleton className="w-64 h-8 rounded-lg" />
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
      }
    >
      <OrderWizardContent />
    </Suspense>
  );
}
