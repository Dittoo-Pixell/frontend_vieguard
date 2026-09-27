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
  SlidersHorizontal,
  Package,
  ShoppingBag,
  Eye,
  ChevronRight,
  Home,
  X,
  Tag,
  Layers,
} from 'lucide-react';

function getPrimaryImage(product: Product): string | null {
  if (!product.images || product.images.length === 0) return null;
  const primary = product.images.find((img) => img.isPrimary);
  return (primary || product.images[0])?.imageUrl || null;
}

function getDisplayPrice(product: Product): string {
  if (product.basePriceBuy) return formatRupiah(product.basePriceBuy);
  if (product.basePriceRent) return `${formatRupiah(product.basePriceRent)} /sewa`;
  return 'Hubungi Kami';
}

function getTotalStock(product: Product): number {
  if (!product.variants) return 0;
  return product.variants.reduce((sum, v) => sum + v.stockBuy + v.stockRent, 0);
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-2 pt-1">
        <Skeleton className="w-2/5 h-5 rounded" />
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-3/4 h-4 rounded" />
        <div className="flex justify-between pt-2">
          <Skeleton className="w-1/3 h-6 rounded" />
          <Skeleton className="w-1/4 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function KatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
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

  const { data: productsRes, isLoading: prodLoading, isError: prodError } = useQuery({
    queryKey: ['products', debouncedSearch, selectedCategory],
    queryFn: () =>
      productService.getProducts({
        search: debouncedSearch || undefined,
        categoryId: selectedCategory || undefined,
      }),
  });

  const categories: Category[] = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const products: Product[] = Array.isArray(productsRes?.data) ? productsRes.data : [];

  return (
    <div className="w-full pb-16">
      {/* Page Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-4">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Katalog Produk</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#17245F] tracking-tight">
                Katalog Produk Seragam & Perlengkapan
              </h1>
              <p className="text-sm text-[#667085] mt-1">
                Jelajahi koleksi seragam drum band, marching band, dan jas wisuda berkualitas tinggi
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="border border-[#E5E7EB] bg-[#F1F5F9] px-3 py-1.5 rounded-lg text-xs text-[#667085] font-medium">
                {prodLoading ? '...' : `${products.length} Produk`}
              </span>
              <span className="border border-[#F59E0B]/30 bg-amber-50 px-3 py-1.5 rounded-lg text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Beli & Sewa Tersedia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[80px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari nama produk, kategori, atau deskripsi..."
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

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#667085] hidden lg:block" />
              <span className="text-xs text-[#667085] font-medium hidden lg:block">Filter:</span>
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
              Semua{!catLoading && ` (${products.length})`}
            </button>
            {catLoading
              ? [1, 2, 3].map((i) => <Skeleton key={i} className="w-24 h-8 rounded-lg" />)
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
                    {cat._count?.products != null && ` (${cat._count.products})`}
                  </button>
                ))}
          </div>
        </div>
      </div>

      {/* Results Info Strip */}
      <div className="w-full bg-[#EAF0FF]/40 border-b border-[#1E3A8A]/10 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-[#667085] gap-2">
          <div className="flex items-center gap-2 font-medium text-[#17245F]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
            {prodLoading ? 'Memuat data produk...' : `Menampilkan ${products.length} Produk`}
          </div>
          <span className="text-[#667085]">
            Semua produk tersedia untuk pembelian langsung atau penyewaan
          </span>
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
            <h3 className="text-base font-bold text-[#172033]">Katalog Belum Terhubung</h3>
            <p className="text-sm text-[#667085] max-w-md">
              Server backend atau database sedang dalam proses integrasi. Halaman ini akan menampilkan produk setelah sistem terhubung.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
            <Search className="w-12 h-12 text-[#98A2B3]" />
            <h3 className="text-base font-bold text-[#172033]">Produk Tidak Ditemukan</h3>
            <p className="text-sm text-[#667085] max-w-md">
              {debouncedSearch
                ? `Tidak ada produk yang cocok dengan pencarian "${debouncedSearch}".`
                : 'Belum ada produk tersedia untuk kategori ini.'}
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
              const totalStock = getTotalStock(product);
              const availableSizes = product.variants?.map((v) => v.size).join(', ') || '-';

              return (
                <Link
                  key={product.id}
                  href={`/katalog/${product.id}`}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_16px_rgba(20,30,60,0.08)] hover:shadow-[0_10px_25px_-3px_rgba(20,30,60,0.12)] hover:border-[#1E3A8A]/40 transition-all group"
                >
                  {/* Image */}
                  <div className="space-y-3.5">
                    <div className="w-full h-48 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E5E7EB]/60 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                      {imageUrl ? (
                        <Image
                          src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v0/website', '')}${imageUrl}`}
                          alt={product.name}
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[#1E3A8A]/70" />
                          </div>
                          <span className="text-xs text-[#98A2B3] font-medium">Gambar Produk</span>
                        </div>
                      )}
                    </div>

                    {/* Category & Name */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="border border-[#1E3A8A]/20 bg-[#EAF0FF] text-[#1E3A8A] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold tracking-wide uppercase">
                        {product.category?.name || 'Umum'}
                      </span>
                      {product.isCustomAvailable && (
                        <span className="text-[10px] text-[#F59E0B] font-semibold border border-[#F59E0B]/30 bg-amber-50 px-2 py-0.5 rounded-md">
                          CUSTOM
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-[#17245F] group-hover:text-[#1E3A8A] transition-colors line-clamp-2 min-h-[42px]">
                      {product.name}
                    </h2>

                    {/* Variant Info */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB]/80 rounded-xl text-xs text-[#667085] space-y-1">
                      <div className="font-semibold text-[#344054] flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Ukuran Tersedia:
                      </div>
                      <div className="text-[#667085]">{availableSizes}</div>
                    </div>

                    {/* Price & Stock */}
                    <div className="border-t border-[#F1F5F9] pt-3 space-y-1">
                      <div className="text-xl font-bold text-[#1E3A8A]">
                        {getDisplayPrice(product)}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Stok: {totalStock} unit
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <span className="w-full h-11 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all group-hover:gap-3">
                      <Eye className="w-4 h-4" />
                      Lihat Detail Produk
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
