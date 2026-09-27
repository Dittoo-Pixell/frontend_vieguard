'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Package,
  Layers,
  Clock,
  Truck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Scissors,
  FileCheck,
  Check,
} from 'lucide-react';

const FAQS = [
  {
    q: 'Berapa minimal pemesanan untuk seragam jahit custom?',
    a: 'Minimal pemesanan untuk paket jahit adibusana custom adalah 10 stel per desain. Untuk paket standar katalog, kami menerima pesanan mulai dari 5 stel.',
  },
  {
    q: 'Berapa lama estimasi waktu produksi konveksi?',
    a: 'Waktu produksi standar berkisar antara 14 hingga 25 hari kerja tergantung pada kompleksitas bordir dan jumlah personel korps. Untuk kebutuhan darurat, Anda dapat memanfaatkan layanan Sewa Armada Seragam Siap Pakai yang dapat dikirimkan H-2 acara.',
  },
  {
    q: 'Bagaimana sistem pembayaran dan terminasi kontrak?',
    a: 'Kami menerapkan sistem pembayaran bertahap yang aman: Uang Muka (DP) sebesar 50% saat PO dan desain disetujui, dan pelunasan 50% setelah seluruh pesanan selesai diperiksa tim QC sebelum pengiriman.',
  },
  {
    q: 'Apakah institusi sekolah dapat menggunakan SPK resmi?',
    a: 'Tentu saja. Kami berpengalaman melayani ratusan institusi pendidikan dan kedinasan. Kami menerima Surat Perintah Kerja (SPK), nota dinas resmi, dan dokumen bendahara BOS/APBD.',
  },
  {
    q: 'Bagaimana jika ada ukuran yang kurang pas pada siswa?',
    a: 'Vieguard memberikan garansi retur & perbaikan (fitting warranty) hingga 7 hari kalender setelah seragam diterima di lokasi sekolah.',
  },
];

export default function PesanSeragamLayananPage() {
  const { isAuthenticated } = useAuthStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const orderLink = isAuthenticated ? '/pesan-seragam' : '/daftar?next=/pesan-seragam';

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#17245F] to-[#1E3A8A] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-[#F59E0B] mx-auto backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>LAYANAN PENGADAAN & PRODUKSI SERAGAM RESMI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Konveksi Spesialis Seragam Drum Band, Marching Band & Wisuda Institusi
          </h1>

          <p className="text-sm sm:text-base text-[#EAF0FF]/90 max-w-2xl mx-auto leading-relaxed">
            Menghadirkan kenyamanan gerak ergonomis siswa dan kegagahan visual panggung. Dikerjakan oleh penjahit ahli dengan standar QC ketat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href={orderLink}
              className="w-full sm:w-auto h-12 px-8 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              Mulai Pesan Seragam Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/konsultasi-chat"
              className="w-full sm:w-auto h-12 px-8 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Desain Gratis
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Value Propositions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Scissors,
              title: 'Pola Ergonomis Siswa',
              desc: 'Pola dirancang khusus leluasa bergerak saat bermain instrumen drum dan parade.',
            },
            {
              icon: ShieldCheck,
              title: 'Kain & Aksesoris Premium',
              desc: 'Bahan drill tahan luntur, beludru halus, visor glossy, dan benang bordir padat.',
            },
            {
              icon: Clock,
              title: 'Tepat Waktu Sesuai PO',
              desc: 'Jadwal blokir workshop resmi memastikan seragam siap sebelum hari gladi resik.',
            },
            {
              icon: Truck,
              title: 'Distribusi Kargo Aman',
              desc: 'Packing higienis per siswa dengan peti kayu untuk pengiriman lintas provinsi.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_20px_rgba(20,30,60,0.06)] space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF0FF] text-[#1E3A8A] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#17245F]">{item.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5 Steps How to Order */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider bg-[#EAF0FF] px-3 py-1 rounded-full">
            ALUR KERJA RESMI
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17245F]">
            5 Langkah Mudah Pengadaan Seragam
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] max-w-xl mx-auto">
            Protokol terstruktur kami memudahkan sekolah, panitia, dan dewan guru dari awal formulir hingga seragam diterima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Pilih Jalur & Paket', desc: 'Tentukan paket beli, sewa kilat, atau jahit kustom khusus.' },
            { step: '02', title: 'Distribusi Ukuran', desc: 'Isi rekap ukuran siswa (S-XXL) atau konsultasikan via form online.' },
            { step: '03', title: 'Approval Desain & PO', desc: 'Tim kami mengonfirmasi sketsa bordir dan surat pesanan resmi.' },
            { step: '04', title: 'Manufaktur & QC', desc: 'Penjahitan di workshop dengan 4 tahap inspeksi mutu berkala.' },
            { step: '05', title: 'Pengiriman & Fitting', desc: 'Seragam sampai di sekolah dengan garansi penyesuaian ukuran.' },
          ].map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3 relative hover:border-[#1E3A8A]/40 transition-all"
            >
              <span className="text-2xl font-bold font-mono text-[#1E3A8A]/20 block">{s.step}</span>
              <h3 className="text-sm font-bold text-[#17245F]">{s.title}</h3>
              <p className="text-xs text-[#667085] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider bg-[#EAF0FF] px-3 py-1 rounded-full">
            TANYA JAWAB
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17245F]">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#17245F] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#667085] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#1E3A8A]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#667085] leading-relaxed border-t border-[#F1F5F9]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-[#17245F] to-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Siap Mewujudkan Seragam Korps Terbaik Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#EAF0FF]/90 max-w-xl">
              Gunakan formulir pemesanan online kami untuk mendapatkan alokasi kuota produksi dan rincian penawaran resmi.
            </p>
          </div>
          <Link
            href={orderLink}
            className="h-12 px-8 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all shrink-0"
          >
            Buka Formulir Pemesanan Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
