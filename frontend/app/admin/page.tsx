"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { 
  BarChart3, 
  Package, 
  Building2, 
  Users, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  LogOut
} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUMKM: 0,
    totalVillages: 0,
    recentProducts: [],
    recentUMKM: []
  });
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState([]);
  const [detailRequest, setDetailRequest] = useState<any>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    if (!token) {
      router.replace("/admin/login");
    }
    // Optionally: verify token to backend here
  }, [router]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPending(data.data || []));
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=5`);
      const productsData = await productsResponse.json();
      
      // Fetch UMKM
      const umkmResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm?limit=5`);
      const umkmData = await umkmResponse.json();

      if (productsData.success && umkmData.success) {
        // Calculate unique villages
        const allVillages = [
          ...productsData.data.map(p => p.village),
          ...umkmData.data.map(u => u.village)
        ];
        const uniqueVillages = [...new Set(allVillages)];

        setStats({
          totalProducts: productsData.pagination?.totalItems || productsData.data.length,
          totalUMKM: umkmData.pagination?.totalItems || umkmData.data.length,
          totalVillages: uniqueVillages.length,
          recentProducts: productsData.data,
          recentUMKM: umkmData.data
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{trend}% dari bulan lalu</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  // Auto-logout after 3 minutes of inactivity or tab close
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("admin_token");
      router.replace("/admin/login");
    };

    // Reset timer on activity
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logout, 3 * 60 * 1000); // 3 minutes
    };

    // Events to listen for activity
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    // Logout on tab close
    const handleTabClose = () => logout();
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      window.removeEventListener("beforeunload", handleTabClose);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return (
    <Layout 
      title="Admin Dashboard"
      description="Dashboard admin untuk mengelola produk desa dan UMKM"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-gray-600 mt-1">Kelola produk desa dan UMKM dengan mudah</p>
              </div>
              <div className="flex space-x-3 items-center">
                <Link
                  href="/admin/add-product"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Produk</span>
                </Link>
                <Link
                  href="/admin/add-umkm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah UMKM</span>
                </Link>
                {/* Tambahkan tombol logout di sini */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Produk"
              value={stats.totalProducts}
              icon={Package}
              color="green"
              trend={12}
            />
            <StatCard
              title="Total UMKM"
              value={stats.totalUMKM}
              icon={Building2}
              color="blue"
              trend={8}
            />
            <StatCard
              title="Desa Terdaftar"
              value={stats.totalVillages}
              icon={Users}
              color="purple"
              trend={15}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Produk Terbaru</h2>
                  <Link
                    href="/products"
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>Lihat Semua</span>
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentProducts.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentProducts.map((product) => (
                      <div key={product._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.village} • {formatPrice(product.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 text-gray-400 hover:text-blue-600"
                            onClick={() => router.push(`/admin/edit-product/${product._id}`)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-red-600"
                            onClick={async () => {
                              if (!confirm("Yakin hapus produk ini?")) return;
                              const token = localStorage.getItem("admin_token");
                              await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              // Refresh data produk
                              setProducts((prev) => prev.filter((p) => p._id !== product._id));
                            }}
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada produk terdaftar</p>
                    <Link
                      href="/admin/add-product"
                      className="text-green-600 hover:text-green-700 font-medium text-sm mt-2 inline-block"
                    >
                      Tambah produk pertama
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent UMKM */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">UMKM Terbaru</h2>
                  <Link
                    href="/umkm"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>Lihat Semua</span>
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentUMKM.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentUMKM.map((umkm) => (
                      <div key={umkm._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{umkm.name}</h3>
                            <p className="text-sm text-gray-600">{umkm.village} • {umkm.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada UMKM terdaftar</p>
                    <Link
                      href="/admin/add-umkm"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 inline-block"
                    >
                      Tambah UMKM pertama
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/add-product"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              >
                <div className="bg-green-100 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">Tambah Produk</span>
              </Link>
              
              <Link
                href="/admin/add-umkm"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Tambah UMKM</span>
              </Link>
              
              <Link
                href="/products"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Search className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">Kelola Produk</span>
              </Link>
              
              <Link
                href="/umkm"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
              >
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Filter className="h-5 w-5 text-orange-600" />
                </div>
                <span className="font-medium text-gray-900">Kelola UMKM</span>
              </Link>
            </div>
          </div>

          {/* Pending Posts (User) */}
          <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Post (User)</h2>
            {pending.length === 0 ? (
              <p className="text-gray-500">Tidak ada post pending.</p>
            ) : (
              <ul className="space-y-4">
                {pending.map((req: any) => (
                  <li key={req._id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{req.data.name}</div>
                      <div className="text-sm text-gray-500">{req.type.toUpperCase()} oleh {req.user?.name || req.user?.username}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 mr-2"
                        onClick={() => setDetailRequest(req)}
                      >
                        Detail
                      </button>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={async () => {
                          const token = localStorage.getItem("admin_token");
                          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests/${req._id}/approve`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setPending((prev) => prev.filter((r) => r._id !== req._id));
                        }}
                      >
                        Terima
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={async () => {
                          const reason = prompt("Alasan penolakan?");
                          if (!reason) return;
                          const token = localStorage.getItem("admin_token");
                          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests/${req._id}/reject`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ reason }),
                          });
                          setPending((prev) => prev.filter((r) => r._id !== req._id));
                        }}
                      >
                        Tolak
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {detailRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setDetailRequest(null)}
              >
                <span className="text-xl">&times;</span>
              </button>
              <h3 className="text-xl font-bold mb-4">Detail Pengajuan</h3>
              <div className="space-y-2">
                <div><span className="font-semibold">Tipe:</span> {detailRequest.type}</div>
                <div><span className="font-semibold">Nama:</span> {detailRequest.data?.name}</div>
                {detailRequest.data?.description && (
                  <div><span className="font-semibold">Deskripsi:</span> {detailRequest.data.description}</div>
                )}
                {detailRequest.data?.category && (
                  <div><span className="font-semibold">Kategori:</span> {detailRequest.data.category}</div>
                )}
                {detailRequest.data?.village && (
                  <div><span className="font-semibold">Desa:</span> {detailRequest.data.village}</div>
                )}
                {detailRequest.data?.price && (
                  <div><span className="font-semibold">Harga:</span> {detailRequest.data.price}</div>
                )}
                {detailRequest.data?.unit && (
                  <div><span className="font-semibold">Satuan:</span> {detailRequest.data.unit}</div>
                )}
                {detailRequest.data?.contact?.name && (
                  <div><span className="font-semibold">Kontak:</span> {detailRequest.data.contact.name} ({detailRequest.data.contact.phone})</div>
                )}
                <div><span className="font-semibold">Diajukan oleh:</span> {detailRequest.user?.name || detailRequest.user?.username}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}