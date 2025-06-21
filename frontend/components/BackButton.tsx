"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  className = "",
  label = "Kembali"
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className={`flex items-center text-gray-600 hover:text-green-700 mb-6 ${className}`}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      {label}
    </button>
  );
}