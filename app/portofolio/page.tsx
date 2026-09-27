'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  ChevronRight,
  Home,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  Award,
  Calendar,
  Building2,
  Users,
  Eye,
  X,
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  units: number;
  fabric: string;
  imageUrl: string;
  description: string;
  highlights: string[];
}

const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Seragam Korps Gita Nusantara',
    client: 'SMP Negeri 1 Surabaya',
    category: 'SMP / Kadet Remaja',
    year: '2025',
    units: 52,
    fabric: 'Nagata Drill Super & Lis Gold Foil',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
    description: 'Set lengkap mayoret, gitapati, perkusi snare, bass drum, dan pianika formasi parade hari kemerdekaan.',
    highlights: ['Pola ergonomis manuver parade', 'Bordir komputer logo 3D', 'Sterilisasi setrika uap presisi'],
  },
  {
    id: 'p2',
    title: 'Kostum Adibusana Field Commander',
    client: 'SMA Negeri 3 Bandung',
    category: 'SMA / Dewasa',
    year: '2025',
    units: 64,
    fabric: 'Kain Beludru Velvet Navy & Epaulet Logam',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    description: 'Kustom khusus adibusana bespoke dengan hiasan kordon emas ganda dan topi shako bulu ostrich grade A.',
    highlights: ['Kain velvet tebal tidak panas', 'Bulu ostrich terawat dan tegak', 'Garansi fitting 7 hari'],
  },
  {
    id: 'p3',
    title: 'Seragam Parade Cilik Bintang Harapan',
    client: 'TK Al-Azhar Kelapa Gading Jakarta',
    category: 'TK / Pra-Kadet',
    year: '2024',
    units: 35,
    fabric: 'American Drill 1919 Ringan & Lembut',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    description: 'Dirancang dengan bobot sangat ringan dan sirkulasi udara optimal agar siswa usia dini nyaman saat festival karnaval.',
    highlights: ['Bahan adem & hypoallergenic', 'Kancing magnet mudah dipakai', 'Warna cerah tahan cuaca'],
  },
  {
    id: 'p4',
    title: 'Armada Seragam Pasukan Drum Band SD',
    client: 'SD Muhammadiyah 4 Pucang',
    category: 'SD / Kadet Junior',
    year: '2024',
    units: 48,
    fabric: 'Japan Drill High-Grade & Lis Silver',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    description: 'Kombinasi warna merah marun dan putih gading yang gagah dan tegap saat atraksi konser display panggung.',
    highlights: ['Jahitan 4 lapis anti-robek', 'Visor topi glossy anti-gores', 'Resleting YKK original'],
  },
  {
    id: 'p5',
    title: 'Toga & Jas Wisuda Kehormatan Senat',
    client: 'Universitas Terbuka Surabaya',
    category: 'Jas Almamater / Wisuda',
    year: '2025',
    units: 120,
    fabric: 'Wool-Blend Jet Black & Satin Silk Gordon',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    description: 'Pengerjaan konveksi jubah akademik rektorat dan senat dengan draping mewah dan medali cor kuningan.',
    highlights: ['Draping kain tegap elegan', 'Gordon satin sablon emas', 'Packing dry-cleaning steril'],
  },
  {
    id: 'p6',
    title: 'Seragam Marching Band Bhayangkara',
    client: 'Korps Musik Kedinasan Jawa Timur',
    category: 'SMA / Dewasa',
    year: '2024',
    units: 80,
    fabric: 'Drill Nagata Drill Khaki & Pangkat Metal',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    description: 'Seragam brass section dan percussion line resmi untuk upacara kenegaraan dan festival parade jalanan.',
    highlights: ['Standar militer bersertifikat', 'Bantalan pundak tebal peredam beban alat', 'Tahan cuaca hujan ringan'],
  },
];

