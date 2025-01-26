"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import BannerSection from "@/components/BannerSection";
import TagProductsSlider from "@/components/TagProductsSlider";
import Categories from "@/components/Categories";

export default function Home() {
  const router = useRouter();

  const handleSearchRedirect = (query) => {
    if (query.trim()) {
      router.push(`/product?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="p-4">
      <SearchBar
        placeholder="Search for products..."
        onRedirect={handleSearchRedirect}
      />
      <Categories />
      <BannerSection />
      <TagProductsSlider tag="Fresh" />
      <TagProductsSlider tag="Fruit" />
      <TagProductsSlider tag="Bangladesh" />
      <TagProductsSlider tag="Meat" />
      <TagProductsSlider tag="Vegetable" />
    </div>
  );
}
