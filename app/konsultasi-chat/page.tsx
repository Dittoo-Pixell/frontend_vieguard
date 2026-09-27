'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { chatService } from '@/services/chatService';
import { ChatMessage, Conversation } from '@/types/chat';
import { getSocket } from '@/lib/socket';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/utils/format';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  ChevronRight,
  Home,
  MessageCircle,
  Send,
  Paperclip,
  Search,
  Check,
  CheckCheck,
  User,
  Shield,
  Clock,
  Sparkles,
  Phone,
  Image as ImageIcon,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    conversationId: '1',
    senderId: 'admin_1',
    senderType: 'admin',
    messageText: 'Halo! Selamat datang di Layanan Konsultasi Resmi Vieguard. Ada yang bisa kami bantu terkait seragam drum band atau sewa armada?',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'm2',
    conversationId: '1',
    senderId: 'user_1',
    senderType: 'user',
    messageText: 'Halo admin, kami dari SMPN 1 ingin berkonsultasi mengenai pemesanan jahit seragam 45 stel dengan kombinasi warna navy & emas.',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'm3',
    conversationId: '1',
    senderId: 'admin_1',
    senderType: 'admin',
    messageText: 'Baik, sangat bisa! Untuk kombinasi tersebut kami rekomendasikan bahan Nagata Drill Super atau Beludru Velvet untuk mayoret. Apakah sudah ada contoh sketsa logo sekolah yang ingin dibordir?',
    isRead: true,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export default function KonsultasiChatPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'sewa'>('all');
  const [searchThread, setSearchThread] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load conversations from backend
  const { data: convRes } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: () => chatService.getConversations(),
    retry: 1,
  });

  const activeConversationId = '1';

  // Initialize Socket.IO connection
  useEffect(() => {
    let socket: any = null;
    try {
      socket = getSocket();
      socket.connect();

      socket.on('connect', () => {
        setSocketConnected(true);
        socket.emit('conversation:join', activeConversationId);
      });

      socket.on('disconnect', () => {
        setSocketConnected(false);
      });

      socket.on('message:new', (newMsg: ChatMessage) => {
        setMessages((prev) => [...prev, newMsg]);
      });
    } catch (err) {
      console.warn('Socket connection warning (offline mode):', err);
    }

    return () => {
      if (socket) {
        socket.off('message:new');
        socket.disconnect();
      }
    };
  }, [activeConversationId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `local_${Date.now()}`,
      conversationId: activeConversationId,
      senderId: String(user?.id || 'user_1'),
      senderType: 'user',
      messageText: inputText,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    // Optimistic local update
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Emit via Socket if connected
    try {
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit('message:send', {
          conversationId: activeConversationId,
          messageText: newMsg.messageText,
        });
      }
    } catch (err) {
      console.warn('Could not emit socket message:', err);
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Top Header */}
      <section className="w-full bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-xs text-[#667085] mb-3">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-[#98A2B3]" />
            <span className="text-[#1E3A8A] font-semibold">Konsultasi & Live Chat</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0FF] border border-[#1E3A8A]/20 rounded-full text-xs font-semibold text-[#1E3A8A] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>LAYANAN KONSULTASI ONLINE LANGSUNG</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17245F] tracking-tight">
                Ruang Obrolan & Konsultasi Desain
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-[#667085]">
                {socketConnected ? 'Terhubung ke Workshop' : 'Mode Siaga Workshop (08:00 - 20:00 WIB)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Panel Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-240px)] min-h-[580px]">
          {/* Left Panel: Conversation Thread List (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex flex-col overflow-hidden">
            {/* Header & Search */}
            <div className="p-4 border-b border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#17245F]">Daftar Percakapan</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#EAF0FF] text-[#1E3A8A] text-[10px] font-bold">
                  Aktif
                </span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari percakapan..."
                  value={searchThread}
                  onChange={(e) => setSearchThread(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { key: 'all', label: 'Semua' },
                  { key: 'custom', label: 'Jahit Custom' },
                  { key: 'sewa', label: 'Sewa Armada' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`h-7 px-3 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                      activeTab === t.key
                        ? 'bg-[#1E3A8A] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#667085] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <div className="p-3 rounded-xl bg-[#EAF0FF]/60 border border-[#1E3A8A]/20 cursor-pointer space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17245F] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    Customer Service & Master Tailor
                  </span>
                  <span className="text-[10px] text-[#98A2B3]">Baru saja</span>
                </div>
                <p className="text-[11px] text-[#667085] line-clamp-1">
                  {messages[messages.length - 1]?.messageText || 'Halo! Ada yang bisa kami bantu?'}
                </p>
              </div>

              <div className="p-3 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E5E7EB] cursor-pointer space-y-1 transition-all opacity-75">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#172033]">
                    Divisi Penjadwalan Armada Sewa
                  </span>
                  <span className="text-[10px] text-[#98A2B3]">Kemarin</span>
                </div>
                <p className="text-[11px] text-[#667085] line-clamp-1">
                  Armada siap dikirimkan H-2 sebelum acara pentas.
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-3 bg-[#F8FAFC] border-t border-[#E5E7EB] text-[11px] text-[#667085] flex items-center justify-between">
              <span>WhatsApp Cepat:</span>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                0812-3456-7890
              </a>
            </div>
          </div>

          {/* Right Panel: Active Chat Room (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_16px_rgba(20,30,60,0.06)] flex flex-col overflow-hidden">
            {/* Chat Room Header */}
            <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  VG
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#17245F] flex items-center gap-1.5">
                    Customer Service & Konsultan Desain Vieguard
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </h3>
                  <span className="text-[11px] text-[#667085]">
                    Menanggapi konsultasi seragam, fitting ukuran, dan konfirmasi penawaran custom
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8FAFC]">
              {messages.map((msg) => {
                const isUser = msg.senderType === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                        isUser
                          ? 'bg-[#1E3A8A] text-white rounded-br-xs'
                          : 'bg-white border border-[#E5E7EB] text-[#172033] rounded-bl-xs'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{msg.messageText}</p>
                      <div
                        className={`flex items-center justify-end gap-1 text-[9px] pt-0.5 ${
                          isUser ? 'text-[#EAF0FF]/80' : 'text-[#98A2B3]'
                        }`}
                      >
                        <span>{new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                        {isUser && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Box */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-[#E5E7EB] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pesan atau pertanyaan seputar seragam..."
                className="flex-1 h-11 px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#172033] focus:outline-none focus:border-[#1E3A8A]"
              />

              <button
                type="submit"
                className="h-11 px-5 bg-[#1E3A8A] hover:bg-[#17245F] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
