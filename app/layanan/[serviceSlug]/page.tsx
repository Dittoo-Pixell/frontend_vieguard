'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { NotFoundState } from '@/components/ui/NotFoundState';
import {
  ChevronRight,
  Home,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageCircle,
  Truck,
  Scissors,
  Sparkles,
  Package,
} from 'lucide-react';

const SERVICES_DATA: Record<
  string,
  {
    title: string;
    tagline: string;
    badge: string;
    description: string;
    benefits: string[];
    steps: { step: string; title: string; desc: string }[];
    ctaText: string;
    ctaHref: string;
  }
> = {
  'konveksi-seragam-drumband': {
    title: 'Konveksi Seragam Drum Band & Marching Band',
    tagline: 'Standar Pola Ergonomis & Jahitan Garmen Institusi',
    badge: 'Produksi Garment',
    description:
      'Layanan produksi seragam drum band dan marching band dengan harga pasti per jenjang pendidikan: TK (Rp 600rb), SD (Rp 700rb), dan Umum/SMP/SMA (Rp 800rb). Dikerjakan dengan bahan pilihan standar seperti Nagata Drill, American Drill, dan Japan Drill yang tidak panas dan tahan cuaca parade luar ruangan.',
    benefits: [
      'Harga pokok pasti transparan tanpa biaya tersembunyi',
      'Pola ergonomis memudahkan tangan memukul snare, bass, dan manuver tongkat mayoret',
      'Pengecekan kualitas 4 tahap (Pola, Jahit, Bordir, dan Setrika Uap)',
      'Garansi retur & fitting perbaikan ukuran selama 7 hari kalender',
    ],
    steps: [
      { step: '01', title: 'Pilih Jenjang & Bahan', desc: 'Tentukan jenjang TK/SD/Umum dan bahan standar yang diinginkan.' },
      { step: '02', title: 'Distribusi Ukuran Siswa', desc: 'Isi formulir rekap ukuran S, M, L, XL, XXL personel korps.' },
      { step: '03', title: 'Verifikasi PO & DP 50%', desc: 'Owner memverifikasi pesanan dan antrean jahit dialokasikan setelah DP.' },
      { step: '04', title: 'Produksi & Finishing Uap', desc: 'Penjahitan di workshop dengan standar inspeksi mutu berkala.' },
      { step: '05', title: 'Pelunasan & Pengiriman', desc: 'Pengiriman via kargo aman berpeti kayu langsung ke lokasi sekolah.' },
    ],
    ctaText: 'Buka Formulir Pemesanan Standar',
    ctaHref: '/pesan-seragam',
  },
  'penyewaan-armada-seragam': {
    title: 'Penyewaan Armada Seragam Siap Pakai',
    tagline: 'Sterilisasi Uap 100°C & Pengiriman Garansi H-2 Acara',
    badge: 'Rental Kilat',
    description:
      'Layanan sewa armada seragam parade dan marching band untuk sekolah yang memerlukan seragam cepat tanpa harus menunggu waktu produksi garmen. Armada kami selalu dibersihkan dengan teknologi sterilisasi uap bersuhu 100°C, wangi, higienis, dan terbungkus rapi siap pakai.',
    benefits: [
      'Solusi hemat anggaran hingga 70% dibanding pengadaan baru',
      'Garansi seragam tiba di sekolah minimal H-2 sebelum acara gladi resik',
      'Ukuran fleksibel dengan unit cadangan gratis untuk penyesuaian lapangan',
      'Penerimaan SPK dinas dan nota resmi sekolah',
    ],
    steps: [
      { step: '01', title: 'Pilih Model di Katalog', desc: 'Pilih model seragam sewa yang sesuai dengan tema acara Anda.' },
      { step: '02', title: 'Pilih Tanggal & Ukuran', desc: 'Tentukan tanggal pakai dan jumlah stel per ukuran.' },
      { step: '03', title: 'Booking & Konfirmasi', desc: 'Sistem mengunci kuota armada sewa agar tidak bentrok dengan sekolah lain.' },
      { step: '04', title: 'Pengiriman Tersegel', desc: 'Armada dikirimkan dalam kondisi steril tersegel plastik.' },
      { step: '05', title: 'Pengembalian Pasca Acara', desc: 'Seragam dikembalikan setelah acara tanpa perlu dicuci.' },
    ],
    ctaText: 'Pilih Model di Katalog Sewa',
    ctaHref: '/penyewaan',
  },
  'konsultasi-desain-bespoke': {
    title: 'Adibusana Bespoke & Bordir Komputer Custom',
    tagline: 'Eksklusivitas Desain Sesuai Karakter Maskot Korps',
    badge: 'Jahit Custom',
    description:
      'Layanan jahit kustom tingkat tinggi untuk institusi yang menginginkan tampilan panggung megah dan beda dari yang lain. Menggunakan bahan premium seperti Beludru Velvet, ornamen kordon emas, rumbai militer, dan bordir timbul 3D beresolusi tinggi.',
    benefits: [
      'Konsultasi intensif bersama master tailor & owner',
      'Bebas menentukan kombinasi warna tema dan sketsa logo sekolah',
      'Estimasi biaya penawaran resmi (Quotation) dihitung personal',
      'Hasil jahitan eksklusif meningkatkan gengsi korps di kejuaraan nasional',
    ],
    steps: [
      { step: '01', title: 'Kirim Draf Konsep Desain', desc: 'Isi form custom dengan foto referensi dan preferensi bahan premium.' },
      { step: '02', title: 'Review Quote oleh Owner', desc: 'Owner menghitung estimasi biaya resmi sesuai tingkat kerumitan pola.' },
      { step: '03', title: 'Konsultasi & Sketsa Mockup', desc: 'Diskusi mockup digital melalui live chat / WhatsApp.' },
      { step: '04', title: 'Produksi Spesialis Tailor', desc: 'Dikerjakan langsung oleh penjahit ahli adibusana panggung.' },
    ],
    ctaText: 'Mulai Pengajuan Desain Custom',
    ctaHref: '/pesan-seragam?type=custom',
  },
  'aksesori-dan-perlengkapan': {
    title: 'Pengadaan Aksesori & Perlengkapan Korps Lengkap',
    tagline: 'Topi Shako, Bulu Ostrich, Sepatu & Sarung Tangan',
    badge: 'Aksesori Korps',
    description:
      'Penyedia resmi perlengkapan pendukung seragam parade marching band terlengkap. Mulai dari topi shako visor glossy, bulu burung unta impor yang tegak mekar, sarung tangan anti-licin, hingga sepatu parade standar drum band.',
    benefits: [
      'Kualitas bahan tebal dan tahan benturan di lapangan',
      'Pilihan warna kordon komando dan visor lengkap',
      'Dapat dibeli terpisah atau dibundling dengan paket seragam',
      'Stok ready kirim untuk perlengkapan darurat',
    ],
    steps: [
      { step: '01', title: 'Buka Katalog Aksesori', desc: 'Pilih perlengkapan tambahan yang dibutuhkan korps Anda.' },
      { step: '02', title: 'Tentukan Jumlah Unit', desc: 'Masukkan kuantitas unit topi, sarung tangan, atau sepatu.' },
      { step: '03', title: 'Proses Pesanan', desc: 'Dikirim bersamaan dengan paket seragam utama atau dikirim kilat.' },
    ],
    ctaText: 'Buka Katalog Produk',
    ctaHref: '/katalog',
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.serviceSlug as string;

  const service = SERVICES_DATA[slug];

  if (!service) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20">
        <NotFoundState
          title="Layanan Tidak Ditemukan"
          description="Layanan yang Anda cari tidak tersedia dalam daftar spesifikasi kami."
          backHref="/layanan"
          backText="Kembali ke Daftar Layanan"
        />
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
            <Link href="/layanan" className="hover:text-[#1E3A8A] transition-colors">
              Layanan Kami
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">{service.title}</span>
          </nav>

          <div className="max-w-4xl space-y-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#EAF0FF] text-[#1E3A8A]">
              {service.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#17245F] tracking-tight">
              {service.title}
            </h1>
            <p className="text-sm font-semibold text-[#F59E0B]">{service.tagline}</p>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed pt-1">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Benefits & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17245F] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1E3A8A]" />
              Keunggulan Layanan Ini
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-[#17245F] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              Ketentuan Waktu & Garansi
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Seluruh proses penjahitan dan alokasi armada didukung oleh komitmen ketepatan waktu. Kami menjamin seragam siap pakai sebelum tanggal kegiatan gladi resik sekolah berlangsung.
            </p>
            <div className="pt-2">
              <Link
                href="/konsultasi-chat"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A8A] hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasikan Kebutuhan Jadwal Anda →
              </Link>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">
              ALUR PENGERJAAN
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17245F]">
              Tahapan Pengerjaan Layanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.steps.map((st, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2 shadow-xs"
              >
                <span className="text-2xl font-bold font-mono text-[#1E3A8A]/25 block">
                  {st.step}
                </span>
                <h4 className="text-xs font-bold text-[#17245F]">{st.title}</h4>
                <p className="text-[11px] text-[#667085] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#17245F] to-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Siap Menggunakan Layanan Ini?
            </h3>
            <p className="text-xs sm:text-sm text-[#EAF0FF]/90 max-w-lg">
              Ajukan pemesanan atau konsultasikan kebutuhan korps sekolah Anda langsung bersama customer service kami.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={service.ctaHref}
              className="h-12 px-8 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all shrink-0"
            >
              <span>{service.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
