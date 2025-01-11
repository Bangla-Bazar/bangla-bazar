"use client";

import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import SearchBar from "@/components/SearchBar";

export default function product() {
    const [products, setProducts] = useState([]); // Original product list
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for search

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
            setFilteredProducts(productsData); // Initialize filteredProducts with all products
        };
        fetchProducts();
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="p-4">
            <SearchBar
                placeholder="Search for products..."
                onSearch={handleSearch}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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

