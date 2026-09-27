# 📋 VIEGUARD FRONTEND — COMPLETE PRD + API INTEGRATION + PROJECT STRUCTURE

**Version:** 3.0 (Master Document)  
**Last Updated:** September 2026  
**Status:** ✅ Ready for Development  
**Framework:** Next.js 14+ (App Router) + TypeScript + Tailwind CSS

---

## 📑 TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Global Rules](#2-global-rules)
3. [Design System](#3-design-system)
4. [Routing Map](#4-routing-map)
5. [Project Structure](#5-project-structure)
6. [Foundation Files](#6-foundation-files)
7. [Page Details](#7-page-details)
8. [API Endpoints Reference](#8-api-endpoints-reference)
9. [API Services Layer](#9-api-services-layer)
10. [Socket.IO Setup](#10-socketio-setup)
11. [Development Phases](#11-development-phases)
12. [Checklist](#12-checklist)

---

# 1. PROJECT OVERVIEW

**Nama Toko:** Vieguard  
**Jenis Bisnis:** Konveksi penjahitan seragam drum band, marching band, jas wisuda, dan penyewaan perlengkapan acara.  
**Target User:** Institusi sekolah (SD/SMP/SMA), panitia wisuda, organisasi event.  

**Tech Stack:**
- Frontend: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Backend: Node.js + Express + Prisma (sudah ada)
- Real-time: Socket.IO
- State Management: Zustand
- Form: React Hook Form + Zod

**API Base URL:** `process.env.NEXT_PUBLIC_API_URL` (e.g., `http://localhost:3001`)

---

# 2. GLOBAL RULES — WAJIB DIIKUTI

1. **TIDAK ADA MOCK DATA** — Semua data dari API. Skeleton loader jika loading.
2. **App Router only** — Gunakan `app/` directory. Tidak ada `pages/`.
3. **TypeScript strict** — Semua props, response, state harus typed.
4. **Server Component default** — `"use client"` hanya untuk interactivity/hooks.
5. **Environment variables** — API URL selalu dari `.env.local`.
6. **Konsisten naming** — PascalCase components, camelCase utils.
7. **Nama toko: "Vieguard"** — Konsisten di semua tempat. Logo placeholder sampai aset diberikan.
8. **No unnecessary libraries** — Tailwind CSS untuk styling. Jangan tambah library lain kecuali diminta.
9. **Smart UX** — Auth-based redirects (guest vs login). No hardcoded URLs.
10. **Services layer** — Semua API calls melalui `services/`, bukan langsung di components.

---

# 3. DESIGN SYSTEM

## 3.1 CSS Variables Setup (`app/globals.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  /* Primary Colors */
  --primary-dark: #17245F;
  --primary: #1E3A8A;
  --primary-light: #EAF0FF;

  /* Accent Colors */
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

  /* Spacing (8px grid) */
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
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

  /* Font */
  --font-family: 'Poppins', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
}

h1 {
  font-size: 48px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
}

h2 {
  font-size: 36px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
}

h3 {
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
}

h4 {
  font-size: 18px;
  font-weight: 600;
}

p {
  margin-bottom: var(--space-md);
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 200ms ease;
}

a:hover {
  color: var(--primary-dark);
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: all 200ms ease;
}

input, textarea, select {
  font-family: inherit;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-lg);

  @media (max-width: 768px) {
    padding: 0 var(--space-md);
  }
}

.text-primary {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-muted {
  color: var(--text-muted);
}

.bg-primary {
  background-color: var(--primary);
}

.bg-accent {
  background-color: var(--accent);
}

.border-default {
  border: 1px solid var(--border);
}

.shadow-card {
  box-shadow: var(--shadow-card);
}

.shadow-hover {
  box-shadow: var(--shadow-hover);
}

.rounded-sm {
  border-radius: var(--radius-sm);
}

.rounded-md {
  border-radius: var(--radius-md);
}

.rounded-lg {
  border-radius: var(--radius-lg);
}

.rounded-xl {
  border-radius: var(--radius-xl);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-fadeIn {
  animation: fadeIn 300ms ease-out;
}

.animate-slideUp {
  animation: slideUp 400ms ease-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## 3.2 Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#17245F',
          DEFAULT: '#1E3A8A',
          light: '#EAF0FF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FFF4D6',
        },
        background: '#F7F9FC',
        surface: '#FFFFFF',
        border: '#E5E7EB',
        'text-primary': '#172033',
        'text-secondary': '#667085',
        'text-muted': '#98A2B3',
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(20, 30, 60, 0.08)',
        hover: '0 8px 24px rgba(20, 30, 60, 0.12)',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
```

## 3.3 Typography

- **Primary Font:** Poppins
- **Fallback:** Inter, sans-serif

**Type Scale:**
- Display: 48–56px, weight 700
- H1: 40–48px, weight 700
- H2: 30–36px, weight 700
- H3: 22–26px, weight 600
- H4: 18–20px, weight 600
- Body: 16px, weight 400
- Small: 13–14px, weight 400–500

## 3.4 Spacing System (8px Grid)

- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80–96px

## 3.5 Border Radius

- Small: 8px (inputs, badges)
- Button: 10–12px
- Card: 14–18px
- Large: 20–24px

## 3.6 Shadows

```
Card:   0 4px 16px rgba(20, 30, 60, 0.08)
Hover:  0 8px 24px rgba(20, 30, 60, 0.12)
```

---

# 4. ROUTING MAP (COMPLETE)

```
/                                    Landing page
/masuk                              Login page (auth group)
/daftar                             Register page (auth group)
/lupa-password                      Forgot password (auth group)
/konfirmasi-kode                    OTP verification (auth group)
/katalog                            Product catalog
/katalog/[slug]                     Product detail
/portofolio                         Portfolio gallery
/layanan                            Services overview
/layanan/penjahitan-seragam        Service detail: Penjahitan
/layanan/penyewaan-perlengkapan    Service detail: Penyewaan
/layanan/konsultasi-design         Service detail: Konsultasi
/pesan-seragam-layanan             Order showcase (guest)
/pesan-seragam                     Order form (protected)
/penyewaan                         Rental catalog
/penyewaan/[id]                    Rental detail & booking
/pesanan-rental-saya               My orders/rentals (protected)
/pesanan-rental-saya/[id]          Order detail & tracking (protected)
/konsultasi-chat                   Chat interface (protected)
/profil                            User profile (protected)
/notifikasi                        Notifications (protected)
```

---

# 5. PROJECT STRUCTURE

```
vieguard-frontend/
├── app/
│   ├── globals.css                   # CSS Variables + Base Styles
│   ├── layout.tsx                    # Root Layout
│   ├── page.tsx                      # Landing Page
│   ├── loading.tsx
│   ├── error.tsx
│   │
│   ├── (auth)/                       # Auth Route Group
│   │   ├── layout.tsx
│   │   ├── masuk/page.tsx
│   │   ├── daftar/page.tsx
│   │   ├── lupa-password/page.tsx
│   │   └── konfirmasi-kode/page.tsx
│   │
│   ├── katalog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   ├── portofolio/page.tsx
│   │
│   ├── layanan/
│   │   ├── page.tsx
│   │   └── [serviceSlug]/page.tsx
│   │
│   ├── pesan-seragam-layanan/page.tsx
│   ├── pesan-seragam/page.tsx
│   ├── penyewaan/page.tsx
│   ├── penyewaan/[id]/page.tsx
│   ├── pesanan-rental-saya/page.tsx
│   ├── pesanan-rental-saya/[id]/page.tsx
│   ├── konsultasi-chat/page.tsx
│   ├── profil/page.tsx
│   └── notifikasi/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── LogoPlaceholder.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── Spinner.tsx
│   │   ├── Tabs.tsx
│   │   ├── Pagination.tsx
│   │   ├── Rating.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   └── FormError.tsx
│   │
│   ├── cards/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── PortfolioCard.tsx
│   │   ├── RentalCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── OrderCard.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── BreadcrumbSection.tsx
│   │   ├── QuickAccessSection.tsx
│   │   ├── PortfolioPreviewSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   └── FAQSection.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   └── OTPForm.tsx
│   │   ├── order/
│   │   │   ├── OrderForm.tsx
│   │   │   ├── OrderFormStep1.tsx
│   │   │   ├── OrderFormStep2.tsx
│   │   │   ├── OrderFormStep3.tsx
│   │   │   ├── OrderFormStep4.tsx
│   │   │   ├── OrderStatusBadge.tsx
│   │   │   └── OrderTracker.tsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ChatList.tsx
│   │   ├── rental/
│   │   │   ├── RentalBookingForm.tsx
│   │   │   ├── RentalStatusBadge.tsx
│   │   │   └── RentalCalendar.tsx
│   │   ├── filter/
│   │   │   ├── ProductFilter.tsx
│   │   │   ├── RentalFilter.tsx
│   │   │   └── PriceRangeSlider.tsx
│   │   └── services/
│   │       ├── ServiceDetailHero.tsx
│   │       ├── ServiceFeaturesList.tsx
│   │       ├── ServicePortfolioSection.tsx
│   │       └── ServiceCTASection.tsx
│   │
│   └── shared/
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       ├── NotFoundState.tsx
│       └── ConfirmDialog.tsx
│
├── lib/
│   ├── api.ts                        # API Wrapper
│   ├── auth.ts                       # Auth Helpers
│   ├── socket.ts                     # Socket.IO Setup
│   ├── constants.ts
│   └── utils.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useNotifications.ts
│   ├── useSocket.ts
│   ├── useInfiniteScroll.ts
│   └── useDebounce.ts
│
├── types/
│   ├── auth.ts
│   ├── product.ts
│   ├── order.ts
│   ├── rental.ts
│   ├── service.ts
│   ├── chat.ts
│   ├── notification.ts
│   ├── api.ts
│   └── index.ts
│
├── store/
│   ├── authStore.ts
│   ├── notificationStore.ts
│   ├── cartStore.ts
│   └── index.ts
│
├── services/
│   ├── authService.ts
│   ├── productService.ts
│   ├── orderService.ts
│   ├── rentalService.ts
│   ├── chatService.ts
│   ├── notificationService.ts
│   ├── paymentService.ts
│   └── index.ts
│
├── utils/
│   ├── format.ts
│   ├── validators.ts
│   ├── classNames.ts
│   └── helpers.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local
├── .env.example
├── .gitignore
└── README.md
```

---

# 6. FOUNDATION FILES (READY TO COPY-PASTE)

## 6.1 `lib/api.ts` — API Wrapper

```typescript
// API Wrapper untuk semua HTTP requests

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Type untuk API responses
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Ambil token dari localStorage
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

// GET request
export async function apiGet<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// POST request
export async function apiPost<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// PUT request
export async function apiPut<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// DELETE request
export async function apiDelete(
  endpoint: string,
  options?: RequestInit
): Promise<void> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
}

// FormData POST (untuk upload file)
export async function apiPostFormData<T = unknown>(
  endpoint: string,
  formData: FormData,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = getToken()
  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method: 'POST',
    headers,
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
```

## 6.2 `middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes yang memerlukan authentication
const protectedRoutes = [
  '/pesan-seragam',
  '/pesanan-rental-saya',
  '/konsultasi-chat',
  '/profil',
  '/notifikasi',
]

// Routes untuk auth pages
const authRoutes = ['/masuk', '/daftar', '/lupa-password', '/konfirmasi-kode']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const pathname = request.nextUrl.pathname

  // Check protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL(`/masuk?next=${pathname}`, request.url)
    )
  }

  // Check auth routes (redirect to home jika sudah login)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 6.3 `.env.local` (Template)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# App
NEXT_PUBLIC_APP_NAME=Vieguard
```

## 6.4 Types Files

### `types/auth.ts`
```typescript
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  role: 'customer' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyOTPRequest {
  email: string
  otp: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}
```

### `types/product.ts`
```typescript
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  image: string
  images: string[]
  rating: number
  reviews: number
  type: 'buy' | 'rent'
  variants: ProductVariant[]
  inStock: boolean
  createdAt: Date
}

export interface ProductVariant {
  id: string
  size: string
  quantity: number
  price?: number
}

export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  type?: 'buy' | 'rent'
  search?: string
  page?: number
  limit?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}
```

### `types/order.ts`
```typescript
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'completed'
  | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  userId: string
  type: 'buy' | 'rent' | 'custom'
  status: OrderStatus
  items: OrderItem[]
  totalPrice: number
  paymentStatus: 'pending' | 'verified' | 'rejected'
  institutionName: string
  contactPhone: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  size: string
  quantity: number
  price: number
}

export interface CreateOrderRequest {
  type: 'buy' | 'rent' | 'custom'
  items: CreateOrderItem[]
  institutionName: string
  contactPhone: string
  notes?: string
}

export interface CreateOrderItem {
  productId: string
  size: string
  quantity: number
}
```

### `types/rental.ts`
```typescript
export interface Rental {
  id: string
  name: string
  description: string
  image: string
  price: number
  unit: string
  quantity: number
  condition: string
  available: boolean
}

export interface RentalBooking {
  id: string
  rentalId: string
  orderId: string
  startDate: Date
  endDate: Date
  quantity: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'returned'
}
```

### `types/service.ts`
```typescript
export interface Service {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  heroImage?: string
  features: Feature[]
  steps: Step[]
  faqs: FAQ[]
  ctaText: string
  ctaUrl: string
}

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

export interface Step {
  number: number
  title: string
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}
```

### `types/chat.ts`
```typescript
export interface Conversation {
  id: string
  userId: string
  adminId: string
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderRole: 'customer' | 'admin'
  message: string
  image?: string
  readAt?: Date
  createdAt: Date
}

export interface SendMessageRequest {
  conversationId: string
  message: string
  image?: string
}
```

### `types/notification.ts`
```typescript
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'order' | 'payment' | 'system' | 'message'
  relatedId?: string
  read: boolean
  createdAt: Date
}
```

### `types/api.ts`
```typescript
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
```

### `types/index.ts`
```typescript
export * from './auth'
export * from './product'
export * from './order'
export * from './rental'
export * from './service'
export * from './chat'
export * from './notification'
export * from './api'
```

## 6.5 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["./app/*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/utils/*": ["./utils/*"],
      "@/services/*": ["./services/*"],
      "@/store/*": ["./store/*"],
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".next", "dist"]
}
```

---

# 7. PAGE DETAILS

## 7.1 Landing Page — `/`

**Sections:**
1. Navbar + Breadcrumb
2. Hero (tagline, heading, CTA)
3. Quick Access Cards (3 cards)
4. Portfolio Preview (grid 4)
5. Process Section (4 steps — static)
6. Footer

**API Calls:**
```
GET /api/v0/website/store-profile
GET /api/v0/website/products?search=&categoryId=
```

---

## 7.2 Auth Pages — `/masuk`, `/daftar`, `/lupa-password`, `/konfirmasi-kode`

### Login `/masuk`
- Email, Password input
- Links: "Lupa password?", "Daftar"
- API: `POST /api/website/auth/login`

### Register `/daftar`
- Nama, Email, Phone, Password, Konfirmasi Password
- API: `POST /api/website/auth/register`

### Forgot Password `/lupa-password`
- Email input → "Kirim Kode"
- API: `POST /api/website/auth/forgot-password`

### OTP Verification `/konfirmasi-kode`
- 6-digit OTP input (auto-focus next)
- Reset password form
- API: `POST /api/website/auth/verify-otp`, `POST /api/website/auth/reset-password`

---

## 7.3 Katalog — `/katalog`

**Layout:** Filter sidebar + Grid 3 desktop, 2 tablet, 1 mobile + Pagination

**API:**
```
GET /api/v0/website/products?search=&categoryId=
GET /api/v0/website/categories
```

---

## 7.4 Detail Produk — `/katalog/[slug]`

**Sections:** Image, nama, harga, deskripsi, varian, CTA

**API:**
```
GET /api/v0/website/products/:id
```

---

## 7.5 Portofolio — `/portofolio`

**Layout:** Masonry grid gallery

**API:**
```
GET /api/v0/website/products?search=&categoryId=
```

---

## 7.6 Services Overview — `/layanan`

**Sections:**
1. Hero
2. Services Grid (3 cards) → Penjahitan, Penyewaan, Konsultasi
3. Why Choose Us (4 columns)
4. Recent Portfolio (grid 4)
5. Testimonials (3-4)
6. CTA section

**API:**
```
GET /api/v0/website/products?search=&categoryId=
GET /api/v0/website/testimonials
```

---

## 7.7 Service Detail — `/layanan/[serviceSlug]`

**Slugs:** `penjahitan-seragam`, `penyewaan-perlengkapan`, `konsultasi-design`

**Sections:**
1. Detail Hero
2. Overview
3. Features/Benefits
4. How It Works (step-by-step)
5. Portfolio Showcase
6. FAQ Accordion
7. Testimonials
8. CTA

**API:**
```
GET /api/v0/website/products?search=&categoryId=
GET /api/v0/website/testimonials
```

---

## 7.8 Order Showcase — `/pesan-seragam-layanan`

**For:** Guest/belum login users

**Sections:**
1. Hero
2. Value Proposition (4 cards)
3. How to Order (5 steps)
4. Portfolio (4-6 kolom)
5. Testimonials (3-4)
6. FAQ (5-7)
7. Trust Signals/Social Proof
8. Final CTA

**Smart Redirect:**
- If logged in → "Mulai Pesanan" → `/pesan-seragam`
- If guest → "Daftar & Pesanan" → `/daftar?next=/pesan-seragam`

**API:**
```
GET /api/v0/website/store-profile
GET /api/v0/website/products?search=&categoryId=
GET /api/v0/website/testimonials
```

---

## 7.9 Pesan Seragam — `/pesan-seragam`

**Requires:** Auth

**Multi-step form:**
- Step 1: Jenis pesanan (beli/sewa/custom)
- Step 2: Detail pesanan (produk, ukuran, qty)
- Step 3: Data institusi (nama, kontak, alamat)
- Step 4: Ringkasan & konfirmasi

**API:**
```
POST /api/v0/website/orders
```

---

## 7.10 Penyewaan — `/penyewaan`

**Layout:** Grid katalog alat sewa + filter

**API:**
```
GET /api/v0/website/accessories
```

---

## 7.11 Rental Detail — `/penyewaan/[id]`

**Sections:** Image, deskripsi, harga sewa, calendar, CTA booking

**API:**
```
GET /api/v0/website/accessories (filter by ID)
```

---

## 7.12 Pesanan & Rental Saya — `/pesanan-rental-saya`

**Requires:** Auth

**Layout:** Tabs (Pesanan Aktif | Selesai | Sewa)

**API:**
```
GET /api/v0/website/orders
```

---

## 7.13 Order Detail & Tracking — `/pesanan-rental-saya/[id]`

**Requires:** Auth

**Sections:** Progress tracker, detail pesanan, riwayat status, upload bukti pembayaran

**API:**
```
GET /api/v0/website/orders/:id
GET /api/v0/website/orders/:id/status-history
POST /api/v0/website/payments/proof
```

---

## 7.14 Chat — `/konsultasi-chat`

**Requires:** Auth | Real-time via Socket.IO

**Layout:** Chat message list + input

**API:**
```
POST /api/v0/website/chat/messages
GET /api/v0/website/chat/messages
```

---

## 7.15 Profile — `/profil`

**Requires:** Auth

**Sections:** Info personal, ukuran tersimpan, ganti password

**API:**
```
GET /api/v0/website/users/profile
PUT /api/v0/website/users/profile
```

---

## 7.16 Notifications — `/notifikasi`

**Requires:** Auth

**Layout:** List notifikasi, mark as read, filter

**API:**
```
GET /api/v0/website/notifications
PATCH /api/v0/website/notifications/:id/read
```

---

# 8. API ENDPOINTS REFERENCE

## 8.1 Authentication

```http
POST /api/v0/website/auth/register
POST /api/v0/website/auth/login
POST /api/v0/website/auth/refresh
POST /api/v0/website/auth/logout
POST /api/v0/website/auth/forgot-password
POST /api/v0/website/auth/reset-password
```

## 8.2 User Profile

```http
GET /api/v0/website/users/profile
PUT /api/v0/website/users/profile
```

## 8.3 Store Profile

```http
GET /api/v0/website/store-profile
```

## 8.4 Products

```http
GET /api/v0/website/products?search=&categoryId=
GET /api/v0/website/products/:id
GET /api/v0/website/products/:id/availability?pickupDate=&returnDate=
```

## 8.5 Categories

```http
GET /api/v0/website/categories
```

## 8.6 Accessories

```http
GET /api/v0/website/accessories
```

## 8.7 Orders

```http
POST /api/v0/website/orders
GET /api/v0/website/orders
GET /api/v0/website/orders/:id
GET /api/v0/website/orders/:id/status-history
```

## 8.8 Payments

```http
POST /api/v0/website/payments/proof (FormData)
```

## 8.9 Chat

```http
POST /api/v0/website/chat/messages
GET /api/v0/website/chat/messages
```

### Socket.IO Events:
```
emit: send_message
on: receive_message, message_read
```

## 8.10 Notifications

```http
GET /api/v0/website/notifications
PATCH /api/v0/website/notifications/:id/read
```

### Socket.IO Events:
```
on: notification
```

## 8.11 Testimonials

```http
GET /api/v0/website/testimonials
POST /api/v0/website/testimonials
```

---

# 9. API SERVICES LAYER

## 9.1 `services/authService.ts`

```typescript
import { apiPost, apiGet, apiPut } from '@/lib/api'
import { AuthResponse, User, LoginRequest, RegisterRequest } from '@/types/auth'

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>('/api/v0/website/auth/register', data)
    return response.data!
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>('/api/v0/website/auth/login', data)
    return response.data!
  },

  async refresh(): Promise<{ accessToken: string }> {
    const response = await apiPost('/api/v0/website/auth/refresh', {})
    return response.data!
  },

  async logout(): Promise<void> {
    await apiPost('/api/v0/website/auth/logout', {})
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiPost('/api/v0/website/auth/forgot-password', { email })
    return response.data!
  },

  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiPost('/api/v0/website/auth/reset-password', {
      email,
      otp,
      newPassword,
    })
    return response.data!
  },

  async getProfile(): Promise<User> {
    const response = await apiGet<User>('/api/v0/website/users/profile')
    return response.data!
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiPut<User>('/api/v0/website/users/profile', data)
    return response.data!
  },
}
```

## 9.2 `services/productService.ts`

```typescript
import { apiGet } from '@/lib/api'
import { Product, ProductListResponse, ProductFilter } from '@/types/product'

export const productService = {
  async getAll(filters: ProductFilter): Promise<ProductListResponse> {
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    if (filters.categoryId) params.append('categoryId', filters.categoryId)

    const response = await apiGet<ProductListResponse>(
      `/api/v0/website/products?${params.toString()}`
    )
    return response.data!
  },

  async getById(id: string): Promise<Product> {
    const response = await apiGet<Product>(`/api/v0/website/products/${id}`)
    return response.data!
  },

  async checkAvailability(
    productId: string,
    pickupDate?: string,
    returnDate?: string
  ): Promise<any> {
    const params = new URLSearchParams()
    if (pickupDate) params.append('pickupDate', pickupDate)
    if (returnDate) params.append('returnDate', returnDate)

    const response = await apiGet(
      `/api/v0/website/products/${productId}/availability?${params.toString()}`
    )
    return response.data!
  },
}
```

## 9.3 `services/orderService.ts`

```typescript
import { apiPost, apiGet } from '@/lib/api'
import { Order, CreateOrderRequest } from '@/types/order'

export const orderService = {
  async create(data: CreateOrderRequest): Promise<Order> {
    const response = await apiPost<Order>('/api/v0/website/orders', data)
    return response.data!
  },

  async getMyOrders(): Promise<Order[]> {
    const response = await apiGet<Order[]>('/api/v0/website/orders')
    return response.data!
  },

  async getDetail(orderId: string): Promise<Order> {
    const response = await apiGet<Order>(`/api/v0/website/orders/${orderId}`)
    return response.data!
  },

  async getStatusHistory(orderId: string): Promise<any[]> {
    const response = await apiGet(`/api/v0/website/orders/${orderId}/status-history`)
    return response.data!
  },
}
```

## 9.4 `services/paymentService.ts`

```typescript
import { apiPostFormData } from '@/lib/api'

export const paymentService = {
  async uploadPaymentProof(
    proofImage: File,
    orderId: string,
    amount: number
  ): Promise<any> {
    const formData = new FormData()
    formData.append('proofImage', proofImage)
    formData.append('orderId', orderId)
    formData.append('amount', amount.toString())

    const response = await apiPostFormData('/api/v0/website/payments/proof', formData)
    return response.data!
  },
}
```

## 9.5 `services/chatService.ts`

```typescript
import { apiGet, apiPost } from '@/lib/api'

export const chatService = {
  async sendMessage(messageText: string): Promise<any> {
    const response = await apiPost('/api/v0/website/chat/messages', { messageText })
    return response.data!
  },

  async getMessages(): Promise<any[]> {
    const response = await apiGet('/api/v0/website/chat/messages')
    return response.data!
  },
}
```

## 9.6 `services/notificationService.ts`

```typescript
import { apiGet, apiPut } from '@/lib/api'

export const notificationService = {
  async getAll(page = 1, limit = 10, unreadOnly = false): Promise<any> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (unreadOnly) params.append('unreadOnly', 'true')

    const response = await apiGet(`/api/website/notifications?${params.toString()}`)
    return response.data!
  },

  async markAsRead(notificationId: string): Promise<void> {
    await apiPut(`/api/website/notifications/${notificationId}/read`, {})
  },
}
```

## 9.7 `services/index.ts`

```typescript
export { authService } from './authService'
export { productService } from './productService'
export { orderService } from './orderService'
export { paymentService } from './paymentService'
export { chatService } from './chatService'
export { notificationService } from './notificationService'
```

---

# 10. SOCKET.IO SETUP

## 10.1 `lib/socket.ts`

```typescript
import io from 'socket.io-client'

let socket: any = null

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })
  }
  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
```

## 10.2 `hooks/useSocket.ts`

```typescript
'use client'

import { useEffect, useCallback } from 'react'
import { getSocket } from '@/lib/socket'

export function useSocket() {
  const socket = getSocket()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [socket])

  const emit = useCallback((event: string, data: any) => {
    socket.emit(event, data)
  }, [socket])

  const on = useCallback((event: string, callback: (data: any) => void) => {
    socket.on(event, callback)
    return () => socket.off(event, callback)
  }, [socket])

  return { socket, emit, on }
}
```

## 10.3 Socket Events

```javascript
// Send message
socket.emit('send_message', {
  conversationId: '1',
  message: 'Hello!',
  image: null
})

// Receive message
socket.on('receive_message', (data) => {
  // Handle new message
})

// Receive notification
socket.on('notification', (data) => {
  // {
  //   id: "1",
  //   type: "order" | "payment" | "system" | "message",
  //   title: "...",
  //   message: "...",
  //   relatedAt: "2024-09-26T..."
  // }
})
```

---

# 11. DEVELOPMENT PHASES

### **Phase 1 — Foundation** (Week 1)
- [ ] Copy `globals.css`, `tailwind.config.ts`
- [ ] Setup `lib/api.ts`, `middleware.ts`
- [ ] Create all `types/` files
- [ ] Create all `services/` layer
- [ ] Setup `.env.local`
- [ ] Verify build works

### **Phase 2 — Layout Global** (Week 1-2)
- [ ] LogoPlaceholder component
- [ ] Navbar component
- [ ] Footer component
- [ ] Breadcrumb component
- [ ] `app/layout.tsx` root layout
- [ ] Test layout on mobile/desktop

### **Phase 3 — Auth Pages** (Week 2)
- [ ] Login page
- [ ] Register page
- [ ] Forgot password page
- [ ] OTP verification page
- [ ] Auth form components
- [ ] Test with real backend

### **Phase 4 — Landing Page** (Week 2-3)
- [ ] Hero section
- [ ] Quick access cards
- [ ] Portfolio preview
- [ ] Process section
- [ ] CTA section
- [ ] Full page assembly

### **Phase 5 — Services Pages** (Week 3)
- [ ] Services overview (`/layanan`)
- [ ] Service detail (`/layanan/[slug]`)
- [ ] Order showcase (`/pesan-seragam-layanan`)
- [ ] Service-related components

### **Phase 6 — Katalog & Detail** (Week 3-4)
- [ ] Product listing page
- [ ] Product filters
- [ ] Product detail page
- [ ] ProductCard component

### **Phase 7 — Penyewaan** (Week 4)
- [ ] Rental listing page
- [ ] Rental detail page
- [ ] RentalCard component

### **Phase 8 — Order Flow** (Week 4-5)
- [ ] Multi-step order form
- [ ] My orders list
- [ ] Order detail & tracking
- [ ] Order components

### **Phase 9 — Real-time** (Week 5)
- [ ] Chat interface
- [ ] Socket.IO integration
- [ ] Notifications
- [ ] Real-time components

### **Phase 10 — Polish & Testing** (Week 5-6)
- [ ] Loading states (skeleton)
- [ ] Error states
- [ ] Empty states
- [ ] Responsive testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Bug fixes

---

# 12. IMPLEMENTATION CHECKLIST

## Dependencies to Install

```bash
npm install socket.io-client zustand react-hook-form zod @hookform/resolvers date-fns
```

## Setup Checklist

- [ ] Create Next.js project: `npx create-next-app@latest vieguard-frontend --typescript --tailwind --app`
- [ ] Copy `globals.css` dan `tailwind.config.ts`
- [ ] Create folder structure sesuai `PROJECT_STRUCTURE.md`
- [ ] Copy semua files dari section 6 (Foundation Files)
- [ ] Copy `services/` layer dari section 9
- [ ] Setup `middleware.ts`
- [ ] Create `.env.local` dengan API URL
- [ ] Test: `npm run dev` should work
- [ ] Create `components/layout/LogoPlaceholder.tsx`
- [ ] Create Navbar, Footer, Breadcrumb components
- [ ] Create UI components (Button, Input, Badge, dll)
- [ ] Test auth flow (register, login)
- [ ] Test product API calls
- [ ] Test Socket.IO connection
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Deploy to staging

---

# 13. EXAMPLE: USE SERVICE IN COMPONENT

```typescript
'use client'

import { useEffect, useState } from 'react'
import { productService } from '@/services'
import { Product } from '@/types/product'
import ProductCard from '@/components/cards/ProductCard'
import Skeleton from '@/components/ui/Skeleton'

export default function KatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const result = await productService.getAll({
          page: 1,
          limit: 12,
          type: 'buy',
        })
        setProducts(result.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat produk')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-error">{error}</div>
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

---

# 14. QUICK REFERENCE

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Vieguard
```

## Common Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## Testing API with Curl

```bash
# Register
curl -X POST http://localhost:3001/api/website/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "081234567890",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3001/api/website/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Products
curl -X GET 'http://localhost:3001/api/website/products?page=1&limit=5'

# Get Profile (with auth)
curl -X GET http://localhost:3001/api/website/users/me \
  -b cookies.txt
```

---

# 15. IMPORTANT NOTES

1. **Always use services layer** — Jangan panggil API langsung di components
2. **Skeleton loader everywhere** — Loading state wajib di setiap async component
3. **Error boundaries** — Gunakan `error.tsx` di setiap route
4. **Responsive design** — Mobile-first approach dengan Tailwind breakpoints
5. **TypeScript strict** — No `any` types
6. **Environment variables** — Jangan hardcode URLs
7. **Token management** — `lib/api.ts` sudah handle token di header & cookies
8. **Socket.IO connection** — Setup di root layout atau use `useSocket` hook
9. **Logo slot** — Gunakan `<LogoPlaceholder />` sampai aset final
10. **Testing** — Test dengan backend yang running di localhost:3001

---

_Last Updated: September 2026 | Status: ✅ Ready for Development | Version: 3.0_
