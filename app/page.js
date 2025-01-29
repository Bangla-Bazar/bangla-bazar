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
      <TagProductsSlider tag="Pew" />
      <TagProductsSlider tag="Fruit" />
      <TagProductsSlider tag="Bangladesh" />
      <TagProductsSlider tag="Meat" />
      <TagProductsSlider tag="Vegetable" />
      <div className="flex flex-col items-center mt-16 px-6 sm:px-12 md:px-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Our Location
        </h2>
        <div className="w-full max-w-4xl h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="400"
            className="rounded-lg"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1745%20N%20Broad%20St,%20Lansdale,%20PA%2019446+(Bangla%20Bazar%20Halal%20Meat%20&amp;%20Grocerys%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
          </iframe>
        </div>
      </div>
    </div>
  );
}
