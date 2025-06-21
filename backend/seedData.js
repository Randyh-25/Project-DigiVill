const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const UMKM = require('./models/UMKM');
const connectDB = require('./config/db');

// Sample data
const sampleProducts = [
  {
    name: 'Beras Organik Premium',
    description: 'Beras organik berkualitas tinggi dari sawah tradisional tanpa pestisida',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    category: 'Pertanian',
    harvestSeason: 'Musim Kemarau',
    price: 15000,
    unit: 'kg',
    village: 'Desa Sukamaju',
    contact: {
      name: 'Pak Slamet',
      phone: '08123456789'
    }
  },
  {
    name: 'Kopi Arabika Gayo',
    description: 'Kopi arabika premium dari dataran tinggi Gayo dengan cita rasa yang khas',
    image: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg',
    category: 'Perkebunan',
    harvestSeason: 'Musim Kemarau',
    price: 45000,
    unit: 'kg',
    village: 'Desa Takengon',
    contact: {
      name: 'Pak Ahmad',
      phone: '08234567890'
    }
  },
  {
    name: 'Madu Hutan Asli',
    description: 'Madu murni dari lebah hutan tanpa campuran, kaya akan nutrisi',
    image: 'https://images.pexels.com/photos/1474916/pexels-photo-1474916.jpeg',
    category: 'Peternakan',
    harvestSeason: 'Sepanjang Tahun',
    price: 80000,
    unit: 'liter',
    village: 'Desa Hutan Jaya',
    contact: {
      name: 'Bu Sari',
      phone: '08345678901'
    }
  },
  {
    name: 'Keripik Singkong',
    description: 'Keripik singkong renyah dengan berbagai varian rasa tradisional',
    image: 'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg',
    category: 'Makanan',
    harvestSeason: 'Sepanjang Tahun',
    price: 25000,
    unit: 'pack',
    village: 'Desa Makmur',
    contact: {
      name: 'Bu Lestari',
      phone: '08456789012'
    }
  },
  {
    name: 'Anyaman Bambu',
    description: 'Kerajinan anyaman bambu berkualitas tinggi untuk berbagai keperluan',
    image: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg',
    category: 'Kerajinan',
    harvestSeason: 'Sepanjang Tahun',
    price: 35000,
    unit: 'pcs',
    village: 'Desa Bambu Indah',
    contact: {
      name: 'Pak Bambang',
      phone: '08567890123'
    }
  }
];

const sampleUMKM = [
  {
    name: 'Warung Makan Sederhana',
    description: 'Warung makan keluarga yang menyajikan masakan tradisional dengan cita rasa autentik dan harga terjangkau',
    logo: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    category: 'Kuliner',
    village: 'Desa Sukamaju',
    establishedYear: 2015,
    employeeCount: 5,
    contact: {
      name: 'Bu Rina',
      phone: '08123456789',
      email: 'warungsederhana@gmail.com',
      address: 'Jl. Raya Desa No. 15, Sukamaju'
    },
    socialMedia: {
      instagram: '@warungsederhana',
      whatsapp: '08123456789'
    }
  },
  {
    name: 'Konveksi Maju Jaya',
    description: 'Usaha konveksi yang memproduksi pakaian berkualitas dengan desain modern dan harga kompetitif',
    logo: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    category: 'Fashion',
    village: 'Desa Makmur',
    establishedYear: 2018,
    employeeCount: 12,
    contact: {
      name: 'Pak Joko',
      phone: '08234567890',
      email: 'konveksimajujaya@gmail.com',
      address: 'Jl. Industri No. 25, Makmur'
    },
    socialMedia: {
      instagram: '@konveksimajujaya',
      facebook: 'Konveksi Maju Jaya'
    }
  },
  {
    name: 'Kerajinan Tangan Kreatif',
    description: 'Pengrajin lokal yang membuat berbagai kerajinan tangan unik dari bahan-bahan alami',
    logo: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    category: 'Kerajinan',
    village: 'Desa Bambu Indah',
    establishedYear: 2020,
    employeeCount: 8,
    contact: {
      name: 'Bu Dewi',
      phone: '08345678901',
      email: 'kerajinantangankreatif@gmail.com',
      address: 'Jl. Kerajinan No. 10, Bambu Indah'
    },
    socialMedia: {
      instagram: '@kerajinantangankreatif',
      whatsapp: '08345678901'
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await UMKM.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Insert sample UMKM with product references
    const umkmWithProducts = sampleUMKM.map((umkm, index) => ({
      ...umkm,
      products: [createdProducts[index]?._id].filter(Boolean)
    }));

    const createdUMKM = await UMKM.insertMany(umkmWithProducts);
    console.log(`✅ Created ${createdUMKM.length} UMKM entries`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();