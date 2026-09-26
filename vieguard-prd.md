# 📋 PRD — Vieguard Frontend (Next.js App Router)
> Dokumen ini dibuat untuk AI coding assistant (Cursor/Windsurf/Agentic AI).
> Ikuti instruksi di sini sebagai sumber kebenaran tunggal untuk implementasi.

---

## 🎯 PROJECT OVERVIEW

**Nama Toko:** Vieguard  
**Jenis Bisnis:** Konveksi penjahitan seragam drum band, marching band, jas wisuda, dan penyewaan perlengkapan acara.  
**Target User:** Institusi sekolah (SD/SMP/SMA), panitia wisuda, organisasi event.  
**Stack Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS  
**Backend:** Node.js + Express + Prisma (sudah ada, disambungkan via API)  
**API Base URL:** Gunakan `process.env.NEXT_PUBLIC_API_URL` untuk semua request  

---

## 🚨 ATURAN GLOBAL — WAJIB DIIKUTI

1. **TIDAK ADA MOCK DATA** — Semua data wajib dari API call ke backend. Jika data belum tersedia tampilkan skeleton loader, bukan hardcode.
2. **App Router only** — Gunakan `app/` directory. Tidak ada `pages/` directory.
3. **TypeScript strict** — Semua props, response API, dan state harus typed.
4. **Server Component default** — Gunakan `"use client"` hanya jika membutuhkan interactivity/hooks.
5. **Environment variable** — API URL selalu dari `process.env.NEXT_PUBLIC_API_URL`.
6. **Konsisten naming** — Nama komponen PascalCase, file komponen juga PascalCase, utils camelCase.
7. **Nama toko: "Vieguard"** — Konsisten di seluruh codebase. Logo berupa placeholder dengan slot `<LogoPlaceholder />` sampai aset diberikan.
8. **Jangan install library yang tidak perlu** — Gunakan Tailwind CSS untuk styling, jangan tambah CSS-in-JS atau UI library lain kecuali diminta.

---

## 🎨 DESIGN SYSTEM (WAJIB IMPLEMENTASI VIA CSS VARIABLES)

### Setup di `app/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

:root {
  /* Primary */
  --primary-dark: #17245F;
  --primary: #1E3A8A;
  --primary-light: #EAF0FF;

  /* Accent */
  --accent: #F59E0B;
  --accent-light: #FFF4D6;

  /* Neutral */
  --background: #F7F9FC;
  --surface: #FFFFFF;
  --border: #E5E7EB;

  /* Text */
  --text-primary: #172033;
  --text-secondary: #667085;
  --text-muted: #98A2B3;

  /* Semantic */
  --success: #16A34A;
  --warning: #F59E0B;
  --error: #DC2626;
  --info: #2563EB;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  /* Shadows */
  --shadow-card: 0 4px 16px rgba(20, 30, 60, 0.08);
  --shadow-hover: 0 8px 24px rgba(20, 30, 60, 0.12);

  /* Font */
  --font-family: 'Poppins', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}
