'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { Notification } from '@/types/notification';
import { formatDate } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  ChevronRight,
  Home,
  Bell,
  CheckCheck,
  Package,
  Truck,
  MessageCircle,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    recipientType: 'user',
    recipientId: '1',
    type: 'order',
    title: 'Pesanan Masuk Antrean Jahit',
    message: 'PO ORD-20260925-01AB telah diverifikasi. Workshop memulai pemotongan bahan pola SMPN 1.',
    relatedOrderId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'n2',
    recipientType: 'user',
    recipientId: '1',
    type: 'rental',
    title: 'Pengiriman Armada Sewa H-2 Terjadwal',
    message: 'Reservasi sewa armada festival telah disterilkan uap 100°C dan dijadwalkan meluncur besok.',
    relatedOrderId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'n3',
    recipientType: 'user',
    recipientId: '1',
    type: 'system',
    title: 'Konfirmasi Surat Perintah Kerja (SPK)',
    message: 'Dokumen SPK resmi institusi Anda telah diarsipkan pada basis data bendahara produksi.',
    relatedOrderId: null,
    isRead: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'n4',
    recipientType: 'user',
    recipientId: '1',
    type: 'order',
    title: 'Inspeksi QC Tahap Akhir Selesai',
    message: 'Seragam kustom mayoret ORD-20260920-03EF telah lolos uji kualitas dan siap dikirim via kargo.',
    relatedOrderId: '3',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

function getNotificationIcon(type: string) {
  switch (type) {
    case 'order':
      return { icon: Package, bg: 'bg-[#EAF0FF] text-[#1E3A8A]' };
    case 'rental':
      return { icon: Truck, bg: 'bg-amber-50 text-[#F59E0B]' };
    case 'chat':
    case 'message':
      return { icon: MessageCircle, bg: 'bg-purple-50 text-purple-700' };
    default:
      return { icon: Info, bg: 'bg-slate-100 text-slate-700' };
  }
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState<'all' | 'order' | 'rental' | 'system'>('all');
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const { data: res, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    retry: 1,
  });

  const apiNotifications: Notification[] = Array.isArray(res?.data) ? res.data : [];
  const notifications: Notification[] = apiNotifications.length > 0 ? apiNotifications : localNotifications;

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    markReadMutation.mutate(id);
  };

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    notifications.forEach((n) => {
      if (!n.isRead) markReadMutation.mutate(n.id);
    });
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full pb-20">
      {/* Top Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-3">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Pusat Notifikasi</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A] mb-2">
                <span>AKTIVITAS & LOG TERPADU</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F] tracking-tight">
                Pusat Notifikasi & Pembaruan Pesanan
              </h1>
              <p className="text-xs sm:text-sm text-[#667085] mt-1">
                Pemberitahuan resmi tahapan jahit seragam, pengiriman armada sewa, dan pengesahan berkas SPK.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="h-10 px-4 bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#1E3A8A] font-semibold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all self-start md:self-auto shrink-0"
              >
                <CheckCheck className="w-4 h-4 text-[#1E3A8A]" />
                Tandai Semua Sudah Dibaca
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Bento Metrics Bar (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                Belum Dibaca
              </span>
              <div className="text-2xl font-bold text-[#1E3A8A]">{unreadCount} Pesan</div>
              <span className="text-[11px] text-[#F59E0B] font-semibold">Prioritas Tindakan</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EAF0FF] text-[#1E3A8A] flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                Aktivitas Workshop
              </span>
              <div className="text-2xl font-bold text-[#17245F]">8 Penjahitan</div>
              <span className="text-[11px] text-emerald-600 font-medium">Shift Pagi & Sore</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                Pengiriman Armada
              </span>
              <div className="text-2xl font-bold text-amber-700">Steril Uap 100°C</div>
              <span className="text-[11px] text-[#667085]">Garansi Tiba H-2</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs flex items-center gap-2 overflow-x-auto">
          {[
            { key: 'all', label: 'Semua Notifikasi' },
            { key: 'order', label: 'Produksi Pesanan' },
            { key: 'rental', label: 'Sewa Armada' },
            { key: 'system', label: 'Sistem & SPK' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.key
                  ? 'bg-[#1E3A8A] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#667085] hover:bg-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification Cards List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2">
                <Skeleton className="w-1/4 h-5 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <Bell className="w-12 h-12 text-[#98A2B3] mx-auto" />
            <h3 className="text-base font-bold text-[#17245F]">Tidak Ada Pemberitahuan</h3>
            <p className="text-xs text-[#667085]">
              Belum ada notifikasi baru pada kategori ini.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => {
              const iconMeta = getNotificationIcon(notif.type);
              const Icon = iconMeta.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                  className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                    !notif.isRead
                      ? 'bg-white border-[#1E3A8A]/30 shadow-md ring-1 ring-[#1E3A8A]/10'
                      : 'bg-white border-[#E5E7EB] hover:border-[#1E3A8A]/20 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${iconMeta.bg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#17245F]">{notif.title}</h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#1E3A8A] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#667085] leading-relaxed max-w-2xl">
                        {notif.message}
                      </p>
                      <span className="text-[11px] text-[#98A2B3] flex items-center gap-1 pt-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(notif.createdAt)}
                      </span>
                    </div>
                  </div>

                  {notif.relatedOrderId && (
                    <Link
                      href={`/pesanan-rental-saya/${notif.relatedOrderId}`}
                      className="self-end sm:self-center h-9 px-4 bg-[#EAF0FF] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0"
                    >
                      <span>Lihat Progres</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
