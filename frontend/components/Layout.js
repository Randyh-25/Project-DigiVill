"use client";

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, description, keywords, image }) => {
  const defaultTitle = 'Desa Digital - Platform Digitalisasi Produk Desa dan UMKM';
  const defaultDescription = 'Platform terdepan untuk digitalisasi produk desa dan UMKM Indonesia. Temukan produk berkualitas langsung dari petani dan pengusaha lokal.';
  const defaultKeywords = 'desa digital, umkm, produk desa, digitalisasi, indonesia, petani, pengusaha lokal';
  const defaultImage = '/images/og-image.jpg';

  const siteTitle = title ? `${title} | Desa Digital` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords || defaultKeywords;
  const siteImage = image || defaultImage;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="author" content="Desa Digital Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Desa Digital" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Indonesian" />
        <meta name="geo.country" content="ID" />
        <meta name="geo.region" content="Indonesia" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;