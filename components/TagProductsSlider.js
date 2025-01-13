import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // Adjust the path to your Firebase initialization file
import ProductCard from "./ProductCard";

export default function TagProductsSlider({ tag }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Query Firestore for products with the given tag
                const productsRef = collection(db, "products");
                const q = query(productsRef, where("tags", "array-contains", tag));
                const querySnapshot = await getDocs(q);

                // Map the results into an array of products
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [tag]);

    if (loading) {
        return <p className="text-gray-600">Loading products...</p>;
    }

    if (products.length === 0) {
        return
    }

    return (
        <div className="relative overflow-hidden py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{tag}</h2>
            <div className="flex gap-4 animate-slide whitespace-nowrap">
                {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-80">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
