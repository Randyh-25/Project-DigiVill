# Desa Digital - Platform Digitalisasi Produk Desa dan UMKM

Platform terdepan untuk digitalisasi produk desa dan UMKM Indonesia. Menghubungkan petani dan pengusaha lokal dengan pasar yang lebih luas melalui teknologi modern.

## 🌟 Overview

Desa Digital adalah solusi komprehensif yang memungkinkan digitalisasi produk-produk berkualitas dari desa-desa di Indonesia. Platform ini menghubungkan petani, pengrajin, dan UMKM lokal dengan konsumen di seluruh Indonesia, membantu meningkatkan ekonomi desa dan melestarikan produk lokal.

## 🚀 Fitur Utama

### Frontend (Next.js)
- **Homepage Modern** dengan hero section dan featured products
- **Katalog Produk** dengan pencarian dan filter canggih
- **Directory UMKM** dengan profil lengkap bisnis lokal
- **Admin Dashboard** untuk manajemen data
- **Responsive Design** yang mobile-friendly
- **SEO Optimized** untuk visibilitas maksimal

### Backend (Node.js + Express)
- **RESTful API** yang scalable dan secure
- **MongoDB Atlas** untuk database cloud
- **Authentication & Authorization** 
- **Data Validation** yang komprehensif
- **Error Handling** yang robust
- **Rate Limiting** untuk keamanan

## 🏗️ Arsitektur Sistem

```
desa-digital/
├── backend/                 # Node.js + Express API
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── config/            # Database configuration
│   └── middleware/        # Custom middleware
├── frontend/              # Next.js React App
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   └── public/          # Static assets
└── README.md            # Documentation
```

## 📋 Prerequisites

- **Node.js** (v14 atau lebih tinggi)
- **MongoDB Atlas** account
- **npm** atau **yarn**
- **Git** untuk version control

## 🛠️ Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/desa-digital.git
cd desa-digital
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi MongoDB Atlas Anda
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local dengan URL backend API
npm run dev
```

### 4. Seed Database (Opsional)
```bash
cd backend
npm run seed
```

## 🗝️ Pengaturan Environment

### Backend: `.env`

1. **Salin file contoh:**
   ```bash
   cp .env.example .env
   ```
2. **Edit file `.env`** di folder `backend` dan isi dengan konfigurasi MongoDB Atlas Anda:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/desa_digital
   ```
   > **Catatan:** Proyek ini menggunakan **MongoDB** sebagai database utama. Pastikan Anda sudah memiliki akun dan cluster di MongoDB Atlas.

---

### Frontend: `.env.local` dan `next-env.d.ts`

1. **Salin file contoh:**
   ```bash
   cp .env.local.example .env.local
   ```
2. **Edit file `.env.local`** di folder `frontend` dan sesuaikan URL API backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_NAME=Desa Digital
   NEXT_PUBLIC_APP_DESCRIPTION=Platform digitalisasi produk desa dan UMKM Indonesia
   ```

3. **Pastikan file `next-env.d.ts` ada di folder `frontend`** (buat jika belum ada):
   ```typescript
   // frontend/next-env.d.ts
   /// <reference types="next" />
   /// <reference types="next/types/global" />
   /// <reference types="next/image-types/global" />

   // CATATAN: File ini tidak perlu diedit
   ```

---

> **Penting:** Semua konfigurasi environment harus diisi dengan benar agar aplikasi berjalan optimal. Database yang digunakan adalah **MongoDB**.

## 🚀 Menjalankan Aplikasi

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Production Mode
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

Akses aplikasi di:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📚 API Documentation

### Products Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### UMKM Endpoints
- `GET /api/umkm` - Get all UMKM
- `GET /api/umkm/:id` - Get single UMKM
- `POST /api/umkm` - Create new UMKM
- `PUT /api/umkm/:id` - Update UMKM
- `DELETE /api/umkm/:id` - Delete UMKM

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `village` - Filter by village
- `search` - Search in name and description

## 🗄️ Database Schema

### Product Model
```javascript
{
  name: String,
  description: String,
  image: String,
  category: String,
  harvestSeason: String,
  price: Number,
  unit: String,
  village: String,
  contact: {
    name: String,
    phone: String
  }
}
```

### UMKM Model
```javascript
{
  name: String,
  description: String,
  logo: String,
  category: String,
  village: String,
  establishedYear: Number,
  employeeCount: Number,
  contact: {
    name: String,
    phone: String,
    email: String,
    address: String
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
    website: String
  }
}
```

## 🎨 Tech Stack

### Frontend
- **Next.js 13** - React framework dengan App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Deployment

### Frontend (Vercel)
1. Push ke GitHub repository
2. Connect repository di Vercel
3. Set environment variables
4. Deploy otomatis

### Backend (Railway/Heroku)
1. Create new project
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster di MongoDB Atlas
2. Setup database user dan network access
3. Get connection string
4. Update environment variables

## 📊 Features Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Search and filtering
- ✅ Responsive design
- ✅ Admin panel

### Phase 2 (Planned)
- 🔄 User authentication
- 🔄 Payment integration
- 🔄 Order management
- 🔄 Real-time notifications

### Phase 3 (Future)
- 📋 Mobile app (React Native)
- 📋 Advanced analytics
- 📋 Multi-language support
- 📋 AI-powered recommendations

## 🧪 Testing

```bash
# Backend testing
cd backend
npm test

# Frontend testing
cd frontend
npm run lint
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

**Desa Digital** - Membangun Indonesia melalui digitalisasi produk desa dan pemberdayaan UMKM