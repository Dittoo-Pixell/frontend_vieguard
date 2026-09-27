'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { PortfolioCard } from '@/components/cards/PortfolioCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { CheckCircle2, ArrowRight, FolderKanban } from 'lucide-react';

export function PortfolioPreviewSection() {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['products', 'preview'],
    queryFn: () => productService.getProducts(),
    retry: 1,
  });

  const products = Array.isArray(response?.data) ? response.data.slice(0, 4) : [];

  return (
    <section
      aria-label="Dokumentasi Portofolio"
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_4px_20px_rgba(20,30,60,0.05)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#E5E7EB] pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Portofolio Kami — Galeri Hasil Pekerjaan
          </h2>
          <p className="text-sm text-[#667085] mt-1">
            Dokumentasi hasil pengerjaan seragam dan instrumen untuk klien institusi pendidikan dan korps musik
          </p>
        </div>
        <div className="text-xs font-semibold text-[#667085] flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#1E3A8A] font-bold text-[11px]">
            {isLoading ? 'MEMUAT DATA...' : `MENAMPILKAN: ${products.length} PROYEK TERPILIH`}
          </span>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-[#E5E7EB] rounded-xl p-3.5 space-y-3"
            >
              <Skeleton className="w-full h-44 rounded-lg" />
              <div className="space-y-2 pt-2">
                <Skeleton className="w-3/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-3 rounded" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="w-1/3 h-5 rounded" />
                  <Skeleton className="w-1/4 h-5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError || products.length === 0 ? (
        <div className="py-14 text-center flex flex-col items-center justify-center space-y-3 bg-[#F7F9FC] rounded-xl border border-dashed border-[#CBD5E1]">
          <FolderKanban className="w-10 h-10 text-[#98A2B3]" />
          <h4 className="text-sm font-bold text-[#172033]">
            {isError ? 'Layanan Galeri Belum Terhubung' : 'Belum Ada Portofolio Ditampilkan'}
          </h4>
          <p className="text-xs text-[#667085] max-w-sm">
            {isError
              ? 'Server backend atau database sedang dalam tahap integrasi. Anda tetap dapat menjelajahi layout tampilan lainnya.'
              : 'Katalog dan portofolio pesanan sedang diperbarui. Anda dapat langsung mengkonsultasikan kebutuhan seragam Anda dengan tim kami.'}
          </p>
          <Link
            href="/pesan-seragam"
            className="mt-2 text-xs font-bold text-white bg-[#1E3A8A] px-4 py-2 rounded-lg hover:bg-[#17245F] transition-colors"
          >
            Konsultasi Pesanan Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {products.map((item) => (
            <PortfolioCard key={item.id} product={item} />
          ))}
        </div>
      )}

      {/* Bottom Full Gallery Link / CTA Banner */}
      <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-medium text-[#667085] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
          <span>SEMUA PESANAN DIBUAT SESUAI STANDAR MUTU INSTITUSI</span>
        </div>
        <Link
          href="/portofolio"
          className="h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(30,58,138,0.2)] transition-all"
        >
          <span>Lihat Portofolio Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
