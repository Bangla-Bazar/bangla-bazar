"use client"; // Add this line to make the file a client component

import { useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [isTemporary, setIsTemporary] = useState(false);
    const [lastDate, setLastDate] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tagsSnapshot = await getDocs(collection(db, "tags"));
            setAllTags(tagsSnapshot.docs.map((doc) => doc.data().name));
        };
        fetchTags();
    }, []);

    const handleAddTag = async () => {
        if (newTag.trim() && !allTags.includes(newTag.trim())) {
            try {
                await addDoc(collection(db, "tags"), { name: newTag.trim() });
                setAllTags((prev) => [...prev, newTag.trim()]);
                setSelectedTags((prev) => [...prev, newTag.trim()]);
                setNewTag("");
            } catch (error) {
                console.error("Error adding tag:", error);
            }
        }
    };

    const handleAddProduct = async () => {
        if (!image) {
            setSuccessMessage("Please upload an image");
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
                tags: selectedTags,
                imageUrl,
                isTemporary,
                lastDate: isTemporary ? lastDate : null,
                dateAdded: new Date().toISOString(),
            });

            setSuccessMessage("Product added successfully! Do you want to add another product?");
        } catch (error) {
            console.error("Error adding product:", error);
            setSuccessMessage("Failed to add product.");
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setSelectedTags([]);
        setIsTemporary(false);
        setLastDate("");
        setSuccessMessage(null);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Product</h1>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div>
                    <div className="flex gap-3 items-center mb-4">
                        <input
                            type="text"
                            placeholder="Add a new tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleAddTag}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                        >
                            Add Tag
                        </button>
                    </div>
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

                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleAddProduct}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-blue-600"
                >
                    Add Product
                </button>
            </div>

            {successMessage && (
                <div className="p-6 mt-6 bg-green-100 text-green-800 rounded-lg shadow">
                    <p className="text-center font-medium">{successMessage}</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            onClick={resetForm}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                        >
                            Add Another Product
                        </button>
                        <button
                            onClick={() => setSuccessMessage(null)}
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
                        >
                            Go to Admin Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}