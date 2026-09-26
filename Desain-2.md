# Design.md — Web Design Reference

## 1. Tujuan Desain

Dokumen ini menjadi panduan visual dan struktur saat membangun website berdasarkan dua referensi desain:

1. **Referensi A — Website Pemerintahan/Informasi**
   - Fokus pada informasi yang mudah ditemukan.
   - Layout bersih, profesional, terstruktur.
   - Menggunakan section berbentuk card.
   - Memiliki area hero dengan pencarian/shortcut.
   - Cocok sebagai referensi untuk struktur informasi dan navigasi.

2. **Referensi B — Website E-Commerce Furniture**
   - Fokus pada visual produk dan conversion.
   - Hero image besar dengan CTA.
   - Product card berbentuk grid.
   - Navigasi kategori yang jelas.
   - Cocok sebagai referensi untuk card, CTA, katalog, dan visual hierarchy.

**Arah desain yang digunakan:** menggabungkan struktur informasi dari Referensi A dengan visual, card, CTA, dan grid dari Referensi B.

---

# 2. Design Direction

## Gaya Visual

- Modern
- Clean
- Profesional
- Friendly
- Minimal tetapi tidak terlalu kosong
- Banyak menggunakan rounded corner
- Menggunakan card untuk mengelompokkan informasi
- Mengutamakan whitespace
- CTA dibuat menonjol tetapi tidak berlebihan

## Prinsip Utama

1. **Information first** — pengguna harus cepat memahami isi halaman.
2. **Visual hierarchy** — judul, deskripsi, CTA, dan informasi tambahan memiliki tingkat penekanan berbeda.
3. **Consistency** — radius, spacing, button, typography, dan card harus konsisten.
4. **Responsive** — desain harus nyaman digunakan di desktop, tablet, dan mobile.
5. **Scannable** — konten dibuat mudah dipindai tanpa harus membaca seluruh halaman.

---

# 3. Color System

> Warna berikut adalah titik awal. Sesuaikan lagi dengan identitas brand/project.

### Primary

- Primary Dark: `#17245F`
- Primary: `#1E3A8A`
- Primary Light: `#EAF0FF`

### Accent

- Accent Orange: `#F59E0B`
- Accent Light: `#FFF4D6`

### Neutral

- Background: `#F7F9FC`
- Surface: `#FFFFFF`
- Border: `#E5E7EB`
- Text Primary: `#172033`
- Text Secondary: `#667085`
- Text Muted: `#98A2B3`

### Semantic

- Success: `#16A34A`
- Warning: `#F59E0B`
- Error: `#DC2626`
- Info: `#2563EB`

---

# 4. Typography

Gunakan font sans-serif modern.

### Recommended

- Primary font: `Poppins`
- Alternative: `Inter`

### Type Scale

| Element | Size Desktop | Weight |
|---|---:|---:|
| Display | 48–56px | 700 |
| H1 | 40–48px | 700 |
| H2 | 30–36px | 700 |
| H3 | 22–26px | 600 |
| H4 | 18–20px | 600 |
| Body | 16px | 400 |
| Small | 13–14px | 400–500 |
| Button | 14–16px | 600 |

### Typography Rules

- Gunakan maksimal 2 jenis font.
- Heading dibuat bold dan mudah dibedakan dari body.
- Line-height body sekitar `1.5–1.7`.
- Jangan menggunakan terlalu banyak ukuran font dalam satu section.

---

# 5. Spacing System

Gunakan kelipatan 4 atau 8 agar spacing konsisten.

```text
4px   — sangat kecil
8px   — icon/text gap
12px  — small gap
16px  — default
24px  — card/content gap
32px  — section internal
48px  — antar bagian
64px  — section spacing
80–96px — major section spacing
```

---

# 6. Border Radius

Gunakan rounded corner seperti kedua referensi.

```text
Small component : 8px
Button          : 10–12px
Card            : 14–18px
Large container : 20–24px
```

Hindari mencampurkan terlalu banyak radius berbeda.

---

# 7. Shadow

Gunakan shadow tipis untuk memberikan depth.

### Card

```css
box-shadow: 0 4px 16px rgba(20, 30, 60, 0.08);
```

### Hover

```css
box-shadow: 0 8px 24px rgba(20, 30, 60, 0.12);
```

Shadow tidak boleh terlalu gelap.

---

# 8. Layout System

## Desktop

- Max content width: `1200–1280px`
- Horizontal padding: `24–40px`
- Grid: 12 columns
- Section gap: `64–96px`

## Tablet

- Padding: `24px`
- Grid: 6–8 columns

## Mobile

