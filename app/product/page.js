"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams(); // Get search parameters
    const search = searchParams.get("search"); // Extract the 'search' query parameter

    // Fetch all products from Firebase
    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
            setFilteredProducts(productsData); // Initialize filteredProducts with all products
        };
        fetchProducts();
    }, []);

    // Filter products based on the search query
    useEffect(() => {
        if (search) {
            const lowercasedQuery = search.toLowerCase();
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredProducts(filtered);
        } else {
            // If search is empty, reset to all products
            setFilteredProducts(products);
        }
    }, [search, products]);

    // Handle search input and update the query parameter
    const handleSearch = (query) => {
        router.push(`/product?search=${encodeURIComponent(query)}`);
    };

    return (
        <div className="p-4">
            {/* Search Bar */}
            <SearchBar
                placeholder="Search for products..."
                onSearch={handleSearch}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {filteredProducts.length === 0 ? (
                    <p className="text-center col-span-3">No products found.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}
