// "use client";

// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Image from "next/image";
// import { db } from "@/utils/firebase"; // Firebase config
// import { collection, getDocs } from "firebase/firestore";

// export default function BannerSlider() {
//     const [slides, setSlides] = useState([]);

//     useEffect(() => {
//         async function fetchBanners() {
//             const bannersCollection = collection(db, "banners");
//             const bannerSnapshot = await getDocs(bannersCollection);
//             const bannerList = bannerSnapshot.docs.map((doc) => doc.data());
//             setSlides(bannerList);
//         }

//         fetchBanners();
//     }, []);

//     return (
//         <section className="bg-gray-100 py-16 flex items-center justify-center">
//             <div className="container mx-auto">
//                 <Swiper
//                     modules={[Navigation, Pagination, Autoplay]}
//                     navigation
//                     pagination={{ clickable: true }}
//                     autoplay={{ delay: 5000 }}
//                     spaceBetween={30}
//                     loop
//                     className="rounded-lg shadow-lg"
//                 >
//                     {slides.map((slide, index) => (
//                         <SwiperSlide key={index}>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-8 rounded-lg">
//                                 <div className="col-span-2 w-full h-96 relative">
//                                     <Image
//                                         src={slide.image}
//                                         alt={slide.title}
//                                         layout="fill"
//                                         objectFit="contain"
//                                         className="rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="col-span-1 flex flex-col justify-center space-y-6 p-6">
//                                     <span className="block text-green-600 font-medium text-xl">
//                                         {slide.description}
//                                     </span>
//                                     <h3 className="text-2xl font-bold text-gray-800">
//                                         {slide.title}
//                                     </h3>
//                                     <p className="text-lg text-gray-800">
//                                         Until: <span className="font-semibold">{slide.expiry}</span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </section>
//     );
// }



"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { db } from "@/utils/firebase"; // Firebase config
import { collection, getDocs } from "firebase/firestore";

export default function BannerSlider() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        async function fetchBanners() {
            const bannersCollection = collection(db, "banners");
            const bannerSnapshot = await getDocs(bannersCollection);
            const bannerList = bannerSnapshot.docs.map((doc) => doc.data());
            setSlides(bannerList);
        }

        fetchBanners();
    }, []);

    return (
        <section className="bg-gray-100 py-10 flex items-center justify-center">
            <div className="container mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    spaceBetween={30}
                    loop
                    className="rounded-lg shadow-lg"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-lg shadow-md">
                                {/* Image Section */}
                                <div className="col-span-2 w-full h-96 relative">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-lg"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="col-span-1 flex flex-col justify-center space-y-4 p-6">
                                    <h3 className="text-3xl font-bold text-gray-800">{slide.title}</h3>
                                    <p className="text-lg text-gray-600">{slide.description}</p>
                                    <p className="text-gray-500">Expires on: <span className="font-semibold">{slide.expiry}</span></p>

                                    {/* Price Display */}
                                    {slide.discountType === "percentage" ? (
                                        <div>
                                            <p className="text-xl font-semibold text-red-500">{slide.discount}% Off</p>
                                            <p className="text-lg text-gray-800">
                                                <span className="line-through text-gray-500">${slide.originalPrice}</span>{" "}
                                                <span className="font-bold text-green-600">${slide.salePrice}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-lg text-gray-800">
                                                <span className="line-through text-gray-500">${slide.originalPrice}</span>{" "}
                                                <span className="font-bold text-green-600">${slide.salePrice}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
