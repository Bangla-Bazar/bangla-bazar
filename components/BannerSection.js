"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function BannerSlider() {
    const slides = [
        {
            image: "/image.png",
            title: "SALE",
            description: "100% natural",
            expiry: "31st Dec, 2025",
        },
        {
            image: "/image2.png",
            title: "Fruits & Vegetables",
            description: "20% off",
            expiry: "15th Jan, 2026",
        },
        {
            image: "/image.png",
            title: "Baked Products",
            description: "15% off",
            expiry: "10th Feb, 2026",
        },
    ];

    return (
        <section className="bg-gray-100 py-16 flex items-center justify-center">
            <div className="container mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    spaceBetween={30}
                    loop
                    className="rounded-lg shadow-md"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-100 p-8 rounded-lg">
                                {/* Image Section */}
                                <div className="col-span-2 w-full h-96 relative">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="col-span-1 flex flex-col justify-center space-y-6 p-6">
                                    <span className="block text-green-600 font-medium text-xl">
                                        {slide.description}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {slide.title}
                                    </h3>
                                    <p className="text-lg text-gray-800">
                                        Until:{" "}
                                        <span className="font-semibold">{slide.expiry}</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}


