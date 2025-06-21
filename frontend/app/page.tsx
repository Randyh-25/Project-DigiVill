"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  TrendingUp, 
  MapPin,
  Star,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredUMKM, setFeaturedUMKM] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    umkm: 0,
    villages: 0,
    users: 0
  });

  useEffect(() => {
    // Fetch featured products and UMKM
    fetchFeaturedData();
  }, []);

  const fetchFeaturedData = async () => {
    try {
      // Fetch featured products
      const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=6`);
      const productsData = await productsResponse.json();
      if (productsData.success) {
        setFeaturedProducts(productsData.data);
      }

      // Fetch featured UMKM
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm`);
      const data = await res.json();
      setFeaturedUMKM(data.data); // Pastikan ini

      // Mock stats for now
      setStats({
        products: 1250,
        umkm: 340,
        villages: 89,
        users: 2100
      });
    } catch (error) {
      console.error('Error fetching featured data:', error);
    }
  };

  const features = [
    {
      icon: Leaf,
      title: 'Produk Berkualitas',
      description: 'Produk segar langsung dari petani dan pengrajin lokal terpercaya',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Komunitas UMKM',
      description: 'Bergabung dengan ribuan UMKM yang telah berkembang bersama kami',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Pertumbuhan Bisnis',
      description: 'Platform yang membantu mengembangkan usaha dan menjangkau pasar lebih luas',
      color: 'purple'
    }
  ];

  const testimonials = [
    {
      name: 'Pak Slamet',
      role: 'Petani Beras Organik',
      village: 'Desa Sukamaju',
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
      quote: 'Sejak bergabung dengan Desa Digital, hasil panen saya jadi lebih mudah terjual dan harganya lebih bagus.',
      rating: 5
    },
    {
      name: 'Bu Sari',
      role: 'Pengusaha Keripik',
      village: 'Desa Makmur',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
      quote: 'Platform ini sangat membantu UMKM seperti saya untuk menjangkau pembeli dari berbagai daerah.',
      rating: 5
    },
    {
      name: 'Pak Joko',
      role: 'Pengrajin Bambu',
      village: 'Desa Bambu Indah',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      quote: 'Kerajinan bambu saya sekarang dikenal sampai ke kota-kota besar. Terima kasih Desa Digital!',
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-blue-600/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hasil 
                  <span className="block text-yellow-300">Produk & UMKM</span>
                  <span className="block">Desa Galih Lunik</span>
                </h1>
                <p className="text-xl lg:text-2xl text-green-100 max-w-2xl">
                  Platform digital yang menghubungkan hasil pertanian, kerajinan, dan usaha kreatif masyarakat 
                  Desa Galih Lunik dengan pasar yang lebih luas. Dukung ekonomi desa, kenali potensi lokal, dan jadilah bagian dari kemajuan Galih Lunik.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Jelajahi Produk</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href="/umkm"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Lihat UMKM</span>
                  <Users className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg"
                  alt="Produk Desa Indonesia"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">{stats.products.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Produk Terdaftar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Produk', value: stats.products, icon: Leaf, color: 'green' },
              { label: 'UMKM', value: stats.umkm, icon: Users, color: 'blue' },
              { label: 'Desa', value: stats.villages, icon: MapPin, color: 'purple' },
              { label: 'Pengguna', value: stats.users, icon: TrendingUp, color: 'orange' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.color}-100 mb-4`}>
                    <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Desa Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami berkomitmen untuk menghadirkan solusi terbaik bagi petani, pengrajin, 
              dan UMKM Indonesia dalam era digital.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${feature.color}-100 mb-6`}>
                    <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Produk Unggulan
              </h2>
              <p className="text-xl text-gray-600">
                Temukan produk berkualitas langsung dari petani dan pengrajin lokal
              </p>
            </div>
            <Link 
              href="/products"
              className="hidden md:flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link 
              href="/products"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured UMKM Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                UMKM Unggulan
              </h2>
              <p className="text-xl text-gray-600">
                Temukan UMKM terbaik dari desa-desa Indonesia
              </p>
            </div>
            <Link 
              href="/umkm"
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredUMKM.map((umkm) => (
              <div key={umkm._id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={umkm.logo}
                      alt={umkm.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{umkm.name}</h4>
                    <p className="text-sm text-gray-600">{umkm.village} • {umkm.category}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4 line-clamp-2">{umkm.description}</p>
                <Link
                  href={`/umkm/${umkm._id}`}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link 
              href="/umkm"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              <span>Lihat Semua UMKM</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cerita Sukses Mitra Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan langsung dari petani dan pengusaha yang telah merasakan manfaat bergabung dengan Desa Digital.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{testimonial.village}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Siap Bergabung dengan Desa Digital?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Mulai digitalisasi produk desa Anda hari ini dan rasakan dampak positifnya 
            untuk bisnis dan komunitas lokal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admin/add-product"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Daftarkan Produk</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/admin/add-umkm"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Daftarkan UMKM</span>
              <Users className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}