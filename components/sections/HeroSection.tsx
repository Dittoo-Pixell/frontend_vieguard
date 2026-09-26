import React from 'react';
import { Ruler, Package, CalendarClock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  storeName?: string;
  description?: string;
}

export function HeroSection({ storeName = 'Vieguard', description }: HeroSectionProps) {
  return (
    <section className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-[0_4px_20px_rgba(20,30,60,0.05)]">
      {/* Top Facility Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0FF] border border-[#C7D7FD] text-[#1E3A8A] font-semibold text-xs tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A]" />
        <span>SPESIFIKASI FASILITAS: BENGKEL PENJAHITAN PUSAT & GUDANG LOGISTIK</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight max-w-4xl mx-auto">
        {storeName} — Penjahitan Seragam Drum Band & Penyewaan Perlengkapan
      </h1>

      {/* Subtitles */}
      <p className="text-base sm:text-lg font-medium text-[#667085] max-w-3xl mx-auto">
        Penjahitan seragam profesional untuk tingkat TK, SD, SMP, SMA, Marching Band, dan penyewaan alat acara
      </p>

      <p className="text-xs sm:text-sm text-[#98A2B3] max-w-2xl mx-auto">
        {description ||
          'Konsultasi desain khusus, pesanan massal sekolah, dan perlengkapan drum band premium dengan standar jahitan presisi institusi.'}
      </p>

      {/* Three Feature Pillars */}
      <div className="pt-4 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs font-semibold text-[#667085]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5E7EB]">
          <Ruler className="w-4 h-4 text-[#1E3A8A]" />
          <span>PANDUAN UKURAN PRESISI</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5E7EB]">
          <Package className="w-4 h-4 text-[#1E3A8A]" />
          <span>LOGISTIK INSTITUSI MASSAL</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5E7EB]">
          <CalendarClock className="w-4 h-4 text-[#1E3A8A]" />
          <span>PENJADWALAN ARMADA SEWA</span>
        </div>
      </div>
    </section>
  );
}
