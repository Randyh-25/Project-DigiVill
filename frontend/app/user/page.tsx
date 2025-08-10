// frontend/app/user/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserLayout from "../../components/UserLayout";
import BackButton from "../../components/BackButton";
import { Package, Building2, Plus, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";

export default function UserDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        setUserName(name || "");
        if (!token) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests/user`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setRequests(data.data || []);
                setLoading(false);
            });
    }, []);

    // Statistik sederhana
    const stats = {
        totalPengajuan: requests.length,
        diterima: requests.filter((r) => r.status === "approved").length,
        menunggu: requests.filter((r) => r.status === "pending").length,
        ditolak: requests.filter((r) => r.status === "rejected").length,
    };

    return (
        <UserLayout>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
                <BackButton />
                {/* Sambutan Personal */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Halo, selamat datang {userName} 👋</h1>
                    <p className="text-gray-600 mt-1">Ini adalah dashboard Anda. Kelola pengajuan produk dan UMKM dengan mudah.</p>
                </div>

                {/* Statistik Pengajuan */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                        <Package className="h-8 w-8 text-green-600" />
                        <div>
                            <div className="text-lg font-bold">{stats.totalPengajuan}</div>
                            <div className="text-sm text-gray-600">Total Pengajuan</div>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center space-x-3">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                        <div>
                            <div className="text-lg font-bold">{stats.diterima}</div>
                            <div className="text-sm text-gray-600">Diterima</div>
                        </div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 flex items-center space-x-3">
                        <Clock className="h-8 w-8 text-yellow-600" />
                        <div>
                            <div className="text-lg font-bold">{stats.menunggu}</div>
                            <div className="text-sm text-gray-600">Menunggu</div>
                        </div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 flex items-center space-x-3">
                        <XCircle className="h-8 w-8 text-red-600" />
                        <div>
                            <div className="text-lg font-bold">{stats.ditolak}</div>
                            <div className="text-sm text-gray-600">Ditolak</div>
                        </div>
                    </div>
                </div>

                {/* Aksi Cepat */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link href="/user/add-product" className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">
                            <Plus className="h-5 w-5" />
                            <span>Tambah Produk</span>
                        </Link>
                        <Link href="/user/add-umkm" className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                            <Plus className="h-5 w-5" />
                            <span>Tambah UMKM</span>
                        </Link>
                    </div>
                </div>

                {/* Daftar Pengajuan */}
                <h2 className="text-xl font-semibold mb-4">Status Pengajuan Produk/UMKM</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : requests.length === 0 ? (
                    <p className="text-gray-500">Belum ada pengajuan.</p>
                ) : (
                    <ul className="space-y-4">
                        {requests.map((req: any) => (
                            <li key={req._id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow transition">
                                <div>
                                    <div className="font-semibold text-lg">{req.data.name}</div>
                                    <div className="text-sm text-gray-500">{req.type.toUpperCase()}</div>
                                    {req.status === "rejected" && (
                                        <div className="mt-2 text-red-600 text-sm">
                                            Ditolak: {req.reason || "Tidak ada alasan"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${req.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                            req.status === "approved" ? "bg-green-100 text-green-700" :
                                                "bg-red-100 text-red-700"}`}>
                                        {req.status === "pending" && "Menunggu"}
                                        {req.status === "approved" && "Diterima"}
                                        {req.status === "rejected" && "Ditolak"}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </UserLayout>
    );
}