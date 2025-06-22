// frontend/app/admin/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "../../../components/BackButton";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, name }),
            }
        );
        const data = await res.json();
        if (data.success) {
            setSuccess("Registrasi berhasil! Silakan login.");
            setTimeout(() => router.push("/admin/login"), 1500);
        } else {
            setError(data.message || "Registrasi gagal");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <BackButton />
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-center">{error}</div>
                )}
                {success && (
                    <div className="mb-4 text-green-600 text-center">{success}</div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Nama Lengkap</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                    Register
                </button>
                <div className="mt-4 text-center">
                    <Link
                        href="/admin/login"
                        className="text-green-600 hover:text-green-800 text-sm"
                    >
                        Sudah punya akun? Login sekarang
                    </Link>
                </div>
            </form>
        </div>
    );
}