const CATEGORIES = [
  'Semua Kategori',
  'TK / Pra-Kadet',
  'SD / Kadet Junior',
  'SMP / Kadet Remaja',
  'SMA / Dewasa',
  'Jas Almamater / Wisuda',
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');
  const [selectedModalItem, setSelectedModalItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio = MOCK_PORTFOLIO.filter((item) => {
    const matchCategory =
      selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

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
            <span className="text-[#1E3A8A] font-semibold">Portofolio & Rekam Jejak</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A] mb-2">
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>KARYA & REKAM JEJAK KONVEKSI RESMI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F] tracking-tight">
                Galeri Portofolio Seragam Drum Band & Marching Band
              </h1>
              <p className="text-xs sm:text-sm text-[#667085] mt-1 max-w-2xl leading-relaxed">
                Dokumentasi hasil jahitan nyata berbagai korps musik sekolah, madrasah, dan perguruan tinggi di seluruh Indonesia dengan jaminan mutu jahitan garmen kelas profesional.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xs self-start md:self-auto">
              <div className="w-12 h-12 rounded-xl bg-[#EAF0FF] text-[#1E3A8A] flex items-center justify-center font-bold text-lg">
                480+
              </div>
              <div>
                <span className="text-xs font-bold text-[#17245F] block">Proyek Selesai</span>
                <span className="text-[11px] text-[#667085]">Dipercaya sejak 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Search, Sort & Filter Bar */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari nama sekolah, tipe seragam, atau instansi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#172033] focus:outline-none focus:border-[#1E3A8A] shrink-0"
            >
              <option value="terbaru">Urutan: Proyek Terbaru</option>
              <option value="terbanyak">Urutan: Kuantitas Terbanyak</option>
              <option value="abjad">Urutan: Nama Sekolah (A-Z)</option>
            </select>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#667085] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolio.length === 0 ? (
          <EmptyState
            title="Proyek Tidak Ditemukan"
            description={`Tidak ada portofolio yang cocok dengan kriteria "${search}".`}
            actionText="Reset Pencarian"
            onAction={() => {
              setSearch('');
              setSelectedCategory('Semua Kategori');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(20,30,60,0.06)] hover:shadow-lg hover:border-[#1E3A8A]/30 transition-all flex flex-col group"
              >
                {/* Image Showcase */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#17245F]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {item.units} Stel Selesai
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wide flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {item.client}
                    </span>
                    <h3 className="text-base font-bold text-[#17245F] group-hover:text-[#1E3A8A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-3">
                    <div className="text-[11px] text-[#475569]">
                      <span className="text-[#98A2B3]">Bahan:</span> <strong>{item.fabric}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedModalItem(item)}
                      className="w-full h-10 bg-[#EAF0FF] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Lihat Rincian Studi Kasus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#17245F] to-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ingin Seragam Sekolah Anda Tampil Gagah Seperti Ini?
            </h3>
            <p className="text-xs sm:text-sm text-[#EAF0FF]/90 max-w-xl">
              Pilih paket standar harga tetap atau konsultasikan desain custom bordir khusus bersama tim ahli kami.
            </p>
          </div>
          <Link
            href="/pesan-seragam"
            className="h-12 px-8 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all shrink-0"
          >
            Pesan Seragam Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-scaleUp">
            <div className="p-4 sm:p-5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#1E3A8A] bg-[#EAF0FF] px-2.5 py-0.5 rounded">
                  {selectedModalItem.category}
                </span>
                <h3 className="text-base font-bold text-[#17245F] mt-1">
                  {selectedModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModalItem(null)}
                className="p-1 rounded-lg text-[#98A2B3] hover:text-[#172033] hover:bg-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="w-full aspect-video relative rounded-xl overflow-hidden">
                <Image
                  src={selectedModalItem.imageUrl}
                  alt={selectedModalItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="text-[#98A2B3] block">Nama Institusi:</span>
                  <strong className="text-[#172033] text-sm">{selectedModalItem.client}</strong>
                </div>
                <div>
                  <span className="text-[#98A2B3] block">Total Pengerjaan:</span>
                  <strong className="text-[#1E3A8A] text-sm">{selectedModalItem.units} Stel</strong>
                </div>
                <div>
                  <span className="text-[#98A2B3] block">Material Kain:</span>
                  <strong className="text-[#172033]">{selectedModalItem.fabric}</strong>
                </div>
                <div>
                  <span className="text-[#98A2B3] block">Tahun Produksi:</span>
                  <strong className="text-[#172033]">{selectedModalItem.year}</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-[#17245F]">Deskripsi Proyek:</h4>
                <p className="text-[#667085] leading-relaxed">{selectedModalItem.description}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-[#17245F]">Keunggulan Spesifikasi:</h4>
                <ul className="space-y-1 text-[#475569]">
                  {selectedModalItem.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3 bg-[#F8FAFC]">
              <button
                type="button"
                onClick={() => setSelectedModalItem(null)}
                className="h-10 px-4 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#475569] hover:bg-white"
              >
                Tutup
              </button>
              <Link
                href="/pesan-seragam"
                className="h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                Pesan Model Serupa
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
