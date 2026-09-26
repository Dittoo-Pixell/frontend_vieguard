'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KeyRound, ArrowRight, ArrowLeft, Mail, AlertCircle, ShieldQuestion } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email) {
      setErrorMessage('Harap masukkan alamat email akun Anda.');
      return;
    }

    try {
      setIsLoading(true);
      await apiPost('/api/website/auth/forgot-password', { email });
      // Redirect to OTP verification page
      router.push(`/konfirmasi-kode?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error('Forgot password error:', err);
      // Even if failed or for demo fallback, provide clear feedback
      setErrorMessage(
        err?.message || 'Gagal mengirim kode verifikasi. Pastikan email Anda terdaftar.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_16px_rgba(20,30,60,0.08)] p-6 sm:p-8">
      {/* Header Kartu */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EAF0FF] text-[#1E3A8A] mb-3 shadow-xs">
          <KeyRound className="w-7 h-7" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#EAF0FF] text-[#1E3A8A] text-[10px] font-bold tracking-wider uppercase mb-2">
            Pemulihan Kredensial Akun
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#17245F] tracking-tight mb-2">
          Lupa Kata Sandi?
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-sm mx-auto">
          Masukkan alamat email resmi instansi yang terdaftar. Kami akan mengirimkan 6 digit kode OTP verifikasi untuk mengatur ulang kata sandi Anda.
        </p>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="identifier-input"
          label="Alamat Email Terdaftar *"
          type="email"
          placeholder="contoh: admin@marchingband.sch.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          helperText="Pastikan kotak masuk email Anda aktif untuk menerima 6 digit kode verifikasi."
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full h-12"
        >
          Kirim Kode Verifikasi
        </Button>
      </form>

      {/* Help info box */}
      <div className="mt-6 p-4 rounded-xl bg-[#EAF0FF] border border-[#BFDBFE] flex items-start gap-3">
        <ShieldQuestion className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
        <div className="text-xs text-[#17245F] leading-relaxed">
          <span className="font-bold block mb-0.5">Kendala Akun Lembaga Musik?</span>
          Jika email unit drum band atau sekolah Anda sudah tidak aktif, hubungi Helpdesk Produksi Vieguard via WhatsApp resmi untuk verifikasi manual.
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center">
        <Link
          href="/masuk"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:text-[#17245F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
      </div>
    </div>
  );
}