```

### Tailwind Config (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          dark: '#17245F',
          light: '#EAF0FF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FFF4D6',
        },
        surface: '#FFFFFF',
        border: '#E5E7EB',
        'text-primary': '#172033',
        'text-secondary': '#667085',
        'text-muted': '#98A2B3',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(20, 30, 60, 0.08)',
        hover: '0 8px 24px rgba(20, 30, 60, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 🗂️ STRUKTUR PROJECT LENGKAP

```
vieguard-frontend/
├── app/
│   ├── globals.css                    # CSS variables + base styles
│   ├── layout.tsx                     # Root layout (Navbar, Footer)
│   ├── page.tsx                       # Landing Page (/)
│   │
│   ├── (auth)/                        # Auth route group (tanpa navbar/footer)
│   │   ├── layout.tsx
│   │   ├── masuk/
│   │   │   └── page.tsx               # Login page (/masuk)
│   │   ├── daftar/
│   │   │   └── page.tsx               # Register page (/daftar)
│   │   ├── lupa-password/
│   │   │   └── page.tsx               # Forgot password (/lupa-password)
│   │   └── konfirmasi-kode/
│   │       └── page.tsx               # OTP verification (/konfirmasi-kode)
│   │
│   ├── katalog/
│   │   ├── page.tsx                   # Product catalog (/katalog)
│   │   └── [slug]/
│   │       └── page.tsx               # Product detail (/katalog/[slug])
│   │
│   ├── portofolio/
│   │   └── page.tsx                   # Portfolio gallery (/portofolio)
│   │
│   ├── penyewaan/
│   │   ├── page.tsx                   # Rental catalog (/penyewaan)
│   │   └── [id]/
│   │       └── page.tsx               # Rental detail & booking
│   │
│   ├── pesan-seragam/
│   │   └── page.tsx                   # Order form (requires auth)
│   │
│   ├── pesanan-rental-saya/
│   │   ├── page.tsx                   # My orders & rentals list
│   │   └── [id]/
│   │       └── page.tsx               # Order status & tracking detail
│   │
│   ├── konsultasi-chat/
│   │   └── page.tsx                   # Chat interface (requires auth)
│   │
│   ├── profil/
│   │   └── page.tsx                   # User profile & saved sizes
│   │
│   └── notifikasi/
│       └── page.tsx                   # Notifications center
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── LogoPlaceholder.tsx        # Slot untuk logo Vieguard
│   │
│   ├── ui/                            # Reusable atomic components
│   │   ├── Button.tsx                 # Primary, Secondary, Accent variants
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx               # Loading skeleton
│   │   ├── Spinner.tsx
│   │   ├── Tabs.tsx
│   │   ├── Pagination.tsx
│   │   └── Rating.tsx
│   │
│   ├── cards/
│   │   ├── ProductCard.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── PortfolioCard.tsx
│   │   └── RentalCard.tsx
│   │
│   ├── sections/                      # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── QuickAccessSection.tsx
│   │   ├── PortfolioPreviewSection.tsx
│   │   ├── ProcessSection.tsx
│   │   └── CTASection.tsx
│   │
│   └── features/                      # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   ├── RegisterForm.tsx
│       │   ├── ForgotPasswordForm.tsx
│       │   └── OTPForm.tsx
│       ├── order/
│       │   ├── OrderForm.tsx
│       │   ├── OrderStatusBadge.tsx
│       │   └── OrderTracker.tsx
│       ├── chat/
│       │   ├── ChatWindow.tsx
│       │   ├── ChatMessage.tsx
│       │   └── ChatInput.tsx
│       └── rental/
│           ├── RentalBookingForm.tsx
│           └── RentalStatusBadge.tsx
│
├── lib/
│   ├── api.ts                         # Axios/fetch wrapper + base URL
│   ├── auth.ts                        # Auth helpers (token, session)
│   └── socket.ts                      # Socket.IO client setup
│
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useNotifications.ts
│   └── useSocket.ts
│
├── types/
│   ├── auth.ts
│   ├── product.ts
│   ├── order.ts
│   ├── rental.ts
│   ├── chat.ts
│   └── notification.ts
│
├── store/                             # Zustand atau Context (pilih satu)
│   ├── authStore.ts
│   └── notificationStore.ts
│
├── utils/
│   ├── format.ts                      # Format harga, tanggal, dll
│   └── validators.ts                  # Form validation helpers
│
├── middleware.ts                      # Next.js middleware (auth protection)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local                         # NEXT_PUBLIC_API_URL=http://...
```

---

## 📄 DETAIL SETIAP HALAMAN

### 1. Landing Page — `app/page.tsx`

**Referensi visual:** Sesuai screenshot high-fidelity yang diberikan.

**Sections (urut dari atas):**
1. **Navbar** — Logo Vieguard kiri, menu navigasi tengah, icon notif + tombol Masuk/Daftar kanan
2. **Breadcrumb** — "Beranda > Halaman Saat Ini" (tipis, di atas hero)
3. **Hero Section**
   - Badge kecil: "SPESIFIKASI FASILITAS: BENGKEL PENJAHITAN PUSAT & GUDANG LOGISTIK"
   - H1: "Vieguard — Penjahitan Seragam Drum Band & Penyewaan Perlengkapan"
   - Subtitle + deskripsi singkat
   - 3 link kecil: Panduan Ukuran Presisi, Logistik Institusi Massal, Penjadwalan Armada Sewa
4. **Quick Access Cards** (3 card)
   - Card 1 (Biru): Pesan Seragam / Masuk → `/pesan-seragam`
   - Card 2 (Biru): Portofolio Kami → `/portofolio`
   - Card 3 (Orange): Katalog Publik & Sewa → `/katalog`
5. **Portfolio Preview** — Grid 4 kolom, data dari API `/api/website/orders?type=portfolio&limit=4`
6. **Process Section** — 4 langkah (Pengukuran, Pemilihan Bahan, Jadwal Produksi, Sanitasi Armada Sewa) — ini boleh static karena konten tetap.
7. **Footer**

**API yang dipanggil:**
```
GET /api/website/store-profile       → nama toko, deskripsi, kontak
GET /api/website/products?featured=true&limit=4   → portfolio preview
```

---

### 2. Login — `app/(auth)/masuk/page.tsx`

**Fields:**
- Email (input type email)
- Password (input type password, dengan show/hide toggle)
- Tombol "Masuk" (Primary button, full width)
- Link "Lupa password?" → `/lupa-password`
- Link "Belum punya akun? Daftar" → `/daftar`

**API:**
```
POST /api/website/auth/login
Body: { email: string, password: string }
Response: { accessToken, refreshToken, user }
```

**Behavior:**
- Simpan accessToken di httpOnly cookie (via API route Next.js) atau localStorage (sementara)
- Redirect ke `/` setelah berhasil
- Tampilkan error message dari API response

---

### 3. Register — `app/(auth)/daftar/page.tsx`

**Fields:**
- Nama Lengkap
- Email
- No. HP
- Password
- Konfirmasi Password
- Tombol "Daftar" (Primary, full width)
- Link "Sudah punya akun? Masuk" → `/masuk`

**API:**
```
POST /api/website/auth/register
Body: { name: string, email: string, phone: string, password: string }
```

---

### 4. Lupa Password — `app/(auth)/lupa-password/page.tsx`

**Step 1 — Input Email:**
- Field: Email
- Tombol "Kirim Kode"

**API:**
```
POST /api/website/auth/forgot-password
Body: { email: string }
```

**Behavior:**
- Setelah sukses, redirect ke `/konfirmasi-kode?email={email}`

---

### 5. Konfirmasi Kode (OTP) — `app/(auth)/konfirmasi-kode/page.tsx`

**Fields:**
- 6 kotak OTP terpisah (input satu digit, auto-focus ke kotak berikutnya)
- Timer countdown resend (60 detik)
- Tombol "Verifikasi"
- Tombol "Kirim Ulang Kode" (disabled saat timer berjalan)

**Step 2 setelah OTP valid — Reset Password:**
- Field: Password Baru
- Field: Konfirmasi Password Baru
- Tombol "Simpan Password"

**API:**
```
POST /api/website/auth/verify-otp
Body: { email: string, otp: string }

