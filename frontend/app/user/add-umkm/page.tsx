"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserLayout from "../../../components/UserLayout";
import { Building2, Save, ArrowLeft, CheckCircle, AlertCircle, Globe } from "lucide-react";

export default function AddUserUMKM() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    category: '',
    village: '',
    establishedYear: '',
    employeeCount: '',
    contact: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '',
      website: ''
    }
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Kuliner',
    'Fashion',
    'Kerajinan',
    'Jasa',
    'Teknologi',
    'Perdagangan',
    'Lainnya'
  ];

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Nama UMKM wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!formData.category) newErrors.category = 'Kategori wajib dipilih';
    if (!formData.village.trim()) newErrors.village = 'Nama desa wajib diisi';
    if (!formData.contact.name.trim()) newErrors.contactName = 'Nama kontak wajib diisi';
    if (!formData.contact.phone.trim()) newErrors.contactPhone = 'Nomor telepon wajib diisi';
    if (!formData.contact.address.trim()) newErrors.contactAddress = 'Alamat wajib diisi';
    if (formData.contact.email && !/\S+@\S+\.\S+/.test(formData.contact.email)) {
      newErrors.contactEmail = 'Format email tidak valid';
    }
    if (formData.establishedYear && (formData.establishedYear < 1900 || formData.establishedYear > new Date().getFullYear())) {
      newErrors.establishedYear = 'Tahun berdiri tidak valid';
    }
    if (formData.employeeCount && formData.employeeCount < 1) {
      newErrors.employeeCount = 'Jumlah karyawan harus minimal 1';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value
        }
      }));
    } else if (name.startsWith('socialMedia.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append('image', file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/upload-image`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, logo: data.url }));
      } else {
        setError('Gagal upload logo');
      }
    } catch (err) {
      setError('Gagal upload logo');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadrequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "umkm",
          data: formData
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/user'), 1500);
      } else {
        setError(data.message || 'Gagal submit UMKM');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungi server');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h2>
            <p className="text-gray-600 mb-4">
              UMKM "{formData.name}" berhasil diajukan. Menunggu ACC admin.
            </p>
            <p className="text-sm text-gray-500">
              Anda akan diarahkan ke dashboard dalam beberapa detik...
            </p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
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
                <h1 className="text-2xl font-bold text-gray-900">Ajukan UMKM Baru</h1>
                <p className="text-gray-600 mt-1">Lengkapi informasi UMKM yang akan diajukan</p>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Informasi Dasar</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama UMKM *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Contoh: Warung Makan Sederhana"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Deskripsikan UMKM Anda dengan detail..."
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Logo UMKM
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.logo && (
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}${formData.logo}`} alt="Logo Preview" className="h-16 mt-2 rounded" />
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    Upload gambar logo UMKM. File akan disimpan di server.
                  </p>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.village ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Contoh: Desa Sukamaju"
                  />
                  {errors.village && <p className="text-red-600 text-sm mt-1">{errors.village}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Berdiri
                  </label>
                  <input
                    type="number"
                    name="establishedYear"
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.establishedYear ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="2020"
                  />
                  {errors.establishedYear && <p className="text-red-600 text-sm mt-1">{errors.establishedYear}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Karyawan
                  </label>
                  <input
                    type="number"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.employeeCount ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Contoh: 5"
                  />
                  {errors.employeeCount && <p className="text-red-600 text-sm mt-1">{errors.employeeCount}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Kontak</h2>
              
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contactName ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Contoh: Bu Rina"
                  />
                  {errors.contactName && <p className="text-red-600 text-sm mt-1">{errors.contactName}</p>}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contactPhone ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="08123456789"
                  />
                  {errors.contactPhone && <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contactEmail ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="email@example.com"
                  />
                  {errors.contactEmail && <p className="text-red-600 text-sm mt-1">{errors.contactEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat *
                  </label>
                  <input
                    type="text"
                    name="contact.address"
                    value={formData.contact.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contactAddress ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Jl. Raya Desa No. 15"
                  />
                  {errors.contactAddress && <p className="text-red-600 text-sm mt-1">{errors.contactAddress}</p>}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Media Sosial</h2>
                <span className="text-sm text-gray-500">(Opsional)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama Halaman Facebook"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="socialMedia.whatsapp"
                    value={formData.socialMedia.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="08123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="socialMedia.website"
                    value={formData.socialMedia.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://website.com"
                  />
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
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Ajukan UMKM</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}