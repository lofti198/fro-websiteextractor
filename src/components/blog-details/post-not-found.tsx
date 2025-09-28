import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PostNotFound() {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}