# Desa Digital Backend API

Backend API untuk sistem digitalisasi produk desa dan UMKM (Usaha Mikro Kecil Menengah).

## 🚀 Fitur Utama

- **RESTful API** untuk manajemen produk dan UMKM
- **MongoDB Atlas** sebagai database cloud
- **Validasi data** dengan express-validator
- **Error handling** yang komprehensif
- **Rate limiting** untuk keamanan API
- **CORS** support untuk frontend integration
- **Pagination** dan filtering untuk data besar
- **Seed data** untuk testing dan development

## 📋 Prerequisites

- Node.js (v14 atau lebih tinggi)
- MongoDB Atlas account
- npm atau yarn

## 🛠️ Instalasi

1. **Clone dan navigasi ke direktori backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env` dan isi dengan konfigurasi yang sesuai:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/desa_digital?retryWrites=true&w=majority
   ```

4. **Seed database (opsional)**
   ```bash
   npm run seed
   ```

## 🏃‍♂️ Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination and filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)
- `GET /api/products/categories` - Get product categories

### UMKM
- `GET /api/umkm` - Get all UMKM (with pagination and filtering)
- `GET /api/umkm/:id` - Get single UMKM
- `POST /api/umkm` - Create new UMKM
- `PUT /api/umkm/:id` - Update UMKM
- `DELETE /api/umkm/:id` - Delete UMKM (soft delete)
- `GET /api/umkm/categories` - Get UMKM categories

### Health Check
- `GET /api/health` - API health status

## 📝 Query Parameters

### Filtering & Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `village` - Filter by village name
- `search` - Search in name and description

**Contoh:**
```
GET /api/products?page=1&limit=10&category=Pertanian&search=beras
```

## 🗂️ Struktur Data

### Product Schema
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
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### UMKM Schema
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
  products: [ObjectId],
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
    website: String
  },
  isActive: Boolean,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

- **Helmet** - Security headers
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS** - Cross-origin resource sharing
- **Data Validation** - Input validation dengan express-validator
- **Error Handling** - Comprehensive error responses

## 🚀 Deployment

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy using git

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### PM2 (Production Server)
```bash
npm install -g pm2
pm2 start index.js --name "desa-digital-api"
pm2 startup
pm2 save
```

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test products endpoint
curl http://localhost:5000/api/products
```

## 📄 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

Untuk bantuan atau pertanyaan, silakan hubungi tim development atau buat issue di repository ini.