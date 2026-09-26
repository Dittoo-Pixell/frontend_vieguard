import React from 'react';
import Link from 'next/link';
import { LogoPlaceholder } from '@/components/layout/LogoPlaceholder';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#F7F9FC] flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between mb-4">
        <LogoPlaceholder />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#1E3A8A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Main Auth Container */}
      <div className="w-full flex-1 flex items-center justify-center">
        {children}
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-lg mx-auto mt-8 text-center text-xs text-[#98A2B3] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
        <span>Sistem Autentikasi Terenkripsi & Terverifikasi Vieguard</span>
      </div>
    </div>
  );
}
