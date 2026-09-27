'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product, Category } from '@/types/product';
import { formatRupiah } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Search,
  Home,
  ChevronRight,
  Package,
  X,
  Layers,
  ShieldCheck,
  Truck,
  ClipboardCheck,
  CalendarCheck,
} from 'lucide-react';

function getPrimaryImage(product: Product): string | null {
  if (!product.images || product.images.length === 0) return null;
  const primary = product.images.find((img) => img.isPrimary);
  return (primary || product.images[0])?.imageUrl || null;
}

function getImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v0/website', '') || 'http://localhost:5000';
  return `${base}${url}`;
}

function getRentDisplayPrice(product: Product): string {
  if (product.basePriceRent) return formatRupiah(product.basePriceRent);
  if (product.basePriceBuy) return formatRupiah(product.basePriceBuy);
  return 'Hubungi Kami';
}

function getRentStock(product: Product): number {
  if (!product.variants) return 0;
  return product.variants.reduce((sum, v) => sum + v.stockRent, 0);
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3.5">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-2/5 h-5 rounded" />
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-full h-16 rounded-xl" />
        <div className="flex justify-between pt-2">
          <Skeleton className="w-1/3 h-6 rounded" />
          <Skeleton className="w-1/4 h-5 rounded" />
        </div>
        <Skeleton className="w-full h-11 rounded-xl" />
      </div>
    </div>
  );
}

