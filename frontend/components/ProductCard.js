"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Tag,
  Star,
  Heart,
  ShoppingCart,
  Eye
} from 'lucide-react';

const ProductCard = ({ product, showActions = true }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pertanian': 'bg-green-100 text-green-800',
      'Perkebunan': 'bg-amber-100 text-amber-800',
      'Perikanan': 'bg-blue-100 text-blue-800',
      'Peternakan': 'bg-red-100 text-red-800',
      'Kerajinan': 'bg-purple-100 text-purple-800',
      'Makanan': 'bg-orange-100 text-orange-800',
      'Lainnya': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Lainnya'];
  };

  const getSeasonColor = (season) => {
    const colors = {
      'Musim Hujan': 'bg-blue-100 text-blue-800',
      'Musim Kemarau': 'bg-yellow-100 text-yellow-800',
      'Sepanjang Tahun': 'bg-green-100 text-green-800'
    };
    return colors[season] || colors['Sepanjang Tahun'];
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">{product.name}</p>
            </div>
          </div>
        )}
        
        {/* Overlay Actions */}
        {showActions && (
          <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <Link
              href={`/products/${product._id}`}
              className="block p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-blue-500 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name & Price */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              per {product.unit}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{product.village}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(product.harvestSeason)}`}>
              {product.harvestSeason}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{product.contact.name}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Hubungi</span>
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Pesan</span>
            </button>
          </div>
        )}
      </div>

      {/* Rating Section (Optional - for future enhancement) */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>4.8</span>
            <span>(12 ulasan)</span>
          </div>
          <span>Tersedia</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;