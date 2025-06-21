// frontend/components/UserLayout.js
"use client";
import Header from "./Header";
import Footer from "./Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}