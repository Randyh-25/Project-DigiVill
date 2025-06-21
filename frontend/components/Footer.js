"use client";

import Link from 'next/link';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Cara Kerja', href: '/how-it-works' },
      { name: 'Syarat & Ketentuan', href: '/terms' },
      { name: 'Kebijakan Privasi', href: '/privacy' },
    ],
    produk: [
      { name: 'Semua Produk', href: '/products' },
      { name: 'Produk Pertanian', href: '/products?category=Pertanian' },
      { name: 'Produk Kerajinan', href: '/products?category=Kerajinan' },
      { name: 'Makanan Lokal', href: '/products?category=Makanan' },
    ],
    umkm: [
      { name: 'Daftar UMKM', href: '/umkm' },
      { name: 'Bergabung sebagai UMKM', href: '/umkm/register' },
      { name: 'Panduan UMKM', href: '/umkm/guide' },
      { name: 'Success Stories', href: '/umkm/stories' },
    ],
    bantuan: [
      { name: 'Pusat Bantuan', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Hubungi Kami', href: '/contact' },
      { name: 'Laporan Bug', href: '/report-bug' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/desadigital' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/desadigital' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/desadigital' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/desadigital' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Desa Digital</h3>
                <p className="text-sm text-gray-400">Digitalisasi Produk Desa</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Platform terdepan untuk digitalisasi produk desa dan UMKM Indonesia. 
              Menghubungkan petani dan pengusaha lokal dengan pasar yang lebih luas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@desadigital.id</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+62 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.produk.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* UMKM Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">UMKM</h4>
            <ul className="space-y-2">
              {footerLinks.umkm.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Dapatkan update terbaru tentang produk desa dan UMKM langsung di inbox Anda.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-r-lg transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-gray-300 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Desa Digital. Dibuat dengan</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>untuk Indonesia</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;