

"use client";

import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import {
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProduct({ params }) {
    const { id } = use(params); // Unwrap the promise for `params`

    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [isTemporary, setIsTemporary] = useState(false);
    const [lastDate, setLastDate] = useState("");
    const [message, setMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchProductAndTags = async () => {
            // Fetch product
            if (id) {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                    setImageUrl(data.imageUrl);
                    setSelectedTags(data.tags || []);
                    setIsTemporary(data.isTemporary || false);
                    setLastDate(data.lastDate || "");
                }
            }

            // Fetch all available tags
            const tagsSnapshot = await getDocs(collection(db, "tags"));
            setAllTags(tagsSnapshot.docs.map((doc) => doc.data().name));
        };

        fetchProductAndTags();
    }, [id]);

    const handleUpdate = async () => {
        try {
            let updatedImageUrl = imageUrl;

            // Handle image upload if a new image is selected
            if (image) {
                const imageRef = ref(storage, `products/${image.name}`);
                await uploadBytes(imageRef, image);
                updatedImageUrl = await getDownloadURL(imageRef);
            }

            // Update product details
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                title,
                description,
                price: parseFloat(price),
                tags: selectedTags,
                imageUrl: updatedImageUrl,
                isTemporary,
                lastDate: isTemporary ? lastDate : null,
            });

            setMessage({ type: "success", text: "Product updated successfully!" });
            setTimeout(() => router.push("/admin"), 2000); // Redirect after 2s
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage({ type: "error", text: "Failed to update product." });
        }
    };

    const handleDelete = async () => {
        try {
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef);
            setMessage({ type: "success", text: "Product deleted successfully!" });
            setTimeout(() => router.push("/admin"), 2000); // Redirect after 2s
        } catch (error) {
            console.error("Error deleting product:", error);
            setMessage({ type: "error", text: "Failed to delete product." });
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Edit Product
            </h1>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Current Product"
                        className="w-32 h-32 object-cover rounded-lg mt-4"
                    />
                )}

                <div>
                    <div className="flex gap-3 flex-wrap">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() =>
                                    setSelectedTags((prev) =>
                                        prev.includes(tag)
                                            ? prev.filter((t) => t !== tag)
                                            : [...prev, tag]
                                    )
                                }
                                className={`px-4 py-2 rounded-lg shadow cursor-pointer ${selectedTags.includes(tag)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={isTemporary}
                            onChange={(e) => setIsTemporary(e.target.checked)}
                            className="w-5 h-5 text-blue-500 focus:ring-blue-400"
                        />
                        Temporary Product
                    </label>
                    {isTemporary && (
                        <input
                            type="date"
                            value={lastDate}
                            onChange={(e) => setLastDate(e.target.value)}
                            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleUpdate}
                        className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-red-600"
                    >
                        Delete Product
                    </button>
                </div>
                {message && (
                    <div
                        className={`text-center px-4 py-2 rounded-lg mb-4 text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}
