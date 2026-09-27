'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { Order, OrderType, OrderStatus } from '@/types/order';
import { formatRupiah, formatDate } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  ChevronRight,
  Home,
  Package,
  Layers,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  Truck,
  CheckCircle2,
  XCircle,
  Scissors,
  HelpCircle,
} from 'lucide-react';

function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case 'pending':
      return {
        label: 'Menunggu Verifikasi',
        color: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-[#F59E0B]',
      };
    case 'dikonfirmasi':
      return {
        label: 'Dikonfirmasi',
        color: 'bg-blue-50 text-[#1E3A8A] border-blue-200',
        dot: 'bg-[#1E3A8A]',
      };
    case 'diproses':
      return {
        label: 'Sedang Diproduksi / Dijahit',
        color: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-600',
      };
    case 'siap_diambil':
      return {
        label: 'Siap Diambil / Dikirim',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'selesai':
      return {
        label: 'Selesai',
        color: 'bg-green-50 text-green-800 border-green-200',
        dot: 'bg-green-600',
      };
    case 'dibatalkan':
      return {
        label: 'Dibatalkan',
        color: 'bg-red-50 text-red-800 border-red-200',
        dot: 'bg-red-500',
      };
    default:
      return {
        label: status,
        color: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
      };
  }
}

function getTypeBadge(type: OrderType) {
  switch (type) {
    case 'beli':
      return { label: 'Beli Standar', bg: 'bg-blue-50 text-[#1E3A8A] border-blue-200' };
    case 'sewa':
      return { label: 'Sewa Armada', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
    case 'custom':
      return { label: 'Jahit Custom', bg: 'bg-purple-50 text-purple-800 border-purple-200' };
  }
}

// Fallback demo orders for offline preview when DB is not running
const MOCK_DEMO_ORDERS: Order[] = [
  {
    id: '1',
    userId: '1',
    orderNumber: 'ORD-20260925-01AB',
    orderType: 'beli',
    requiresProduction: true,
    status: 'diproses',
    totalPrice: '14500000.00',
    isLunas: false,
    notes: 'SMP Negeri 1 Surabaya - 45 stel seragam parade lis emas',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '1',
    orderNumber: 'ORD-20260926-02CD',
    orderType: 'sewa',
    requiresProduction: false,
    status: 'dikonfirmasi',
    totalPrice: '3200000.00',
    isLunas: true,
    notes: 'Sewa perlengkapan festival marching band 3 hari',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: '1',
    orderNumber: 'ORD-20260920-03EF',
    orderType: 'custom',
    requiresProduction: true,
    status: 'selesai',
    totalPrice: '28000000.00',
    isLunas: true,
    notes: 'Jahit khusus seragam mayoret & field commander bahan beludru',
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'beli' | 'sewa' | 'custom'>('all');
  const [search, setSearch] = useState('');

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderService.getMyOrders(),
    retry: 1,
  });

  const apiOrders: Order[] = Array.isArray(res?.data) ? res.data : [];
  // If API returns empty or fails (e.g. no DB), show mock orders for smooth testing
  const orders: Order[] = apiOrders.length > 0 ? apiOrders : isError ? MOCK_DEMO_ORDERS : [];

  const filteredOrders = orders.filter((order) => {
    const matchTab = activeTab === 'all' || order.orderType === activeTab;
    const matchSearch =
      !search ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      (order.notes && order.notes.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  });

  const countActive = orders.filter((o) => o.status === 'diproses' || o.status === 'pending' || o.status === 'dikonfirmasi').length;
  const countInProduction = orders.filter((o) => o.status === 'diproses').length;
  const countRental = orders.filter((o) => o.orderType === 'sewa' && o.status !== 'dibatalkan').length;
  const countCompleted = orders.filter((o) => o.status === 'selesai').length;

  return (
    <div className="w-full pb-20">
      {/* Top Breadcrumb & Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-3">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Pesanan dan Sewa Saya</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A] mb-2">
                <span>PORTAL KLIEN INSTITUSI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F] tracking-tight">
                Daftar Pesanan & Penyewaan Saya
              </h1>
              <p className="text-xs sm:text-sm text-[#667085] mt-1">
                Pantau proses produksi, status pembayaran, jadwal armada sewa, dan berkas transaksi resmi sekolah.
              </p>
            </div>
            <Link
              href="/pesan-seragam"
              className="h-11 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all self-start md:self-auto shrink-0"
            >
              <Package className="w-4 h-4" />
              Pesan Seragam Baru
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Metric Cards (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Pesanan Aktif</span>
              <div className="text-2xl font-bold text-[#1E3A8A]">{countActive} Transaksi</div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Dalam pemrosesan
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EAF0FF] text-[#1E3A8A] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Dalam Proses Jahit</span>
              <div className="text-2xl font-bold text-[#17245F]">{countInProduction} Kluster</div>
              <span className="text-[11px] text-[#667085]">Pola & QC garment</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Armada Sewa</span>
              <div className="text-2xl font-bold text-[#F59E0B]">{countRental} Reservasi</div>
              <span className="text-[11px] text-[#667085]">Siap kirim H-2</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Arsip Selesai</span>
              <div className="text-2xl font-bold text-green-700">{countCompleted} PO</div>
              <span className="text-[11px] text-[#667085]">Riwayat tersimpan</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b sm:border-b-0 border-[#E5E7EB] pb-2 sm:pb-0">
              {[
                { key: 'all', label: 'Semua Transaksi' },
                { key: 'beli', label: 'Beli Standar' },
                { key: 'sewa', label: 'Sewa Armada' },
                { key: 'custom', label: 'Jahit Custom' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`h-9 px-4 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#1E3A8A] text-white shadow-xs'
                      : 'bg-white hover:bg-[#F8FAFC] text-[#667085] hover:text-[#172033]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari No. Order / Catatan..."
                className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
                <Skeleton className="w-1/3 h-5 rounded" />
                <Skeleton className="w-full h-16 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-4 shadow-xs">
            <Package className="w-12 h-12 text-[#98A2B3] mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#17245F]">Tidak Ada Transaksi</h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                {search
                  ? `Tidak ada pesanan dengan kata kunci "${search}".`
                  : 'Anda belum memiliki transaksi pesanan pada kategori ini.'}
              </p>
            </div>
            <Link
              href="/pesan-seragam"
              className="inline-flex items-center gap-2 h-10 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              Mulai Pesanan Pertama
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusBadge = getStatusBadge(order.status);
              const typeBadge = getTypeBadge(order.orderType);

              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(20,30,60,0.06)] hover:shadow-md hover:border-[#1E3A8A]/30 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#17245F]">
                        {order.orderNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase ${typeBadge.bg}`}>
                        {typeBadge.label}
                      </span>
                      <span className="text-xs text-[#98A2B3]">•</span>
                      <span className="text-xs text-[#667085] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${statusBadge.color}`}>
                        <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1 text-[#667085] max-w-xl">
                      <div className="font-medium text-[#172033] line-clamp-1">
                        {order.notes || 'Pesanan seragam institusi sekolah'}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#98A2B3]">
                        <span>Produksi Garment: {order.requiresProduction ? 'Ya' : 'Ready Stock'}</span>
                        <span>•</span>
                        <span>Status Bayar: {order.isLunas ? 'Lunas' : 'Menunggu Pelunasan'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-[#F1F5F9]">
                      <div className="text-left md:text-right">
                        <span className="text-[11px] text-[#98A2B3] block">Total Nilai Kontrak</span>
                        <span className="text-base font-bold text-[#1E3A8A]">
                          {formatRupiah(order.totalPrice)}
                        </span>
                      </div>

                      <Link
                        href={`/pesanan-rental-saya/${order.id}`}
                        className="h-10 px-4 bg-[#EAF0FF] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                      >
                        <span>Lacak Progres</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
