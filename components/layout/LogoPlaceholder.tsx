import React from 'react';
import Link from 'next/link';

interface LogoPlaceholderProps {
  className?: string;
  withLink?: boolean;
}

export function LogoPlaceholder({ className = '', withLink = true }: LogoPlaceholderProps) {
  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="w-9 h-9 bg-[#1E3A8A] rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white text-base font-extrabold tracking-wider">V</span>
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-[#17245F] text-xl tracking-tight leading-none">
          Vieguard
        </span>
        <span className="text-[10px] text-[#667085] font-medium tracking-wide uppercase">
          Apparel & Rental
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
