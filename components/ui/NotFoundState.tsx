'use client';

import React from 'react';
import Link from 'next/link';
import { SearchX, Home, ArrowLeft } from 'lucide-react';

interface NotFoundStateProps {
  title?: string;
  description?: string;
  backHref?: string;
  backText?: string;
}

export function NotFoundState({
  title = 'Halaman atau Data Tidak Ditemukan',
  description = 'Data yang Anda cari mungkin telah dipindahkan, diubah jalurnya, atau sudah tidak tersedia.',
  backHref = '/',
  backText = 'Kembali ke Beranda',
}: NotFoundStateProps) {
  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-10 sm:p-14 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl flex items-center justify-center mx-auto text-[#98A2B3]">
        <SearchX className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-[#17245F]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{description}</p>
      </div>

      <div className="pt-2">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{backText}</span>
        </Link>
      </div>
    </div>
  );
}
