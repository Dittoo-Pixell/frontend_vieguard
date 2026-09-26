import React from 'react';
import Link from 'next/link';
import { ClipboardList, Image as ImageIcon, Store, ArrowRight } from 'lucide-react';

export function QuickAccessSection() {
  const cards = [
    {
      sec: 'SEC 01 // AKSES',
      icon: <ClipboardList className="w-5 h-5 text-[#667085]" />,
      title: 'Pesan Seragam / Masuk',
      description:
        'Akses formulir penjahitan kustom, sistem pemesanan massal sekolah, atau masuk untuk melacak pesanan aktif institusi Anda.',
      cta: 'Masuk / Mulai Pesanan ->',
      href: '/pesan-seragam',
      buttonBg: 'bg-[#1E3A8A] hover:bg-[#17245F] text-white shadow-[0_2px_8px_rgba(30,58,138,0.2)]',
    },
    {
      sec: 'SEC 02 // ARSIP',
      icon: <ImageIcon className="w-5 h-5 text-[#667085]" />,
      title: 'Portofolio Kami',
      description:
        'Jelajahi dokumentasi proyek seragam drum band yang telah selesai, jas wisuda, kostum mayoret, dan bordir lambang khusus.',
      cta: 'Lihat Galeri Portofolio ->',
      href: '/portofolio',
      buttonBg: 'bg-[#17245F] hover:bg-[#111A46] text-white shadow-[0_2px_8px_rgba(23,36,95,0.2)]',
    },
    {
      sec: 'SEC 03 // STOK',
      icon: <Store className="w-5 h-5 text-[#F59E0B]" />,
      title: 'Katalog Publik & Sewa',
      description:
        'Telusuri set seragam siap pakai, bendera color guard, topi shako, sepatu parade, instrumen musik, dan tarif sewa alat.',
      cta: 'Telusuri Katalog & Sewa ->',
      href: '/katalog',
      buttonBg: 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[0_2px_8px_rgba(245,158,11,0.25)]',
    },
  ];

  return (
    <section aria-label="Modul Akses Cepat" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E5E7EB] hover:border-[#1E3A8A] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-[0_4px_16px_rgba(20,30,60,0.06)] hover:shadow-[0_8px_24px_rgba(20,30,60,0.1)] transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#667085] tracking-wider">
                  {card.sec}
                </span>
                {card.icon}
              </div>
              <div className="h-px w-full bg-[#E5E7EB]" />
              <h2 className="text-xl font-bold text-[#172033] tracking-tight">
                {card.title}
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed">
                {card.description}
              </p>
            </div>

            <div>
              <Link
                href={card.href}
                className={`w-full h-11 px-4 rounded-xl font-semibold text-sm flex items-center justify-between transition-colors ${card.buttonBg}`}
              >
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
