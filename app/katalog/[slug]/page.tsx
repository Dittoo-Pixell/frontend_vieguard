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
  ShoppingBag,
  Tag,
  Package,
  CheckCircle2,
  ShieldCheck,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRightIcon,
  Ruler,
  AlertTriangle,
} from 'lucide-react';

function getImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v0/website', '') || 'http://localhost:5000';
  return `${base}${url}`;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.slug as string;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
  });

  const product: Product | null = res?.data || null;

  // Derived
  const images = product?.images || [];
  const variants = product?.variants || [];
  const currentImage = images[selectedImageIndex];

  const getPrice = () => {
    if (selectedVariant?.priceBuyOverride) return formatRupiah(selectedVariant.priceBuyOverride);
    if (product?.basePriceBuy) return formatRupiah(product.basePriceBuy);
    return null;
  };

  const getRentPrice = () => {
    if (selectedVariant?.priceRentOverride) return formatRupiah(selectedVariant.priceRentOverride);
    if (product?.basePriceRent) return formatRupiah(product.basePriceRent);
    return null;
  };

  const buyPrice = getPrice();
  const rentPrice = getRentPrice();

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
              <Skeleton className="w-1/2 h-10 rounded" />
              <Skeleton className="w-full h-24 rounded-xl" />
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
            <h3 className="text-base font-bold text-[#172033]">Produk Tidak Ditemukan</h3>
            <p className="text-sm text-[#667085] max-w-md">
              Server backend/database belum aktif atau produk ini tidak tersedia.
            </p>
            <Link
              href="/katalog"
              className="mt-2 text-xs font-bold text-white bg-[#1E3A8A] px-4 py-2 rounded-lg hover:bg-[#17245F] transition-colors"
            >
              Kembali ke Katalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-16">
      {/* Page Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-[#667085]">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <Link href="/katalog" className="hover:text-[#1E3A8A] transition-colors">
              Katalog
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
            {/* Main Image */}
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
                    <ShoppingBag className="w-8 h-8 text-[#1E3A8A]/60" />
                  </div>
                  <span className="text-sm text-[#98A2B3] font-medium">Gambar Produk</span>
                </div>
              )}

              {/* Nav Arrows */}
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

            {/* Thumbnail Row */}
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

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="border border-[#1E3A8A]/20 bg-[#EAF0FF] text-[#1E3A8A] px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide">
                {product.category?.name || 'Umum'}
              </span>
              {product.isCustomAvailable && (
                <span className="border border-[#F59E0B]/30 bg-amber-50 text-[#F59E0B] px-3 py-1 rounded-lg text-xs font-semibold">
                  CUSTOM TERSEDIA
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-[#17245F] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-2">
              {buyPrice && (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-[#667085] font-medium">Harga Beli:</span>
                  <span className="text-2xl font-bold text-[#1E3A8A]">{buyPrice}</span>
                </div>
              )}
              {rentPrice && (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-[#667085] font-medium">Harga Sewa:</span>
                  <span className="text-xl font-bold text-[#F59E0B]">{rentPrice}</span>
                  <span className="text-xs text-[#667085]">/ hari</span>
                </div>
              )}
              {!buyPrice && !rentPrice && (
                <span className="text-lg font-bold text-[#17245F]">Hubungi Kami untuk Penawaran</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#172033]">Deskripsi Produk</h3>
                <p className="text-sm text-[#667085] leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Variants / Size Selector */}
            {variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#172033] flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#1E3A8A]" />
                  Pilih Ukuran
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const hasStock = variant.stockBuy > 0 || variant.stockRent > 0;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(isSelected ? null : variant)}
                        disabled={!hasStock}
                        className={`h-10 px-4 rounded-xl text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-sm'
                            : hasStock
                            ? 'bg-white text-[#344054] border-[#E5E7EB] hover:border-[#1E3A8A] hover:bg-[#EAF0FF]'
                            : 'bg-[#F1F5F9] text-[#98A2B3] border-[#E5E7EB] cursor-not-allowed line-through'
                        }`}
                      >
                        {variant.size}
                        <span className="ml-1.5 text-[10px] opacity-70">
                          ({variant.stockBuy + variant.stockRent})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/pesan-seragam"
                className="flex-1 h-12 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Pesan Sekarang
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
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Kualitas Terjamin</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Garansi Jahitan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <Truck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Pengiriman Aman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
