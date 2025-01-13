
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default function Product() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 50;
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    // Fetch all products from Firebase
    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
            setAllProducts(productsData);
            setFilteredProducts(productsData); // Initialize filteredProducts with all products
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (search) {
            const lowercasedQuery = search.toLowerCase();
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(lowercasedQuery) ||
                (product.tags &&
                    product.tags.some((tag) =>
                        tag.toLowerCase().includes(lowercasedQuery)
                    ))
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Reset to all products if no search query
        }
    }, [search, products]);


    // Paginate products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            {/* Search Bar */}
            <SearchBar
                placeholder="Search for products..."
                onSearch={(query) =>
                    router.push(`/product?search=${encodeURIComponent(query)}`)
                }
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {currentProducts.length === 0 ? (
                    <>
                        <p className="text-center col-span-5">No Matching Product Found</p>
                        {/* Render all products */}
                        {allProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </>
                ) : (
                    currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from(
                    { length: Math.ceil(filteredProducts.length / productsPerPage) },
                    (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-black"
                                }`}
                        >
                            {i + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
