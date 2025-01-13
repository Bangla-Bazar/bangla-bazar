"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const router = useRouter();

  const handleSearchRedirect = (query) => {
    if (query.trim()) {
      router.push(`/product?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Bangla Bazar</h1>
      <SearchBar
        placeholder="Search for products..."
        onRedirect={handleSearchRedirect}
      />
    </div>
  );
}