export default function PenyewaanPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const searchTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => setDebouncedSearch(value), 400);
  };

  const { data: categoriesRes, isLoading: catLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  });

  // Products with rental stock
  const { data: productsRes, isLoading: prodLoading, isError: prodError } = useQuery({
    queryKey: ['products-rental', debouncedSearch, selectedCategory],
    queryFn: () =>
      productService.getProducts({
        search: debouncedSearch || undefined,
        categoryId: selectedCategory || undefined,
      }),
    select: (res) => {
      // Filter only products that have rental stock or rental price
      const filtered = Array.isArray(res?.data)
        ? res.data.filter(
            (p) => p.basePriceRent || (p.variants && p.variants.some((v) => v.stockRent > 0))
          )
        : [];
      return { ...res, data: filtered };
    },
  });

  const categories: Category[] = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const products: Product[] = Array.isArray(productsRes?.data) ? productsRes.data : [];

  return (
    <div className="w-full pb-16">
      {/* Page Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-4">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Katalog Penyewaan</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#17245F] tracking-tight">
                Katalog Penyewaan Armada Seragam, Topi Shako & Instrumen
              </h1>
              <p className="text-sm text-[#667085] mt-1">
                Solusi cepat untuk festival, karnaval hari besar nasional, dan seragam darurat. Bersih, steril, dan inspeksi fungsi terjamin.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="border border-[#E5E7EB] bg-[#F1F5F9] px-3 py-1.5 rounded-lg text-xs text-[#667085] font-medium">
                {prodLoading ? '...' : `${products.length} Unit Tersedia`}
              </span>
              <span className="border border-[#E5E7EB] bg-[#F1F5F9] px-3 py-1.5 rounded-lg text-xs text-[#667085] font-medium">
                Ukuran S - XXL
              </span>
              <span className="border border-[#F59E0B]/30 bg-amber-50 px-3 py-1.5 rounded-lg text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Pengiriman Kilat H-2
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[80px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari seragam sewa, jenis alat, shako..."
                className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => { setSearch(''); setDebouncedSearch(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#172033]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E5E7EB]">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`h-8 px-4 rounded-lg text-xs font-semibold flex items-center transition-all shadow-sm ${
                !selectedCategory
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white hover:bg-[#EAF0FF] text-[#475569] hover:text-[#1E3A8A] border border-[#E5E7EB]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 mr-1.5" />
              Semua Kategori
            </button>
            {catLoading
              ? [1, 2, 3].map((i) => <Skeleton key={i} className="w-28 h-8 rounded-lg" />)
              : categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                    className={`h-8 px-4 rounded-lg text-xs font-medium flex items-center transition-all shadow-sm ${
                      selectedCategory === cat.id
                        ? 'bg-[#1E3A8A] text-white'
                        : 'bg-white hover:bg-[#EAF0FF] text-[#475569] hover:text-[#1E3A8A] border border-[#E5E7EB]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
          </div>
        </div>
      </div>

      {/* Info Strip */}
      <div className="w-full bg-[#EAF0FF]/40 border-b border-[#1E3A8A]/10 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-[#667085] gap-2">
          <div className="flex items-center gap-2 font-medium text-[#17245F]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
            {prodLoading ? 'Memuat armada...' : `Menampilkan ${products.length} Unit Armada Tersedia`}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#667085]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A]" />
              Sterilisasi Uap 100°C & Siap Pakai
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {prodLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : prodError ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
            <Package className="w-12 h-12 text-[#98A2B3]" />
            <h3 className="text-base font-bold text-[#172033]">Layanan Penyewaan Belum Terhubung</h3>
            <p className="text-sm text-[#667085] max-w-md">
              Server backend atau database sedang dalam proses integrasi. Halaman ini akan menampilkan armada sewa setelah sistem terhubung.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
            <Search className="w-12 h-12 text-[#98A2B3]" />
            <h3 className="text-base font-bold text-[#172033]">Unit Sewa Tidak Ditemukan</h3>
            <p className="text-sm text-[#667085] max-w-md">
              {debouncedSearch
                ? `Tidak ada armada yang cocok dengan pencarian "${debouncedSearch}".`
                : 'Belum ada unit sewa tersedia untuk kategori ini.'}
            </p>
            {(debouncedSearch || selectedCategory) && (
              <button
                onClick={() => { setSearch(''); setDebouncedSearch(''); setSelectedCategory(null); }}
                className="mt-2 text-xs font-bold text-white bg-[#1E3A8A] px-4 py-2 rounded-lg hover:bg-[#17245F] transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const imageUrl = getPrimaryImage(product);
              const rentStock = getRentStock(product);
              const sizes = product.variants?.filter((v) => v.stockRent > 0).map((v) => v.size).join(', ') || '-';

              return (
                <Link
                  key={product.id}
                  href={`/penyewaan/${product.id}`}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_16px_rgba(20,30,60,0.08)] hover:shadow-[0_10px_25px_-3px_rgba(20,30,60,0.12)] hover:border-[#1E3A8A]/40 transition-all group"
                >
                  <div className="space-y-3.5">
                    {/* Image */}
                    <div className="w-full h-48 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E5E7EB]/60 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                      {imageUrl ? (
                        <Image
                          src={getImageUrl(imageUrl)}
                          alt={product.name}
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <Package className="w-6 h-6 text-[#1E3A8A]/70" />
                          </div>
                          <span className="text-xs text-[#98A2B3] font-medium">Gambar Produk</span>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="border border-[#1E3A8A]/20 bg-[#EAF0FF] text-[#1E3A8A] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold tracking-wide uppercase">
                        {product.category?.name || 'UMUM'}
                      </span>
                      <span className="text-[10px] text-[#98A2B3] font-mono">
                        ID: {product.id}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="text-base font-bold text-[#17245F] group-hover:text-[#1E3A8A] transition-colors line-clamp-2 min-h-[42px]">
                      {product.name}
                    </h2>

                    {/* Included Components */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB]/80 rounded-xl text-xs text-[#667085] space-y-1">
                      <div className="font-semibold text-[#344054] flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Ukuran Sewa Tersedia:
                      </div>
                      <div className="text-[#667085]">{sizes}</div>
                    </div>

                    {/* Price & Stock */}
                    <div className="border-t border-[#F1F5F9] pt-3 space-y-1">
                      <div className="text-xl font-bold text-[#1E3A8A]">
                        {getRentDisplayPrice(product)}
                        <span className="text-sm font-normal text-[#667085] ml-1">/ hari</span>
                      </div>
                      <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Tersedia: {rentStock} unit
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <span className="w-full h-11 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all group-hover:gap-3">
                      Cek Tanggal & Sewa →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Guarantee Section */}
        {!prodLoading && !prodError && products.length > 0 && (
          <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_16px_rgba(20,30,60,0.08)] space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-[#17245F]">
                  Jaminan & Protokol Sewa Resmi
                </h3>
                <p className="text-sm text-[#667085]">
                  Standar kepatuhan resmi untuk sekolah, yayasan, instansi kedinasan, dan perkumpulan orkes drum.
                </p>
              </div>
              <span className="border border-[#1E3A8A]/20 bg-[#EAF0FF] text-[#1E3A8A] px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                KEBIJAKAN TERVERIFIKASI
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-[#EAF0FF]/50 border border-[#1E3A8A]/10 rounded-xl space-y-2 hover:bg-[#EAF0FF]/80 transition-colors">
                <div className="flex items-center gap-2 font-bold text-sm text-[#17245F]">
                  <ShieldCheck className="w-5 h-5 text-[#1E3A8A]" />
                  Sterilisasi Uap 100°C
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Semua seragam melalui pencucian higienis dan setrika uap suhu tinggi sebelum dimasukkan ke garment bag tersegel.
                </p>
              </div>
              <div className="p-5 bg-[#EAF0FF]/50 border border-[#1E3A8A]/10 rounded-xl space-y-2 hover:bg-[#EAF0FF]/80 transition-colors">
                <div className="flex items-center gap-2 font-bold text-sm text-[#17245F]">
                  <ClipboardCheck className="w-5 h-5 text-[#1E3A8A]" />
                  Deposit Fleksibel / SPK Resmi
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Institusi pendidikan dapat mengganti uang deposit tunai dengan Surat Perintah Kerja (SPK) atau rekomendasi resmi kepala sekolah.
                </p>
              </div>
              <div className="p-5 bg-[#EAF0FF]/50 border border-[#1E3A8A]/10 rounded-xl space-y-2 hover:bg-[#EAF0FF]/80 transition-colors">
                <div className="flex items-center gap-2 font-bold text-sm text-[#17245F]">
                  <Truck className="w-5 h-5 text-[#1E3A8A]" />
                  Pengiriman H-2 Acara
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Armada tiba 48 jam sebelum hari gladi resik atau pentas guna memastikan fitting ukuran dan pengecekan fungsi alat.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        {!prodLoading && !prodError && products.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-[#17245F] to-[#1E3A8A] rounded-2xl shadow-[0_4px_16px_rgba(20,30,60,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white">
                Butuh Paket Sewa Lengkap untuk Korps Penuh 40-70 Personel?
              </h3>
              <p className="text-sm text-[#EAF0FF]/90">
                Konsultasikan kebutuhan armada sewa Anda untuk mendapatkan penawaran diskon kolektif.
              </p>
            </div>
            <Link
              href="/konsultasi-chat"
              className="h-11 px-6 bg-[#F59E0B] hover:bg-amber-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              Konsultasi & Penawaran Kolektif
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
