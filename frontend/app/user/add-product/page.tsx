// frontend/app/user/add-product/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserLayout from "../../../components/UserLayout";
import BackButton from "../../../components/BackButton";

export default function AddUserProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    harvestSeason: "",
    price: "",
    unit: "",
    village: "",
    contact: { name: "", phone: "" },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const categories = [
    "Pertanian",
    "Perkebunan",
    "Perikanan",
    "Peternakan",
    "Kerajinan",
    "Makanan",
    "Lainnya"
  ];

  const units = ["kg", "gram", "liter", "pcs", "pack", "dozen"];

  const harvestSeasons = ["Musim Hujan", "Musim Kemarau", "Sepanjang Tahun"];

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!formData.category) newErrors.category = "Kategori wajib dipilih";
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Harga wajib diisi dan berupa angka";
    if (!formData.unit) newErrors.unit = "Satuan wajib dipilih";
    if (!formData.village.trim()) newErrors.village = "Nama desa wajib diisi";
    if (!formData.contact.name.trim()) newErrors.contactName = "Nama kontak wajib diisi";
    if (!formData.contact.phone.trim()) newErrors.contactPhone = "Nomor kontak wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    setError("");
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ type: "product", data: formData }),
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      setTimeout(() => router.push("/user"), 1500);
    } else {
      setError(data.message || "Gagal submit");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
        <BackButton />
        <h1 className="text-2xl font-bold mb-6">Ajukan Produk Baru</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">Berhasil diajukan! Menunggu ACC admin.</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nama Produk *</label>
            <input
              type="text"
              name="name"
              className={`w-full border px-4 py-2 rounded-lg ${errors.name ? "border-red-400" : ""}`}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Kategori *</label>
            <select
              name="category"
              className={`w-full border px-4 py-2 rounded-lg ${errors.category ? "border-red-400" : ""}`}
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Deskripsi</label>
            <textarea
              name="description"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">URL Gambar</label>
            <input
              type="url"
              name="image"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Musim Panen</label>
            <select
              name="harvestSeason"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.harvestSeason}
              onChange={handleChange}
            >
              <option value="">Pilih Musim Panen</option>
              {harvestSeasons.map((season) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Harga *</label>
              <input
                type="number"
                name="price"
                className={`w-full border px-4 py-2 rounded-lg ${errors.price ? "border-red-400" : ""}`}
                value={formData.price}
                onChange={handleChange}
                required
              />
              {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Satuan *</label>
              <select
                name="unit"
                className={`w-full border px-4 py-2 rounded-lg ${errors.unit ? "border-red-400" : ""}`}
                value={formData.unit}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Satuan</option>
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              {errors.unit && <p className="text-red-600 text-sm">{errors.unit}</p>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Nama Desa *</label>
            <input
              type="text"
              name="village"
              className={`w-full border px-4 py-2 rounded-lg ${errors.village ? "border-red-400" : ""}`}
              value={formData.village}
              onChange={handleChange}
              required
            />
            {errors.village && <p className="text-red-600 text-sm">{errors.village}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Nama Kontak *</label>
            <input
              type="text"
              name="contact.name"
              className={`w-full border px-4 py-2 rounded-lg ${errors.contactName ? "border-red-400" : ""}`}
              value={formData.contact.name}
              onChange={handleChange}
              required
            />
            {errors.contactName && <p className="text-red-600 text-sm">{errors.contactName}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">No. Telepon Kontak *</label>
            <input
              type="text"
              name="contact.phone"
              className={`w-full border px-4 py-2 rounded-lg ${errors.contactPhone ? "border-red-400" : ""}`}
              value={formData.contact.phone}
              onChange={handleChange}
              required
            />
            {errors.contactPhone && <p className="text-red-600 text-sm">{errors.contactPhone}</p>}
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Ajukan Produk
          </button>
        </form>
      </div>
    </UserLayout>
  );
}