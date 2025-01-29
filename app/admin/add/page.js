"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi"; // Import icons
import { v4 as uuidv4 } from "uuid"; // Generate unique IDs for tags

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [tags, setTags] = useState([]); // Stores fetched tags
    const [selectedTagIds, setSelectedTagIds] = useState([]); // Stores selected tag IDs
    const [newTag, setNewTag] = useState("");
    const [isTemporary, setIsTemporary] = useState(false);
    const [lastDate, setLastDate] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTags = async () => {
            const tagsSnapshot = await getDocs(collection(db, "tags"));
            const tagList = tagsSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setTags(tagList);
        };
        fetchTags();
    }, []);

    const handleAddTag = async () => {
        if (!newTag.trim()) return;

        // Check if tag already exists
        const existingTag = tags.find((tag) => tag.name === newTag.trim());
        if (existingTag) {
            setSelectedTagIds((prev) => [...prev, existingTag.id]);
            setNewTag("");
            return;
        }

        // Generate a new unique tag ID
        const newTagId = uuidv4();
        try {
            const tagRef = doc(db, "tags", newTagId);
            await setDoc(tagRef, { name: newTag.trim() });

            const newTagObj = { id: newTagId, name: newTag.trim() };
            setTags((prev) => [...prev, newTagObj]);
            setSelectedTagIds((prev) => [...prev, newTagId]);
            setNewTag("");
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAddProduct = async () => {
        if (!image) {
            setSuccessMessage("Please upload an image.");
            return;
        }

        try {
            const imageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, "products"), {
                title,
                description,
                price: parseFloat(price),
                tagIds: selectedTagIds, // Store tag IDs instead of tag names
                imageUrl,
                isTemporary,
                lastDate: isTemporary ? lastDate : null,
                dateAdded: new Date().toISOString(),
            });

            setSuccessMessage("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            setSuccessMessage("Failed to add product.");
        }
    };

    return (
        <div className="p-10 max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-2xl mt-10 border border-gray-300">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
                Add a New Product
            </h1>

            <div className="space-y-6">
                {/* Product Name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Tag Input */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add a new tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddTag}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() =>
                                    setSelectedTagIds((prev) =>
                                        prev.includes(tag.id) ? prev.filter((t) => t !== tag.id) : [...prev, tag.id]
                                    )
                                }
                                className={`px-4 py-2 rounded-lg shadow-md cursor-pointer transition ${selectedTagIds.includes(tag.id)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Input */}
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isTemporary}
                        onChange={() => setIsTemporary(!isTemporary)}
                        className="w-5 h-5"
                    />
                    <label className="text-gray-700 font-semibold">Temporary Product</label>
                </div>

                {isTemporary && (
                    <input
                        type="date"
                        value={lastDate}
                        onChange={(e) => setLastDate(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}



                {/* Image Upload with Preview */}
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition">
                        <FiUploadCloud className="text-blue-500 text-4xl mb-2" />
                        <span className="text-gray-600">Click to upload an image</span>
                        <input type="file" className="hidden" onChange={handleImageChange} />
                    </label>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-60 object-cover rounded-lg shadow-md border"
                        />
                    )}
                </div>

                {/* Description */}
                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Submit Button */}
                <button
                    onClick={handleAddProduct}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </div>

            {/* Success Message with Options */}
            {successMessage && (
                <div className="p-6 mt-6 bg-green-100 text-green-800 rounded-lg shadow-md text-center flex flex-col items-center gap-3">
                    <FiCheckCircle className="text-green-600 text-3xl" />
                    <p className="font-medium">{successMessage}</p>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            Add Another Product
                        </button>
                        <button
                            onClick={() => router.push("/admin")}
                            className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
                        >
                            Go to Admin Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
