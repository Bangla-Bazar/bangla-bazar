import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase"; // Adjust the path to your Firebase initialization file
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function TagProductsSlider({ tag }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tagId, setTagId] = useState(null); // Store the tag ID

    useEffect(() => {
        const fetchTagId = async () => {
            try {
                const tagsSnapshot = await getDocs(collection(db, "tags"));
                const tagDoc = tagsSnapshot.docs.find((doc) => doc.data().name.toLowerCase() === tag.toLowerCase());

                if (tagDoc) {
                    setTagId(tagDoc.id); // Store the tag ID

                }
            } catch (error) {
                console.error("Error fetching tag ID:", error);
            }
        };

        fetchTagId();
    }, [tag]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!tagId) return;

            setLoading(true);
            try {
                const productsRef = collection(db, "products");
                const q = query(
                    productsRef,
                    where("tagIds", "array-contains", tagId), // Fetch using tagId
                    // orderBy("dateAdded", "desc"), // Order by newest first
                    limit(10) // Fetch only the latest 10 products
                );
                const querySnapshot = await getDocs(q);

                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (tagId) {
            fetchProducts();
        }
    }, [tagId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <p className="text-gray-600 text-lg animate-pulse">Loading products...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-10">
                <p className="text-gray-600 text-lg">No products found for &quot;{tag}&quot;.</p>
            </div>
        );
    }

    return (
        <div className="py-8 w-full flex flex-col">
            <h3 className="px-4 text-3xl font-bold text-gray-900 mb-8 text-left capitalize">
                {tag}
            </h3>
            <div className="w-full max-w-7xl mx-auto items-center"> {/* Centers Swiper inside a container */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={{ delay: 4000 }}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                    className="w-full pb-10"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="flex justify-center">
                            <div className="relative w-80 h-auto">
                                <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <ProductCard product={product} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
