'use client';

import React from 'react';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Data Tidak Ditemukan',
  description = 'Saat ini belum ada data atau riwayat yang dapat ditampilkan pada bagian ini.',
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-10 sm:p-14 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl flex items-center justify-center mx-auto text-[#98A2B3]">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-[#17245F]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{description}</p>
      </div>

      {(actionText && actionHref) && (
        <div className="pt-2">
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            {actionText}
          </Link>
        </div>
      )}

      {(actionText && !actionHref && onAction) && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}
