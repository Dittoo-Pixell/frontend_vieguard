'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith('/masuk') ||
    pathname.startsWith('/daftar') ||
    pathname.startsWith('/lupa-password') ||
    pathname.startsWith('/konfirmasi-kode');

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="w-full bg-[#17245F] text-white pt-16 pb-8 border-t border-[#1E3A8A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-[#F59E0B] text-xl font-black">V</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Vieguard
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Konveksi penjahitan profesional seragam drum band, marching band, jas wisuda,
              serta penyewaan instrumen & perlengkapan acara untuk sekolah dan institusi.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Pusat Konveksi & Gudang Logistik Armada Vieguard</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>+62 812-3456-7890 (Layanan Pelanggan & Konsultasi)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
              </div>
            </div>
          </div>

          {/* Col 3: Layanan Kami */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/pesan-seragam" className="hover:text-white transition-colors">
                  Pesan Seragam Massal
                </Link>
              </li>
              <li>
                <Link href="/pesan-seragam" className="hover:text-white transition-colors">
                  Penjahitan Seragam Custom
                </Link>
              </li>
              <li>
                <Link href="/penyewaan" className="hover:text-white transition-colors">
                  Sewa Alat Drum Band
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-white transition-colors">
                  Jas Wisuda & Toga
                </Link>
              </li>
              <li>
                <Link href="/konsultasi-chat" className="hover:text-white transition-colors">
                  Konsultasi Desain & Bahan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi & Bantuan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Informasi
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/portofolio" className="hover:text-white transition-colors">
                  Galeri Portofolio
                </Link>
              </li>
              <li>
                <Link href="/pesanan-rental-saya" className="hover:text-white transition-colors">
                  Lacak Status Pesanan
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-white transition-colors">
                  Panduan Ukuran Standar
                </Link>
              </li>
              <li>
                <Link href="/penyewaan" className="hover:text-white transition-colors">
                  Syarat & Ketentuan Sewa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Jaminan Layanan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Standar Kualitas
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Jahitan presisi dengan QC ketat untuk ketahanan performa parade</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <HeartHandshake className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Sanitasi armada sewa berkala siap pakai langsung acara</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Vieguard Apparel & Rental. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <span>Privasi & Kebijakan</span>
            <span>Syarat Penggunaan</span>
            <span>Bantuan Teknis</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
