"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "../../../components/BackButton";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Tambahkan state untuk notifikasi sukses
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Reset notifikasi setiap kali submit

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success && data.token) {
      // Simpan semua data ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.userId || "");
      if (data.role === "admin") {
        localStorage.setItem("admin_token", data.token);
      }

      // Tampilkan notifikasi sukses
      setSuccess("Login berhasil! Anda akan diarahkan...");

      // Arahkan ke landing page setelah 1.5 detik
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setError(
        data.message ||
          "Login gagal. Periksa kembali username dan password Anda."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <BackButton />
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-center">{success}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link
            href="/admin/register"
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Belum punya akun? Register sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}