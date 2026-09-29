'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { User } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';
import { setStoredUser } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Shirt, Eye, EyeOff, Info, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Silakan lengkapi email dan kata sandi Anda.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.login({
        email,
        password,
      });

      const user = res.data?.user || (res.data as any) || (res as any)?.user;
      if (user) {
        setUser(user);
        setStoredUser(user);
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get('callbackUrl') || params.get('redirect') || '/';
        window.location.href = redirectUrl;
        return;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(
        err?.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda atau pastikan server backend aktif.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(20,30,60,0.08)] flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="font-bold text-base sm:text-lg text-[#172033] tracking-tight leading-snug">
              Portal Operasional Seragam & Perlengkapan
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#1E3A8A] bg-[#EAF0FF] border border-[#BFDBFE] px-2 py-0.5 rounded-full shrink-0 ml-2">
            VIEGUARD AUTH
          </span>
        </div>
        <p className="text-xs text-[#667085] leading-relaxed">
          Akses Penjahitan Berbasis Peran, Spesifikasi Inventaris & Armada Seragam Sekolah
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 w-full mb-6 p-1 bg-[#F1F5F9] rounded-xl text-center select-none">
        <button
          type="button"
          className="py-2 font-semibold text-xs sm:text-sm text-[#1E3A8A] bg-white rounded-lg shadow-xs border border-[#E2E8F0] transition-all"
        >
          Masuk
        </button>
        <Link
          href="/daftar"
          className="py-2 font-medium text-xs sm:text-sm text-[#667085] hover:text-[#172033] rounded-lg transition-all"
        >
          Daftar Akun Baru
        </Link>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <Input
          id="login-email"
          label="Alamat Email *"
          type="email"
          placeholder="contoh: kontak@sekolah.sch.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1.5">
          <label
            htmlFor="login-password"
            className="text-sm font-semibold text-[#172033]"
          >
            Kata Sandi *
          </label>
          <div className="relative flex items-center">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kata sandi akun"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-12 text-sm text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[#667085] hover:text-[#172033] p-1 rounded-md transition-colors"
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & forgot password */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#667085]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#D1D5DB] text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <span>Ingat saya di perangkat ini</span>
          </label>
          <Link
            href="/lupa-password"
            className="font-medium text-[#1E3A8A] hover:text-[#17245F] hover:underline transition-colors"
          >
            Lupa Kata Sandi?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          Masuk ke Akun
        </Button>
      </form>

      {/* Note */}
      <div className="mt-7 pt-4 border-t border-[#E5E7EB] text-center">
        <p className="text-[11px] text-[#667085] flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
          <span>
            Setelah berhasil masuk, Anda dapat melacak pesanan dan membuat formulir kustom.
          </span>
        </p>
      </div>
    </div>
  );
}
