"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Package,
  Building2,
  Leaf,
  ChevronDown,
  UserCircle,
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const userMenuRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const name = localStorage.getItem("name");
      setUser(token ? { role, name } : null);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin_token");
    setUser(null);
    setShowUserMenu(false);
    setIsMenuOpen(false);
    router.replace("/");
  };

  const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Produk", href: "/products", icon: Package },
    { name: "UMKM", href: "/umkm", icon: Building2 },
  ];

  const isActive = (path) => pathname === path;

  // User dropdown menu
  const UserDropdown = ({ mobile = false }) => (
    <div
      className={`absolute ${mobile ? "left-0 mt-2" : "right-0 mt-2"} w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50`}
      ref={userMenuRef}
    >
      {user ? (
        <>
          <Link
            href={user.role === "admin" ? "/admin" : "/user"}
            className="flex items-center px-4 py-3 hover:bg-green-50 text-gray-700"
            onClick={() => {
              setShowUserMenu(false);
              setIsMenuOpen(false);
            }}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 hover:bg-red-50 text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/admin/register"
            className="flex items-center px-4 py-3 hover:bg-green-50 text-gray-700"
            onClick={() => {
              setShowUserMenu(false);
              setIsMenuOpen(false);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Register
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center px-4 py-3 hover:bg-green-50 text-gray-700"
            onClick={() => {
              setShowUserMenu(false);
              setIsMenuOpen(false);
            }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img src="/lg-gl.png" alt="Logo Desa Digital" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Galih Lunik Digital</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Hasil Panen dan UMKM Galih Lunik
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* User Icon & Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 focus:outline-none"
                aria-label="User menu"
              >
                <UserCircle className="h-7 w-7 text-green-700" />
                <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
              </button>
              {showUserMenu && <UserDropdown />}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* User Icon & Dropdown (Mobile) */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 focus:outline-none"
                  aria-label="User menu"
                >
                  <UserCircle className="h-6 w-6 text-green-700" />
                  <span className="ml-2 font-medium">
                    {user?.name ? user.name : "Akun"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                </button>
                {showUserMenu && <UserDropdown mobile />}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;