'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  ShieldCheck,
  MailCheck,
  Edit,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function KonfirmasiKodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'otp' | 'new-password' | 'success'>('otp');

  // Countdown timer (60s)
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle single digit input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of multiple characters
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    try {
      setErrorMessage(null);
      await authService.forgotPassword(email);
      setTimeLeft(60);
      setCanResend(false);
      setSuccessMessage('Kode OTP baru telah dikirimkan ke email Anda.');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Gagal mengirim ulang kode OTP.');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setErrorMessage('Harap lengkapi 6 digit kode OTP verifikasi.');
      return;
    }
    // Proceed to Step 2: Set new password
    setStep('new-password');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Kata sandi baru minimal 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    try {
      setIsLoading(true);
      const fullOtp = otp.join('');
      await authService.resetPassword({
        email,
        otpCode: fullOtp,
        newPassword,
      });

      setStep('success');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setErrorMessage(
        err?.message || 'Gagal memperbarui kata sandi. Pastikan kode OTP sesuai atau server backend aktif.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_16px_rgba(20,30,60,0.08)] p-6 sm:p-8">
      {/* Eyebrow & Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#EAF0FF] text-[#1E3A8A] mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          VERIFIKASI KEAMANAN AKUN
        </span>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight mb-2">
          {step === 'otp'
            ? 'Verifikasi Kode Email'
            : step === 'new-password'
            ? 'Buat Kata Sandi Baru'
            : 'Kata Sandi Diperbarui'}
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-sm">
          {step === 'otp'
            ? 'Kami telah mengirimkan 6 digit kode OTP verifikasi angka ke alamat email:'
            : step === 'new-password'
            ? 'Silakan masukkan kata sandi baru untuk akun Vieguard Anda:'
            : 'Kata sandi akun Anda telah berhasil direset. Silakan masuk menggunakan kata sandi baru.'}
        </p>

        {/* Email Badge */}
        {email && step !== 'success' && (
          <div className="w-full bg-[#EAF0FF] border border-[#D1E0FF] rounded-xl px-3.5 py-2.5 my-3 flex items-center justify-between gap-2 text-left">
            <div className="flex items-center gap-2 min-w-0">
              <MailCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
              <span className="text-xs font-semibold text-[#1E3A8A] truncate">
                {email}
              </span>
            </div>
            <Link
              href="/lupa-password"
              className="text-xs font-bold text-[#1E3A8A] hover:underline shrink-0 flex items-center gap-1"
            >
              <span>Ubah</span>
              <Edit className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Success alert */}
      {successMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{successMessage}</span>
        </div>
      )}

      {/* Step 1: Input OTP */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
          <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full aspect-square text-center text-xl sm:text-2xl font-bold text-[#172033] bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all shadow-xs"
              />
            ))}
          </div>

          {/* Countdown & Resend */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-2 px-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#98A2B3]" />
              <span>
                Kirim ulang dalam{' '}
                <span className="font-bold text-[#172033]">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`font-semibold transition-colors ${
                canResend
                  ? 'text-[#1E3A8A] hover:underline cursor-pointer'
                  : 'text-[#98A2B3] cursor-not-allowed'
              }`}
            >
              Kirim Ulang Kode OTP
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full h-12"
          >
            Lanjutkan Atur Kata Sandi
          </Button>
        </form>
      )}

      {/* Step 2: Set New Password */}
      {step === 'new-password' && (
        <form onSubmit={handleResetPassword} className="w-full space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="new-password"
              className="text-sm font-semibold text-[#172033]"
            >
              Kata Sandi Baru *
            </label>
            <div className="relative flex items-center">
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            id="confirm-new-password"
            label="Konfirmasi Kata Sandi Baru *"
            type="password"
            placeholder="Ulangi kata sandi baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full h-12 mt-2"
          >
            Simpan Kata Sandi Baru
          </Button>
        </form>
      )}

      {/* Step 3: Success Screen */}
      {step === 'success' && (
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-xs text-[#667085]">
            Kata sandi Anda telah berhasil diubah. Silakan masuk untuk mengakses akun Anda kembali.
          </p>
          <Button
            onClick={() => router.push('/masuk')}
            variant="primary"
            size="lg"
            className="w-full h-12"
          >
            Masuk ke Akun Sekarang
          </Button>
        </div>
      )}

      {/* Back link */}
      {step !== 'success' && (
        <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center">
          <Link
            href="/masuk"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:text-[#17245F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Batalkan & Kembali ke Masuk</span>
          </Link>
        </div>
      )}
    </div>
  );
}
