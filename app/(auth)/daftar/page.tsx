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
import { Shirt, Eye, EyeOff, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !password) {
      setErrorMessage('Silakan lengkapi nama, email, dan kata sandi.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (!agreed) {
      setErrorMessage('Anda harus menyetujui syarat & ketentuan layanan.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.register({
        name,
        email,
        phone: phone || undefined,
        address: address || undefined,
        password,
      });

      const user = res.data?.user || (res.data as any) || (res as any)?.user;
      if (user) {
        setUser(user);
        setStoredUser(user);
        window.location.href = '/';
        return;
      }
    } catch (err: any) {
      console.error('Register error:', err);
      setErrorMessage(
        err?.message || 'Pendaftaran belum dapat diproses karena koneksi ke server backend/database belum aktif.'
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
              Registrasi Akun Institusi
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#1E3A8A] bg-[#EAF0FF] border border-[#BFDBFE] px-2 py-0.5 rounded-full shrink-0 ml-2">
            AKUN BARU
          </span>
        </div>
        <p className="text-xs text-[#667085] leading-relaxed">
          Daftarkan akun perwakilan sekolah, yayasan, atau panitia untuk kemudahan order
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 w-full mb-6 p-1 bg-[#F1F5F9] rounded-xl text-center select-none">
        <Link
          href="/masuk"
          className="py-2 font-medium text-xs sm:text-sm text-[#667085] hover:text-[#172033] rounded-lg transition-all"
        >
          Masuk
        </Link>
        <button
          type="button"
          className="py-2 font-semibold text-xs sm:text-sm text-[#1E3A8A] bg-white rounded-lg shadow-xs border border-[#E2E8F0] transition-all"
        >
          Daftar Akun Baru
        </button>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleRegister} className="flex flex-col space-y-3.5">
        <Input
          id="register-name"
          label="Nama Lengkap / PIC Institusi *"
          placeholder="Nama Lengkap Pemesan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          id="register-email"
          label="Alamat Email Resmi *"
          type="email"
          placeholder="contoh: official@sekolah.sch.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="register-phone"
          label="Nomor WhatsApp / Telepon *"
          type="tel"
          placeholder="0812-xxxx-xxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Input
          id="register-institution"
          label="Nama Sekolah / Institusi / Alamat (Opsional)"
          placeholder="Contoh: SMAN 1 Jakarta / Jl. Pendidikan No. 5"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="text-sm font-semibold text-[#172033]"
          >
            Buat Kata Sandi *
          </label>
          <div className="relative flex items-center">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-12 text-sm text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[#667085] hover:text-[#172033] p-1 rounded-md transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Input
          id="register-confirm-password"
          label="Konfirmasi Kata Sandi *"
          type="password"
          placeholder="Ulangi kata sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Terms agreement */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-[#667085] leading-relaxed">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#D1D5DB] text-[#1E3A8A] focus:ring-[#1E3A8A] shrink-0"
            />
            <span>
              Saya menyetujui{' '}
              <span className="font-semibold text-[#172033] underline">
                Syarat & Ketentuan Layanan
              </span>{' '}
              dan{' '}
              <span className="font-semibold text-[#172033] underline">
                Kebijakan Privasi
              </span>{' '}
              Vieguard.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          Daftar Akun Baru
        </Button>
      </form>

      {/* Note */}
      <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-center">
        <p className="text-xs text-[#667085]">
          Sudah memiliki akun?{' '}
          <Link
            href="/masuk"
            className="font-bold text-[#1E3A8A] hover:underline"
          >
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
