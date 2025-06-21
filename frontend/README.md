# Desa Digital Frontend

Frontend aplikasi Desa Digital yang dibangun dengan Next.js untuk digitalisasi produk desa dan UMKM Indonesia.

## 🚀 Fitur Utama

- **Homepage** dengan hero section dan featured products
- **Halaman Produk** dengan pencarian dan filter
- **Halaman UMKM** dengan informasi lengkap bisnis lokal
- **Admin Panel** untuk mengelola produk dan UMKM
- **Responsive Design** yang mobile-friendly
- **SEO Optimized** dengan meta tags dan Open Graph
- **Modern UI/UX** dengan Tailwind CSS dan shadcn/ui

## 📋 Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Backend API yang sudah berjalan

## 🛠️ Instalasi

1. **Navigasi ke direktori frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit file `.env.local` dan sesuaikan dengan konfigurasi Anda:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_NAME=Desa Digital
   NEXT_PUBLIC_APP_DESCRIPTION=Platform digitalisasi produk desa dan UMKM Indonesia
   ```

## 🏃‍♂️ Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Static Export
```bash
npm run build
npm run export
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Direktori

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── products/          # Halaman produk
│   ├── umkm/             # Halaman UMKM
│   ├── admin/            # Admin panel
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── Layout.js        # Layout wrapper
│   ├── Header.js        # Navigation header
│   ├── Footer.js        # Footer component
│   └── ProductCard.js   # Product card component
├── lib/                 # Utility functions
├── public/             # Static assets
└── styles/            # Additional styles
```

## 🎨 Komponen Utama

### Layout Components
- **Layout.js** - Wrapper utama dengan SEO dan meta tags
- **Header.js** - Navigation bar dengan menu responsif
- **Footer.js** - Footer dengan links dan informasi kontak
- **ProductCard.js** - Card component untuk menampilkan produk

### Pages
- **Homepage** - Landing page dengan hero section dan featured content
- **Products** - Halaman daftar produk dengan search dan filter
- **UMKM** - Halaman daftar UMKM dengan informasi lengkap
- **Admin Dashboard** - Panel admin untuk manajemen data
- **Add Product** - Form untuk menambah produk baru
- **Add UMKM** - Form untuk menambah UMKM baru

## 🔧 Konfigurasi

### Tailwind CSS
Aplikasi menggunakan Tailwind CSS untuk styling dengan konfigurasi custom di `tailwind.config.ts`.

### Next.js Configuration
- **Static Export** enabled untuk deployment ke hosting statis
- **Image Optimization** disabled untuk compatibility
- **ESLint** configured untuk code quality

### Environment Variables
- `NEXT_PUBLIC_API_URL` - URL backend API
- `NEXT_PUBLIC_APP_NAME` - Nama aplikasi
- `NEXT_PUBLIC_APP_DESCRIPTION` - Deskripsi aplikasi
- `NEXT_PUBLIC_GA_TRACKING_ID` - Google Analytics ID (opsional)

## 📱 Responsive Design

Aplikasi didesain mobile-first dengan breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 SEO Features

- **Meta Tags** - Title, description, keywords untuk setiap halaman
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Twitter sharing optimization
- **Structured Data** - Schema markup untuk search engines
- **Canonical URLs** - Prevent duplicate content issues

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub repository
2. Connect repository di Vercel dashboard
3. Set environment variables
4. Deploy automatically

### Netlify
1. Build aplikasi: `npm run build && npm run export`
2. Upload folder `out` ke Netlify
3. Configure redirects jika diperlukan

### Manual Hosting
1. Build static files: `npm run build && npm run export`
2. Upload folder `out` ke web server
3. Configure web server untuk SPA routing

## 🔍 API Integration

Aplikasi terintegrasi dengan backend API untuk:
- **Fetch Products** - GET /api/products
- **Fetch UMKM** - GET /api/umkm
- **Create Product** - POST /api/products
- **Create UMKM** - POST /api/umkm
- **Categories** - GET /api/products/categories, /api/umkm/categories

## 🎨 UI/UX Features

- **Loading States** - Skeleton loading dan spinners
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client-side validation dengan feedback
- **Hover Effects** - Interactive elements dengan smooth transitions
- **Micro-interactions** - Subtle animations untuk better UX

## 📊 Performance

- **Image Optimization** - Next.js Image component dengan lazy loading
- **Code Splitting** - Automatic code splitting dengan Next.js
- **Static Generation** - Pre-rendered pages untuk performance
- **Caching** - Browser caching untuk static assets

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Untuk bantuan atau pertanyaan:
- Email: info@desadigital.id
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Documentation: [Wiki](https://github.com/your-repo/wiki)