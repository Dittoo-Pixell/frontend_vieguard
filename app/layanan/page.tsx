'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  Scissors,
  Truck,
  Sparkles,
  Package,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageCircle,
} from 'lucide-react';

export const SERVICES_LIST = [
  {
    slug: 'konveksi-seragam-drumband',
    title: 'Konveksi Seragam Drum Band & Marching Band',
    tagline: 'Standar Pola Ergonomis & Jahitan Garmen Institusi',
    desc: 'Layanan produksi seragam massal maupun satuan dengan harga pasti per jenjang (TK, SD, SMP/SMA/Umum) menggunakan bahan standar teruji seperti Nagata Drill, American Drill, dan Japan Drill.',
    features: [
      'Harga transparan terstandarisasi per jenjang',
      'Pola ergonomis memudahkan pergerakan manuver parade',
      'Kapasitas produksi hingga 500 stel per bulan',
      'Garansi fitting dan perbaikan ukuran hingga 7 hari',
    ],
    ctaText: 'Pesan Seragam Standar',
    ctaHref: '/pesan-seragam',
    badge: 'Layanan Utama',
  },
  {
    slug: 'penyewaan-armada-seragam',
    title: 'Penyewaan Armada Seragam Siap Pakai',
    tagline: 'Sterilisasi Uap 100°C & Pengiriman Garansi H-2 Acara',
    desc: 'Solusi efisien untuk karnaval, perlombaan mendesak, atau hari besar nasional tanpa perlu mengeluarkan biaya pengadaan seragam baru. Unit bersih, wangi, dan steril siap pakai.',
    features: [
      'Sterilisasi uap suhu tinggi 100°C tersegel plastik higienis',
      'Armada tiba di lokasi sekolah minimal H-2 gladi resik',
      'Fleksibilitas sebaran ukuran anak & dewasa',
      'Penerimaan SPK dan nota dinas sekolah/BOS',
    ],
    ctaText: 'Lihat Katalog Sewa',
    ctaHref: '/penyewaan',
    badge: 'Hemat Anggaran',
  },
  {
    slug: 'konsultasi-desain-bespoke',
    title: 'Adibusana Bespoke & Bordir Komputer Custom',
    tagline: 'Eksklusivitas Desain Sesuai Karakter Maskot Korps',
    desc: 'Layanan jahit khusus kostum mayoret, field commander, dan color guard dengan bahan-bahan premium seperti Beludru Velvet, ornamen kordon emas, dan bordir timbul 3D berpresisi tinggi.',
    features: [
      'Konsultasi sketsa desain bersama master tailor & owner',
      'Bahan-bahan premium mewah tahan panggung',
      'Bordir komputer resolusi tinggi padat benang',
      'Penyesuaian tema warna dan logo sekolah',
    ],
    ctaText: 'Konsultasi Desain Custom',
    ctaHref: '/pesan-seragam?type=custom',
    badge: 'Eksklusif',
  },
  {
    slug: 'aksesori-dan-perlengkapan',
    title: 'Pengadaan Aksesori & Perlengkapan Korps Lengkap',
    tagline: 'Topi Shako, Bulu Ostrich, Sepatu & Sarung Tangan',
    desc: 'Penyedia perlengkapan pendukung parade drum band terlengkap mulai dari topi shako visor glossy, bulu burung unta asli, kordon komando, sarung tangan anti-slip, hingga sepatu bot parade.',
    features: [
      'Topi shako tahan benturan dengan visor glossy',
      'Bulu ostrich impor mekar dan tegak sempurna',
      'Sarung tangan stretch anti-licin saat memegang stik',
      'Tersedia untuk pembelian langsung atau paket bundling',
    ],
    ctaText: 'Buka Katalog Aksesori',
    ctaHref: '/katalog',
    badge: 'Pelengkap',
  },
];

export default function ServicesPage() {
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
            <span className="text-[#1E3A8A] font-semibold">Layanan Kami</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>SOLUSI TERINTEGRASI KONVEKSI & PENYEWAAN</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#17245F] tracking-tight">
              Layanan Konveksi & Pengadaan Seragam Drum Band
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Vieguard menyediakan ekosistem lengkap pengadaan seragam marching band, karnaval, dan acara akademik institusi sekolah dengan standar pengerjaan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.slug}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(20,30,60,0.06)] hover:shadow-lg hover:border-[#1E3A8A]/30 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#EAF0FF] text-[#1E3A8A]">
                    {srv.badge}
                  </span>
                  <Link
                    href={`/layanan/${srv.slug}`}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    Pelajari Selengkapnya →
                  </Link>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-[#17245F]">{srv.title}</h2>
                  <p className="text-xs font-semibold text-[#F59E0B]">{srv.tagline}</p>
                </div>

                <p className="text-xs text-[#667085] leading-relaxed">{srv.desc}</p>

                <div className="pt-2 border-t border-[#F1F5F9] space-y-2">
                  <span className="text-[11px] font-bold text-[#172033] block">Fitur Utama:</span>
                  <ul className="space-y-1.5 text-xs text-[#475569]">
                    {srv.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                <Link
                  href={srv.ctaHref}
                  className="h-11 px-6 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/konsultasi-chat"
                  className="h-11 px-4 border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#172033] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#667085]" />
                  <span>Tanya CS</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Standar Kualitas & Legalitas Terjamin</span>
            </div>
            <p className="text-xs text-[#667085] max-w-xl">
              Kami melayani pembayaran melalui SPK resmi, faktur pajak resmi, dan dokumen bendahara BOS sekolah di seluruh Indonesia.
            </p>
          </div>
          <Link
            href="/pesan-seragam-layanan"
            className="h-11 px-6 bg-white border border-[#1E3A8A]/30 hover:border-[#1E3A8A] text-[#1E3A8A] font-semibold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all shrink-0"
          >
            Baca Panduan Lengkap Pemesanan
          </Link>
        </div>
      </div>
    </div>
  );
}
