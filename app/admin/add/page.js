"use client"; // Add this line to make the file a client component

import { useState } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const handleAddProduct = async () => {
        if (!image) {
            alert("Please upload an image");
            return;
        }

        try {
            // Upload the image to Firebase Storage
            const imageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            // Add the product to Firestore
            await addDoc(collection(db, "products"), {
                title,
                description,
                price: parseFloat(price),
                imageUrl,
            });

            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}
