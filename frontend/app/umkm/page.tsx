"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2,
  ChevronDown,
  X,
  Loader2,
  Phone,
  Mail,
  Users,
  Calendar,
  ExternalLink,
  Instagram,
  Facebook,
  Globe
} from 'lucide-react';

export default function UMKM() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [categories, setCategories] = useState([]);
  const [villages, setVillages] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9
  });

  useEffect(() => {
    fetchUMKM();
    fetchCategories();
  }, [searchTerm, selectedCategory, selectedVillage, pagination.currentPage]);

  const fetchUMKM = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.itemsPerPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedVillage && { village: selectedVillage })
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setUmkmList(data.data);
        setPagination(data.pagination);
        
        // Extract unique villages from UMKM
        const uniqueVillages = [...new Set(data.data.map(umkm => umkm.village))];
        setVillages(uniqueVillages);
      }
    } catch (error) {
      console.error('Error fetching UMKM:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchUMKM();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedVillage('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Kuliner': 'bg-red-100 text-red-800',
      'Fashion': 'bg-pink-100 text-pink-800',
      'Kerajinan': 'bg-purple-100 text-purple-800',
      'Jasa': 'bg-blue-100 text-blue-800',
      'Teknologi': 'bg-indigo-100 text-indigo-800',
      'Perdagangan': 'bg-green-100 text-green-800',
      'Lainnya': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Lainnya'];
  };

  const UMKMCard = ({ umkm }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {!imageError ? (
            <Image
              src={umkm.logo}
              alt={umkm.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">{umkm.name}</p>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(umkm.category)}`}>
              {umkm.category}
            </span>
          </div>
          
          {/* Verified Badge */}
          {umkm.isVerified && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terverifikasi
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* UMKM Name */}
          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
            {umkm.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {umkm.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{umkm.village}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{umkm.employeeCount} karyawan</span>
            </div>

            {umkm.establishedYear && (
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Didirikan {umkm.establishedYear}</span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{umkm.contact.name}</span>
            </div>
          </div>

          {/* Social Media */}
          {(umkm.socialMedia?.instagram || umkm.socialMedia?.facebook || umkm.socialMedia?.website) && (
            <div className="flex items-center space-x-2 mb-4">
              {umkm.socialMedia.instagram && (
                <a
                  href={`https://instagram.com/${umkm.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {umkm.socialMedia.facebook && (
                <a
                  href={`https://facebook.com/${umkm.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {umkm.socialMedia.website && (
                <a
                  href={umkm.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Hubungi</span>
            </button>
            <Link
              href={`/umkm/${umkm._id}`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Detail</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      title="UMKM Desa"
      description="Temukan berbagai UMKM berkualitas dari berbagai desa di Indonesia"
      keywords="umkm, usaha mikro, usaha kecil, bisnis lokal, desa"
    >
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              UMKM Unggulan Desa Galih Lunik
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Jelajahi ribuan UMKM berkualitas yang telah berkembang dan memberikan dampak positif bagi masyarakat desa
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari UMKM, kategori, atau desa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Village Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desa
                  </label>
                  <select
                    value={selectedVillage}
                    onChange={(e) => setSelectedVillage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Semua Desa</option>
                    {villages.map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center space-x-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                    <span>Hapus Filter</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">
                {loading ? 'Memuat...' : `Menampilkan ${umkmList.length} dari ${pagination.totalItems} UMKM`}
              </span>
            </div>
            
            {(searchTerm || selectedCategory || selectedVillage) && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Filter aktif:</span>
                {searchTerm && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    "{searchTerm}"
                  </span>
                )}
                {selectedCategory && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {selectedCategory}
                  </span>
                )}
                {selectedVillage && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {selectedVillage}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* UMKM Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Memuat UMKM...</span>
            </div>
          ) : umkmList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umkmList.map((umkm) => (
                  <UMKMCard key={umkm._id} umkm={umkm} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-lg ${
                          pagination.currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada UMKM ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter yang Anda gunakan
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Hapus Semua Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}