- Padding: `16px`
- Grid: 1 column atau 2 column sesuai kebutuhan
- Section gap: `40–56px`

---

# 9. Header / Navbar

## Struktur

```text
[Logo]        [Menu 1] [Menu 2] [Menu 3] [Menu 4]       [Icon] [CTA]
```

### Desktop

- Header memiliki background putih atau transparan sesuai hero.
- Logo berada di kiri.
- Navigation berada di tengah/kanan.
- CTA atau icon action berada di kanan.
- Tinggi header sekitar `64–80px`.

### Mobile

Gunakan:

```text
[Logo]                              [Menu]
```

Navigation berubah menjadi hamburger menu.

### Referensi

Dari Referensi A:
- navbar sederhana
- fokus pada navigasi informasi

Dari Referensi B:
- navbar lebih compact
- icon action di kanan

---

# 10. Hero Section

Hero merupakan bagian pertama yang dilihat pengguna.

## Struktur

```text
------------------------------------------------
|                                              |
|        Eyebrow / Label                       |
|        Main Heading                          |
|        Supporting Description                |
|        [Primary CTA] [Secondary CTA]         |
|                                              |
|                          [Hero Image]         |
|                                              |
------------------------------------------------
```

### Karakteristik

- Tinggi sekitar `450–650px`.
- Gunakan image berkualitas tinggi.
- Bisa menggunakan overlay/gradient jika teks berada di atas gambar.
- Heading harus menjadi fokus utama.
- CTA harus mudah terlihat.

### Dari Referensi A

Gunakan konsep:
- hero image
- search/action area
- shortcut buttons

### Dari Referensi B

Gunakan:
- headline besar
- CTA utama
- background image yang kuat

---

# 11. Search / Quick Action

Jika website membutuhkan pencarian, gunakan search bar besar.

```text
[ 🔍  Cari layanan, produk, atau informasi...       ]
```

Di bawahnya dapat diberikan quick action:

```text
[Action 1] [Action 2] [Action 3] [Action 4]
```

### Design

- Search height: `48–56px`
- Radius: `12–16px`
- Background putih
- Border tipis
- Icon search di kiri atau kanan
- Quick action menggunakan card/button kecil

---

# 12. Section Header

Setiap section menggunakan pola:

```text
Eyebrow / small label

Main Section Title
Short description

                         [View All →]
```

Contoh:

```text
OUR COLLECTION

Produk Pilihan
Temukan berbagai produk yang sesuai kebutuhanmu.

                                    Lihat Semua →
```

---

# 13. Card System

Card merupakan komponen utama desain.

## Basic Card

```text
┌────────────────────────────┐
│                            │
│          IMAGE             │
│                            │
├────────────────────────────┤
│ Category                   │
│ Card Title                 │
│ Short description          │
│                            │
│ [Action]                   │
└────────────────────────────┘
```

### Card Rules

- Background: white
- Border: `1px solid #E5E7EB` atau tanpa border
- Radius: `14–18px`
- Image ratio konsisten
- Padding: `16–20px`
- CTA berada di area bawah
- Hover memberikan sedikit elevation

---

# 14. Product Card

Untuk halaman katalog/e-commerce:

```text
┌────────────────────────────┐
│ [Badge]              [♡]   │
│                            │
│          PRODUCT           │
│           IMAGE            │
│                            │
├────────────────────────────┤
│ ★ 4.6                      │
│ Product Name               │
│ Short description          │
│                            │
│ Rp XXX.XXX                 │
│                            │
│ [ 🛒 Tambah ke Keranjang ] │
└────────────────────────────┘
```

### Informasi

Wajib:

- Product image
- Product name
- Price
- CTA

Opsional:

- Rating
- Discount
- Wishlist
- Category
- Short description

---

# 15. Category Card

Gunakan category card untuk mengarahkan pengguna.

```text
┌─────────────────────────┐
│        [IMAGE/ICON]     │
│                         │
│      Category Name      │
│      Short description  │
│                         │
│       [Shop Now]        │
└─────────────────────────┘
```

Grid desktop:

```text
[ Category 1 ] [ Category 2 ] [ Category 3 ]
```

Mobile:

```text
[ Category 1 ]
[ Category 2 ]
[ Category 3 ]
```

---

# 16. Event / Content Card

Untuk berita, agenda, artikel, atau event:

```text
┌────────────────────────────┐
│           IMAGE            │
├────────────────────────────┤
│ DATE / CATEGORY            │
│                            │
│ Event / Article Title      │
│ Short description          │
│                            │
│ → Selengkapnya             │
└────────────────────────────┘
```

Jika terdapat tanggal, tanggal dapat dibuat sebagai badge yang menonjol.

