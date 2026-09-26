'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center space-y-4 shadow-[0_4px_20px_rgba(20,30,60,0.06)]">
        <div className="w-12 h-12 bg-red-50 text-[#DC2626] rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#172033]">Terjadi Kendala Teknis</h2>
        <p className="text-xs text-[#667085] leading-relaxed">
          Mohon maaf, halaman tidak dapat dimuat dengan sempurna. Silakan muat ulang atau kembali ke beranda.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 h-10 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
          <Link
            href="/"
            className="flex-1 h-10 border border-[#E5E7EB] hover:bg-[#F7F9FC] text-[#172033] font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
