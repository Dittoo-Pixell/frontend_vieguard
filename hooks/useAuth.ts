'use client';

import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { LoginDto, RegisterDto, User } from '@/types/auth';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, logout: clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginDto, callbackUrl?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.login(credentials);
        if (res.data?.user) {
          setUser(res.data.user);
        }
        router.push(callbackUrl || '/');
        return res;
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Gagal masuk akun';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
  );

  const register = useCallback(
    async (data: RegisterDto, callbackUrl?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.register(data);
        if (res.data?.user) {
          setUser(res.data.user);
        }
        router.push(callbackUrl || '/');
        return res;
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Gagal mendaftar akun';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      clearAuth();
      router.push('/masuk');
    }
  }, [clearAuth, router]);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await authService.getProfile();
      if (res.data) {
        setUser(res.data);
      }
      return res.data;
    } catch (err) {
      console.warn('Refresh profile error:', err);
      return null;
    }
  }, [setUser]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    refreshProfile,
  };
}