---

# 17. Filter / Category Tabs

Untuk katalog:

```text
[ Semua ] [ Sofa ] [ Kursi ] [ Meja ] [ Tempat Tidur ] [ Dekorasi ]
```

### Active State

- Background: Primary
- Text: White

### Inactive State

- Background: White
- Text: Dark
- Border/shadow tipis

---

# 18. CTA Button

## Primary

```text
[ Belanja Sekarang ]
```

- Background: Primary
- Text: White
- Radius: `10–12px`
- Height: `44–52px`

## Secondary

```text
[ Pelajari Selengkapnya ]
```

- Background: White/transparent
- Border: Primary
- Text: Primary

## Accent CTA

Gunakan accent orange untuk action yang ingin lebih terlihat.

---

# 19. Image Guidelines

Gunakan gambar yang:

- memiliki kualitas tinggi
- memiliki subject yang jelas
- memiliki style visual yang konsisten
- tidak terlalu ramai
- memiliki aspect ratio konsisten

### Product Image

Gunakan:

```text
4:3 atau 1:1
```

### Hero

Gunakan:

```text
16:7
16:8
atau background full-width
```

### Content Card

Gunakan:

```text
16:9
```

---

# 20. Homepage Structure

Jika kedua referensi digabung, struktur homepage dapat dibuat seperti berikut:

```text
┌──────────────────────────────────────┐
│ HEADER / NAVBAR                      │
├──────────────────────────────────────┤
│ HERO                                 │
│                                      │
│ Heading                              │
│ Description                          │
│ CTA                                  │
│ Hero Image                           │
├──────────────────────────────────────┤
│ QUICK ACTION / CATEGORY              │
│ [Card] [Card] [Card] [Card]          │
├──────────────────────────────────────┤
│ FEATURED / HIGHLIGHT                 │
│                                      │
│ Image + Text + CTA                   │
├──────────────────────────────────────┤
│ FEATURED PRODUCTS / CONTENT          │
│                                      │
│ [Card] [Card] [Card]                 │
│ [Card] [Card] [Card]                 │
├──────────────────────────────────────┤
│ EVENT / NEWS / INFORMATION            │
│                                      │
│ [Card] [Card] [Card]                 │
├──────────────────────────────────────┤
│ ADDITIONAL INFORMATION               │
│                                      │
│ [Category] [Category] [Category]     │
├──────────────────────────────────────┤
│ CTA SECTION                          │
├──────────────────────────────────────┤
│ FOOTER                               │
└──────────────────────────────────────┘
```

---

# 21. Footer

Gunakan footer dengan warna Primary Dark.

## Struktur

```text
---------------------------------------------------
| LOGO                                             |
| Short description                                |
|                                                  |
| Navigation       Services       Contact          |
| Link             Link           Address          |
| Link             Link           Email            |
| Link             Link           Phone            |
|                                                  |
| Social Media                                     |
---------------------------------------------------
| Copyright                         Privacy Terms  |
---------------------------------------------------
```

Footer boleh menggunakan background `#17245F` dan text putih.

---

# 22. Responsive Behavior

## Desktop ≥ 1024px

- Full navbar
- Hero dua kolom
- Product grid 3–4 columns
- Category grid 3–4 columns
- Content cards horizontal/3 columns

## Tablet 768–1023px

- Navbar mulai disederhanakan
- Hero tetap 2 kolom jika cukup
- Product grid 2–3 columns
- Category grid 2–3 columns

## Mobile < 768px

- Hamburger navigation
- Hero menjadi 1 kolom
- Heading diperkecil
- Product grid 1–2 columns
- Card padding diperkecil
- CTA dapat full width
- Horizontal content dapat berubah menjadi vertical

---

# 23. Interaction & Animation

Gunakan animasi sederhana.

### Hover Card

```text
transform: translateY(-4px)
transition: 200–300ms
```

### Button

- Slight brightness change
- Slight elevation
- Cursor pointer

### Image

- Slight zoom `scale(1.02–1.05)` saat hover

### Page

Jangan menggunakan animasi berlebihan.

Tujuan animasi adalah memberikan feedback, bukan menjadi fokus utama.

---

# 24. Accessibility

Pastikan:

- Contrast text cukup tinggi.
- Semua button memiliki label jelas.
- Image memiliki `alt`.
- Jangan mengandalkan warna saja untuk menunjukkan status.
- Focus state tersedia untuk keyboard.
- Ukuran text mobile tetap mudah dibaca.
- Click/tap target minimal sekitar `44px`.

---

# 25. Component List

Komponen yang sebaiknya dibuat reusable:

```text
Navbar
MobileMenu
Hero
SearchBar
QuickActionCard
SectionHeader
CategoryCard
ProductCard
EventCard
ArticleCard
Badge
Button
IconButton
Rating
Tabs
Pagination
CTASection
Footer
```

---

# 26. Suggested Project Structure

Contoh jika menggunakan React:

```text
src/
├── components/
│   ├── Navbar/
│   ├── Hero/
│   ├── SearchBar/
│   ├── CategoryCard/
│   ├── ProductCard/
│   ├── EventCard/
│   ├── SectionHeader/
│   ├── Button/
│   └── Footer/
│
├── pages/
│   ├── Home/
│   ├── Products/
│   ├── ProductDetail/
│   └── About/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── styles/
│   ├── variables.css
│   └── global.css
│
└── App.jsx
```

---

# 27. CSS Variables

```css
:root {
  --primary-dark: #17245F;
  --primary: #1E3A8A;
  --primary-light: #EAF0FF;

  --accent: #F59E0B;
  --accent-light: #FFF4D6;

  --background: #F7F9FC;
  --surface: #FFFFFF;

  --text-primary: #172033;
  --text-secondary: #667085;
  --text-muted: #98A2B3;

  --border: #E5E7EB;

  --success: #16A34A;
  --warning: #F59E0B;
  --error: #DC2626;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  --shadow-card: 0 4px 16px rgba(20, 30, 60, 0.08);
  --shadow-hover: 0 8px 24px rgba(20, 30, 60, 0.12);
}
```

---

# 28. Reference Mapping

| Elemen | Referensi A | Referensi B | Implementasi |
|---|---|---|---|
| Navbar | ✓ | ✓ | Navbar modern |
| Hero | ✓ | ✓ | Hero image + CTA |
| Search | ✓ | — | Search/quick action |
| Category | ✓ | ✓ | Category cards |
| Content cards | ✓ | ✓ | Reusable cards |
| Product grid | — | ✓ | Product cards |
| Event/news | ✓ | — | Event/content cards |
| CTA | ✓ | ✓ | Primary + secondary |
| Footer | ✓ | ✓ | Dark footer |
| Whitespace | ✓ | ✓ | Gunakan secara konsisten |
| Rounded card | ✓ | ✓ | 14–18px |
| Blue primary | ✓ | ✓ | Primary color |

---

# 29. Do & Don't

## Do

- Gunakan whitespace yang cukup.
- Gunakan hierarchy yang jelas.
- Gunakan gambar berkualitas.
- Buat card konsisten.
- Gunakan CTA yang jelas.
- Pastikan mobile responsive.
- Gunakan komponen reusable.
- Pertahankan visual identity yang konsisten.

## Don't

- Jangan menggunakan terlalu banyak warna.
- Jangan menggunakan terlalu banyak jenis font.
- Jangan membuat semua elemen terlihat sama penting.
- Jangan menggunakan shadow terlalu berat.
- Jangan membuat button terlalu kecil.
- Jangan memenuhi halaman dengan terlalu banyak informasi.
- Jangan menggunakan animasi berlebihan.

---

# 30. Prioritas Saat Implementasi

Urutan pengerjaan:

### Phase 1 — Foundation
- [ ] Color system
- [ ] Typography
- [ ] Spacing
- [ ] Button
- [ ] Card
- [ ] Container
- [ ] Responsive breakpoint

### Phase 2 — Global
- [ ] Navbar
- [ ] Footer
- [ ] Mobile navigation

### Phase 3 — Homepage
- [ ] Hero
- [ ] Search / Quick Action
- [ ] Category section
- [ ] Featured section
- [ ] Product/content grid
- [ ] CTA section

### Phase 4 — Interaction
- [ ] Hover state
- [ ] Active state
- [ ] Loading state
- [ ] Empty state
- [ ] Error state

### Phase 5 — Responsive
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile

### Phase 6 — Final Polish
- [ ] Typography consistency
- [ ] Spacing consistency
- [ ] Image consistency
- [ ] Accessibility
- [ ] Performance
- [ ] Cross-browser testing

---

# 31. Final Design Goal

Hasil akhir yang dituju:

> **Website modern, clean, profesional, mudah digunakan, dan memiliki visual hierarchy yang kuat.**

Referensi pertama digunakan terutama untuk **struktur informasi, navigasi, agenda/content, dan organization**.

Referensi kedua digunakan terutama untuk **visual hierarchy, hero section, category card, product card, CTA, dan katalog/grid**.

Keduanya tidak perlu disalin secara persis. Gunakan sebagai **design reference**, lalu sesuaikan dengan kebutuhan, brand, konten, dan fungsi website yang akan dibuat.
