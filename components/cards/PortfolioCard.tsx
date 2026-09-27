import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { formatRupiah } from '@/utils/format';
import { Shirt, Image as ImageIcon } from 'lucide-react';

interface PortfolioCardProps {
  product: Product;
}

export function PortfolioCard({ product }: PortfolioCardProps) {
  const primaryImage = Array.isArray(product.images) && product.images.length > 0
    ? typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0].imageUrl
    : null;

  return (
    <div className="bg-white border border-[#E5E7EB] hover:border-[#1E3A8A] rounded-xl p-3.5 flex flex-col space-y-3 shadow-[0_2px_10px_rgba(20,30,60,0.04)] hover:shadow-[0_8px_20px_rgba(20,30,60,0.08)] transition-all duration-200 group">
      {/* Image Preview / Placeholder */}
      <div className="w-full h-44 bg-[#F1F5FD] border border-dashed border-[#D6E2FB] rounded-lg relative overflow-hidden flex flex-col items-center justify-center p-2 text-center">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <>
            {/* Blueprint Crosshair */}
            <svg
              className="absolute inset-0 w-full h-full text-[#CBD5E1]/60 pointer-events-none stroke-current"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line strokeWidth="0.5" x1="0" x2="100" y1="0" y2="100" />
              <line strokeWidth="0.5" x1="100" x2="0" y1="100" y2="0" />
            </svg>
            <div className="relative z-10 flex flex-col items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-lg border border-[#E5E7EB] shadow-xs">
              <Shirt className="w-5 h-5 text-[#1E3A8A]" />
              <span className="text-[11px] font-semibold text-[#1E3A8A]">
                {product.category?.name || 'Seragam Vieguard'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[#172033] text-sm leading-snug line-clamp-2 group-hover:text-[#1E3A8A] transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#98A2B3] pt-0.5 line-clamp-1">
            {product.description || 'Pengerjaan konveksi berstandar institusi'}
          </p>
        </div>

        <div className="pt-2 border-t border-[#F1F4F9] flex items-center justify-between">
          <Badge variant="primary" size="sm">
            {product.category?.name || 'Paket Standar'}
          </Badge>
          <span className="text-xs font-bold text-[#1E3A8A]">
            {formatRupiah(product.basePriceBuy || product.basePriceRent)}
          </span>
        </div>
      </div>
    </div>
  );
}
