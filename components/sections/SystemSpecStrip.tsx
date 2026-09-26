import React from 'react';

export function SystemSpecStrip() {
  return (
    <div className="w-full bg-white border-b border-[#E5E7EB] py-2 px-4 sm:px-6 lg:px-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#667085]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#1E3A8A] tracking-wider">SPESIFIKASI SISTEM</span>
          <span className="text-[#CBD5E1]">|</span>
          <span className="font-mono">DOK-ID: WF-LND-001</span>
          <span className="text-[#CBD5E1]">|</span>
          <span>TAMPILAN: BERANDA PUBLIK & PUSAT PORTOFOLIO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">GRID: 12-KOLOM / RITME 10PX</span>
          <span className="hidden sm:inline text-[#CBD5E1]">|</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded border border-[#C7D7FD] bg-[#EAF0FF] text-[#1E3A8A] font-bold text-[10px]">
            STATUS: LAYANAN AKTIF
          </span>
        </div>
      </div>
    </div>
  );
}
