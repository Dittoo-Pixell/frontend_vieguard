'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorState({
  title = 'Gagal Memuat Data',
  description = 'Terjadi kendala saat menghubungkan ke sistem. Silakan periksa koneksi atau coba beberapa saat lagi.',
  onRetry,
  retryText = 'Coba Lagi',
}: ErrorStateProps) {
  return (
    <div className="w-full bg-red-50/50 border border-red-200 rounded-2xl p-10 text-center space-y-4">
      <div className="w-14 h-14 bg-red-100/80 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-red-950">{title}</h3>
        <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{description}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 h-10 px-5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{retryText}</span>
          </button>
        </div>
      )}
    </div>
  );
}
