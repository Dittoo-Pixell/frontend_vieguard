'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, X, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import { LogoPlaceholder } from './LogoPlaceholder';
import { useAuthStore } from '@/store/authStore';

const NAV_LINKS = [
  { label: 'Katalog', href: '/katalog' },
  { label: 'Portofolio', href: '/portofolio' },
  { label: 'Pesan Seragam', href: '/pesan-seragam' },
  { label: 'Penyewaan', href: '/penyewaan' },
  { label: 'Pesanan & Rental Saya', href: '/pesanan-rental-saya' },
  { label: 'Konsultasi Chat', href: '/konsultasi-chat' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const isAuthPage =
    pathname.startsWith('/masuk') ||
    pathname.startsWith('/daftar') ||
    pathname.startsWith('/lupa-password') ||
    pathname.startsWith('/konfirmasi-kode');

  if (isAuthPage) {
    return null;
  }

  const getPageTitle = () => {
    const active = NAV_LINKS.find((l) => pathname.startsWith(l.href));
    if (active) return active.label;
    if (pathname === '/') return 'Beranda Publik';
    if (pathname.startsWith('/profil')) return 'Profil Saya';
    if (pathname.startsWith('/notifikasi')) return 'Pusat Notifikasi';
    return 'Halaman';
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_2px_12px_rgba(20,30,60,0.04)]">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <LogoPlaceholder />

        {/* Center: Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-full border border-[#E5E7EB]">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'text-[#667085] hover:text-[#172033] hover:bg-white/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/notifikasi"
            aria-label="Pusat Notifikasi"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#667085] hover:text-[#172033] hover:bg-[#F7F9FC] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F59E0B] rounded-full ring-2 ring-white" />
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profil"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F7F9FC] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAF0FF] text-[#1E3A8A] font-bold text-xs flex items-center justify-center border border-[#C7D7FD]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#172033] leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#667085] leading-none mt-1">
                    Akun Saya
                  </span>
                </div>
              </Link>
              <button
                onClick={logout}
                title="Keluar"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-transparent hover:border-red-200 text-[#667085] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/masuk"
              className="h-10 px-4 sm:px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <UserIcon className="w-4 h-4" />
              <span>Masuk / Daftar</span>
            </Link>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E7EB] text-[#172033] hover:bg-[#F7F9FC]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-header Breadcrumb Strip */}
      <div className="h-9 bg-[#F7F9FC] border-t border-[#E5E7EB] w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#667085]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-[#172033] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">{getPageTitle()}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#98A2B3]">
            <span>SISTEM INFORMASI VIEGUARD</span>
            <span>•</span>
            <span className="text-[#16A34A] font-semibold">LAYANAN AKTIF</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-2 shadow-lg">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-[#172033] hover:bg-[#F7F9FC]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
