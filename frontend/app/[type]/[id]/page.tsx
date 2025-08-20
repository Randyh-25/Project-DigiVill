"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Image from "next/image";
import { Package, Building2, ArrowLeft } from "lucide-react";

export default function DetailPage() {
  const { type, id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type || !id) return;
    const endpoint =
      type === "products"
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/umkm/${id}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [type, id]);

  if (loading) {
    return (
      <Layout title="Detail">
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Detail">
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div>Data tidak ditemukan</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Detail ${type === "products" ? "Produk" : "UMKM"}`}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke halaman sebelumnya
          </button>

          <div className="grid md:grid-cols-5 gap-x-8 lg:gap-x-12">
            {/* Kolom Kiri: Gambar */}
            <div className="md:col-span-2">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg border bg-white">
                {type === "products" && data.image ? (
                  <Image
                    src={data.image}
                    alt={data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                ) : type === "umkm" && data.logo ? (
                  <Image
                    src={data.logo}
                    alt={data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100">
                    {type === "products" ? (
                      <Package className="h-16 w-16 text-gray-300" />
                    ) : (
                      <Building2 className="h-16 w-16 text-gray-300" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Detail */}
            <div className="md:col-span-3 mt-8 md:mt-0">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                {data.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-3">{data.name}</h1>
              <p className="text-lg text-gray-500 mt-1 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                {data.village}
              </p>

              <div className="mt-6 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-800">Deskripsi</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">{data.description}</p>
              </div>

              {/* Detail Spesifik */}
              <div className="mt-6">
                {type === "products" ? (
                  <div className="bg-white border rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Harga</p>
                      <p className="font-bold text-lg text-green-600">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(data.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Satuan</p>
                      <p className="font-semibold text-gray-800">{data.unit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Musim Panen</p>
                      <p className="font-semibold text-gray-800">{data.harvestSeason}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tahun Berdiri</p>
                      <p className="font-semibold text-gray-800">{data.establishedYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jumlah Karyawan</p>
                      <p className="font-semibold text-gray-800">{data.employeeCount}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="mt-8">
                <a
                  href={`https://wa.me/${data.contact?.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan ${type === 'products' ? 'produk' : 'UMKM'} ${data.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bagian Peta dan Ulasan di bawah */}
          <div className="mt-12 pt-8 border-t">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Lokasi</h2>
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe
                    src={`https://www.google.com/maps?q=${data.village}&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Rating & Ulasan</h2>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-2xl font-bold">
                    {data.rating || "N/A"} ★
                  </span>
                  <span className="ml-3 text-gray-500">
                    ({data.reviews?.length || 0} ulasan)
                  </span>
                </div>
                <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                  {data.reviews?.length > 0 ? (
                    data.reviews.map((review, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-500 font-bold">{review.rating} ★</span>
                          <span className="ml-3 font-semibold text-gray-800">{review.user}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      Belum ada ulasan untuk {data.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}