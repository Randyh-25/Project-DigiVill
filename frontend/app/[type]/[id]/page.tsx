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
    <Layout title={`Detail ${type === "product" ? "Produk" : "UMKM"}`}>
      <div className="min-h-screen bg-green-50 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Kembali
          </button>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow border mb-4 bg-gray-100 flex items-center justify-center">
              {type === "product" && data.image ? (
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              ) : type === "umkm" && data.logo ? (
                <Image
                  src={data.logo}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {type === "product" ? (
                    <Package className="h-10 w-10 text-green-400" />
                  ) : (
                    <Building2 className="h-10 w-10 text-blue-400" />
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {type === "product" ? (
                <Package className="h-7 w-7 text-green-600" />
              ) : (
                <Building2 className="h-7 w-7 text-blue-600" />
              )}
              <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            </div>
            <p className="text-gray-600 mt-1">
              {data.village} • {data.category}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">{data.description}</p>
          </div>
          {type === "product" ? (
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Harga:</span>{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.price)}
              </div>
              <div>
                <span className="font-semibold">Satuan:</span> {data.unit}
              </div>
              <div>
                <span className="font-semibold">Musim Panen:</span> {data.harvestSeason}
              </div>
              <div>
                <span className="font-semibold">Kontak:</span> {data.contact?.name} ({data.contact?.phone})
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Tahun Berdiri:</span> {data.establishedYear}
              </div>
              <div>
                <span className="font-semibold">Jumlah Karyawan:</span> {data.employeeCount}
              </div>
              <div>
                <span className="font-semibold">Kontak:</span> {data.contact?.name} ({data.contact?.phone})
              </div>
              <div>
                <span className="font-semibold">Sosial Media:</span>{" "}
                {data.socialMedia?.instagram && (
                  <a
                    href={
                      data.socialMedia.instagram.startsWith("http")
                        ? data.socialMedia.instagram
                        : `https://instagram.com/${data.socialMedia.instagram.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}