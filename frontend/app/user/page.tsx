// frontend/app/user/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserLayout from "../../components/UserLayout";
import BackButton from "../../components/BackButton"; // tambahkan ini

export default function UserDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
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

    return (
        <UserLayout>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
                <BackButton /> {/* tambahkan ini */}
                <div className="flex justify-between items-center mb-6 mt-2">
                    <h1 className="text-2xl font-bold">Dashboard User</h1>
                    <div className="flex gap-2">
                        <Link href="/user/add-product" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Tambah Produk</Link>
                        <Link href="/user/add-umkm" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Tambah UMKM</Link>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-4">Status Pengajuan Produk/UMKM</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : requests.length === 0 ? (
                    <p className="text-gray-500">Belum ada pengajuan.</p>
                ) : (
                    <ul className="space-y-4">
                        {requests.map((req: any) => (
                            <li key={req._id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold">{req.type === "product" ? req.data.name : req.data.name}</div>
                                        <div className="text-sm text-gray-500">{req.type.toUpperCase()}</div>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${req.status === "pending" ? "bg-yellow-100 text-yellow-700" : req.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {req.status === "pending" && "Menunggu"}
                                            {req.status === "approved" && "Diterima"}
                                            {req.status === "rejected" && "Ditolak"}
                                        </span>
                                    </div>
                                </div>
                                {req.status === "rejected" && (
                                    <div className="mt-2 text-red-600 text-sm">
                                        Ditolak: {req.reason || "Tidak ada alasan"}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </UserLayout>
    );
}