POST /api/website/auth/reset-password
Body: { email: string, otp: string, newPassword: string }
```

---

### 6. Katalog — `app/katalog/page.tsx`

**Layout:**
- Filter sidebar kiri (kategori, harga, jenis: beli/sewa)
- Grid produk 3 kolom desktop, 2 tablet, 1 mobile
- Pagination

**API:**
```
GET /api/website/products?page=1&limit=12&category=&type=
GET /api/website/categories
```

---

### 7. Detail Produk — `app/katalog/[slug]/page.tsx`

**Sections:**
- Gambar produk
- Nama, deskripsi, harga
- Varian ukuran
- Tombol "Pesan Sekarang" / "Sewa Sekarang"

**API:**
```
GET /api/website/products/[slug]
```

---

### 8. Portofolio — `app/portofolio/page.tsx`

**Layout:** Masonry/grid gallery, filter berdasarkan jenis proyek

**API:**
```
GET /api/website/products?type=portfolio&page=1&limit=12
```

---

### 9. Penyewaan — `app/penyewaan/page.tsx`

**Layout:** Grid katalog alat sewa + filter

**API:**
```
GET /api/website/accessories?type=sewa
```

---

### 10. Pesan Seragam — `app/pesan-seragam/page.tsx`

**Requires auth.** Redirect ke `/masuk` jika belum login.

**Multi-step form:**
- Step 1: Pilih jenis pesanan (beli / sewa / custom)
- Step 2: Detail pesanan (produk, ukuran, kuantitas)
- Step 3: Data institusi + kontak
- Step 4: Ringkasan & konfirmasi

**API:**
```
POST /api/website/orders
```

---

### 11. Pesanan & Rental Saya — `app/pesanan-rental-saya/page.tsx`

**Requires auth.**

**Layout:** Tabs (Pesanan Aktif | Selesai | Sewa)
List pesanan dengan status badge

**API:**
```
GET /api/website/orders?userId=me
```

---

### 12. Detail Status Pesanan — `app/pesanan-rental-saya/[id]/page.tsx`

**Sections:**
- Progress tracker (step-by-step status)
- Detail pesanan
- Riwayat status
- Tombol upload bukti pembayaran (jika perlu DP/pelunasan)

**API:**
```
GET /api/website/orders/[id]
POST /api/website/payments (upload bukti)
```

---

### 13. Konsultasi Chat — `app/konsultasi-chat/page.tsx`

**Requires auth.** Real-time via Socket.IO.

**Layout:**
- Sidebar list conversation (jika ada multiple)
- Area chat utama
- Input + kirim pesan + upload gambar

**Socket events:**
```
emit: 'send_message'
on: 'receive_message', 'message_read'
```

**API:**
```
GET /api/website/chat
POST /api/website/chat/message
```

---

### 14. Profil — `app/profil/page.tsx`

**Requires auth.**

**Sections:**
- Info personal (edit nama, no HP)
- Ukuran tersimpan (size profile)
- Ganti password

**API:**
```
GET /api/website/users/me
PUT /api/website/users/me
```

---

### 15. Notifikasi — `app/notifikasi/page.tsx`

**Requires auth.**

**Layout:** List notifikasi, mark as read, filter (semua/belum dibaca)

**API:**
```
GET /api/website/notifications
PATCH /api/website/notifications/[id]/read
```

---

## 🔐 MIDDLEWARE & AUTH PROTECTION

File `middleware.ts` di root:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/pesan-seragam',
  '/pesanan-rental-saya',
  '/konsultasi-chat',
  '/profil',
  '/notifikasi',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const isProtected = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/masuk', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 🌐 API WRAPPER — `lib/api.ts`

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function apiPost<T>(endpoint: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
```

