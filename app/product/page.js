"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";

export default function Product() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [tags, setTags] = useState({}); // Stores tag ID -> Name mapping
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState("default"); // Sorting option
    const productsPerPage = 25;
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    // Fetch tags from Firestore and store as a map { tagId: tagName }
    useEffect(() => {
        const fetchTags = async () => {
            const tagsSnapshot = await getDocs(collection(db, "tags"));
            const tagMap = {};
            tagsSnapshot.docs.forEach((doc) => {
                tagMap[doc.id] = doc.data().name;
            });
            setTags(tagMap);
        };
        fetchTags();
    }, []);

    // Fetch initial products from Firebase
    useEffect(() => {
        const fetchInitialProducts = async () => {
            setIsLoading(true);
            const initialQuery = query(
                collection(db, "products"),
                limit(productsPerPage)
            );
            const querySnapshot = await getDocs(initialQuery);

            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setProducts(productsData);
            setAllProducts(productsData);
            setFilteredProducts(productsData);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Save the last document
            setIsLoading(false);
        };
        fetchInitialProducts();
    }, []);

    // Fetch more products when "More" button is clicked
    const fetchMoreProducts = async () => {
        if (!lastVisible) return;

        setIsLoading(true);
        const nextQuery = query(
            collection(db, "products"),
            startAfter(lastVisible),
            limit(productsPerPage)
        );
        const querySnapshot = await getDocs(nextQuery);

        const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setProducts((prev) => [...prev, ...productsData]);
        setAllProducts((prev) => [...prev, ...productsData]);
        setFilteredProducts((prev) => [...prev, ...productsData]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update the last document
        setIsLoading(false);
    };

    // Handle search
    useEffect(() => {
        if (search) {
            const lowercasedQuery = search.toLowerCase();
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(lowercasedQuery) ||
                (product.tagIds &&
                    product.tagIds.some((tagId) =>
                        tags[tagId]?.toLowerCase().includes(lowercasedQuery)
                    ))
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [search, products, tags]);

    // Handle sorting
    useEffect(() => {
        const sortedProducts = [...filteredProducts];

        if (sortOption === "name-asc") {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "name-desc") {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
        setFilteredProducts(sortedProducts);
    }, [sortOption]);

    return (
        <div className="p-4">
            {/* Search Bar */}
            <SearchBar
                placeholder="Search for products..."
                onSearch={(query) =>
                    router.push(`/product?search=${encodeURIComponent(query)}`)
                }
            />

            <Categories />

            {/* Sorting Options */}
            <div className="flex justify-end mb-4">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 border rounded mr-4 mt-2"
                >
                    <option value="default">Default</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {filteredProducts.length === 0 && !isLoading ? (
                    <p className="text-center col-span-5">No Matching Product Found</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={{ ...product, tags: product.tagIds?.map(id => tags[id]) }} />
                    ))
                )}
            </div>

            {isLoading && <p className="text-center mt-4">Loading...</p>}

            {/* More Button */}
            {!isLoading && lastVisible && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={fetchMoreProducts}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        More
                    </button>
                </div>
            )}
        </div>
    );
}
