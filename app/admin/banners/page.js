"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function AddBanner() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expiry, setExpiry] = useState("");
    const [image, setImage] = useState(null);
    const [discountType, setDiscountType] = useState("percentage"); // "percentage" or "sale"
    const [discount, setDiscount] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch banners from Firestore
    useEffect(() => {
        async function fetchBanners() {
            const bannersCollection = collection(db, "banners");
            const bannerSnapshot = await getDocs(bannersCollection);
            const bannerList = bannerSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBanners(bannerList);
        }
        fetchBanners();
    }, []);

    // Handle adding a new banner
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !title || !description || !expiry || !originalPrice) {
            alert("All fields are required!");
            return;
        }
        if (banners.length >= 5) {
            alert("Only 5 banners are allowed at a time.");
            return;
        }

        let finalSalePrice = salePrice;

        if (discountType === "percentage") {
            if (!discount) {
                alert("Please enter a discount percentage.");
                return;
            }
            finalSalePrice = (originalPrice - (originalPrice * discount) / 100).toFixed(2);
        }

        setLoading(true);

        try {
            // Upload image to Firebase Storage
            const storageRef = ref(storage, `banners/${image.name}`);
            await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(storageRef);

            // Save banner metadata to Firestore
            const docRef = await addDoc(collection(db, "banners"), {
                title,
                description,
                expiry,
                discountType,
                discount: discount || "",
                originalPrice,
                salePrice: finalSalePrice,
                image: imageUrl,
            });

            // Update UI instantly
            setBanners([
                ...banners,
                {
                    id: docRef.id,
                    title,
                    description,
                    expiry,
                    discountType,
                    discount: discount || "",
                    originalPrice,
                    salePrice: finalSalePrice,
                    image: imageUrl,
                },
            ]);

            // Reset form
            setTitle("");
            setDescription("");
            setExpiry("");
            setDiscount("");
            setOriginalPrice("");
            setSalePrice("");
            setImage(null);
        } catch (error) {
            console.error("Error adding banner:", error);
            alert("Failed to add banner.");
        }

        setLoading(false);
    };

    // Handle deleting a banner
    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteDoc(doc(db, "banners", id));
                setBanners(banners.filter((banner) => banner.id !== id));
            } catch (error) {
                console.error("Error deleting banner:", error);
                alert("Failed to delete banner.");
            }
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Special Banners</h2>

            {/* Banner List Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Existing Banners */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Current Banners ({banners.length}/5)</h3>
                    <div className="space-y-4">
                        {banners.map((banner) => (
                            <div key={banner.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center space-x-4">
                                    <Image src={banner.image} alt={banner.title} width={60} height={60} className="rounded-lg" />
                                    <div>
                                        <p className="font-semibold">{banner.title}</p>
                                        {banner.discountType === "percentage" ? (
                                            <p className="text-sm text-gray-500">{banner.discount}% off</p>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Sale: ${banner.salePrice} (was ${banner.originalPrice})
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-400">Expires: {banner.expiry}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        {banners.length === 0 && <p className="text-gray-500">No banners added yet.</p>}
                    </div>
                </div>

                {/* Add New Banner Form */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add a New Banner</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Banner Name"
                            className="p-2 border rounded w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Short Description"
                            className="p-2 border rounded w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="date"
                            className="p-2 border rounded w-full"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Original Price"
                            className="p-2 border rounded w-full"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                        />
                        <select
                            className="p-2 border rounded w-full"
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                        >
                            <option value="percentage">Discount Percentage</option>
                            <option value="sale">Sale Price</option>
                        </select>
                        {discountType === "percentage" ? (
                            <input
                                type="number"
                                placeholder="Discount Percentage"
                                className="p-2 border rounded w-full"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        ) : (
                            <input
                                type="number"
                                placeholder="Sale Price"
                                className="p-2 border rounded w-full"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                            />
                        )}
                        <input
                            type="file"
                            className="p-2 border rounded w-full"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                            {loading ? "Uploading..." : "Add Banner"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
