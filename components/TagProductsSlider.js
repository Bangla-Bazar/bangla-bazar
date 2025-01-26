import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // Adjust the path to your Firebase initialization file
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TagProductsSlider({ tag }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsRef = collection(db, "products");
                const q = query(productsRef, where("tags", "array-contains", tag));
                const querySnapshot = await getDocs(q);

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
        return <p className="text-gray-600">No products found for &quot;{tag}&quot;.</p>;
    }

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{tag}</h2>
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                centeredSlides={false} // Ensures it starts from the left
                grabCursor={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="flex justify-center">
                        <div className="w-80 h-96 bg-white rounded-lg overflow-hidden">
                            <ProductCard product={product} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
