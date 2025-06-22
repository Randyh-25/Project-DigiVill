"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import {
  Package,
  Upload,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    harvestSeason: "",
    price: "",
    unit: "",
    village: "",
    contact: {
      name: "",
      phone: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Pertanian",
    "Perkebunan",
    "Perikanan",
    "Peternakan",
    "Kerajinan",
    "Makanan",
    "Lainnya",
  ];

  const harvestSeasons = ["Musim Hujan", "Musim Kemarau", "Sepanjang Tahun"];

  const units = ["kg", "gram", "liter", "pcs", "pack", "dozen"];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data.data);
        setLoading(false);
      });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    if (!formData.category) newErrors.category = "Kategori wajib dipilih";
    if (!formData.harvestSeason) newErrors.harvestSeason = "Musim panen wajib dipilih";
    if (!formData.price || formData.price <= 0) newErrors.price = "Harga harus lebih dari 0";
    if (!formData.unit) newErrors.unit = "Satuan wajib dipilih";
    if (!formData.village.trim()) newErrors.village = "Nama desa wajib diisi";
    if (!formData.contact.name.trim()) newErrors.contactName = "Nama kontak wajib diisi";
    if (!formData.contact.phone.trim()) newErrors.contactPhone = "Nomor telepon wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        setError(data.message || "Terjadi kesalahan saat menyimpan produk");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Terjadi kesalahan saat menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout title="Produk Berhasil Diperbarui">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h2>
            <p className="text-gray-600 mb-4">
              Produk "{formData.name}" berhasil diperbarui.
            </p>
            <p className="text-sm text-gray-500">
              Anda akan diarahkan ke dashboard dalam beberapa detik...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Edit Produk"
      description="Perbarui informasi produk desa yang sudah terdaftar"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Produk</h1>
                <p className="text-gray-600 mt-1">
                  Perbarui informasi produk desa yang sudah terdaftar
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informasi Dasar
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Contoh: Beras Organik Premium"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.category ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.description ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Deskripsikan produk Anda dengan detail..."
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Gambar
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opsional: Masukkan URL gambar produk dari internet
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Musim Panen *
                    </label>
                    <select
                      name="harvestSeason"
                      value={formData.harvestSeason}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.harvestSeason ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih Musim Panen</option>
                      {harvestSeasons.map((season) => (
                        <option key={season} value={season}>
                          {season}
                        </option>
                      ))}
                    </select>
                    {errors.harvestSeason && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.harvestSeason}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Location */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Harga & Lokasi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="100"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.price ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="15000"
                    />
                    {errors.price && (
                      <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Satuan *
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.unit ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih Satuan</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                    {errors.unit && (
                      <p className="text-red-600 text-sm mt-1">{errors.unit}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Desa *
                    </label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.village ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Contoh: Desa Sukamaju"
                    />
                    {errors.village && (
                      <p className="text-red-600 text-sm mt-1">{errors.village}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Informasi Kontak
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Kontak *
                    </label>
                    <input
                      type="text"
                      name="contact.name"
                      value={formData.contact.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.contactName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Contoh: Pak Slamet"
                    />
                    {errors.contactName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.contactPhone ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="08123456789"
                    />
                    {errors.contactPhone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}