---

## 📦 DEPENDENCIES YANG PERLU DIINSTALL

```bash
# Core (sudah ada di Next.js 14)
# - next, react, react-dom, typescript, tailwindcss

# Tambahan yang perlu:
npm install socket.io-client
npm install zustand
npm install react-hook-form
npm install zod
npm install @hookform/resolvers

# Optional (jika perlu):
npm install date-fns         # Format tanggal
npm install lucide-react     # Icons
```

---

## 🧩 KOMPONEN KUNCI — SPESIFIKASI

### `LogoPlaceholder.tsx`
```tsx
// Slot untuk logo Vieguard — akan diganti dengan aset asli
export function LogoPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">V</span>
      </div>
      <span className="font-bold text-primary-dark text-lg">Vieguard</span>
    </div>
  )
}
```

### `Button.tsx` — Variants
```
variant="primary"   → bg-primary text-white
variant="secondary" → border border-primary text-primary bg-transparent
variant="accent"    → bg-accent text-white
size="sm" | "md" | "lg"
```

### `Skeleton.tsx`
```
Digunakan sebagai loading state untuk semua komponen yang fetch data.
Tidak boleh ada hardcode data sebagai fallback.
```

---

## 🚦 URUTAN DEVELOPMENT (SESUAI INSTRUKSI)

Ikuti urutan ini, tunggu konfirmasi user sebelum lanjut:

1. **Foundation** — `globals.css`, `tailwind.config.ts`, `lib/api.ts`, `types/`, `.env.local` template
2. **Layout Global** — `LogoPlaceholder`, `Navbar`, `Footer`, `app/layout.tsx`
3. **Auth Pages** — Login, Register, Lupa Password, Konfirmasi Kode (OTP)
4. **Landing Page** — Semua sections
5. **Katalog & Detail Produk**
6. **Portofolio & Penyewaan**
7. **Order Flow** — Pesan Seragam, Pesanan Saya, Detail Status
8. **Real-time** — Chat, Notifikasi
9. **Profil**
10. **Polish** — Loading states, error states, responsive, accessibility

---

## ⚠️ CATATAN PENTING UNTUK AI CODING ASSISTANT

- **Selalu cek apakah endpoint API sudah tersedia** sebelum implementasi. Jika ragu, buat TODO comment.
- **Skeleton loader wajib** untuk setiap komponen async. Gunakan `loading.tsx` di setiap route.
- **Error boundary** diperlukan untuk fetch yang bisa gagal. Gunakan `error.tsx`.
- **Jangan gunakan `any` di TypeScript.** Selalu definisikan tipe yang proper.
- **Mobile-first** — Selalu mulai styling dari mobile, baru ke desktop (`md:`, `lg:`).
- **Nama toko "Vieguard"** — Konsisten di semua text yang tampil ke user.
- **Logo slot** — Gunakan `<LogoPlaceholder />` sampai aset logo diberikan.
- **Bahasa Indonesia** — Semua teks UI dalam Bahasa Indonesia kecuali technical terms.

---

_Last updated: September 2026 | Status: Ready for Development_
