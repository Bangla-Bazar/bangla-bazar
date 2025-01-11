"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function EditProduct({ params }) {
    const { id } = params;
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                }
            }
        };
        fetchProduct();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                title,
                description,
                price: parseFloat(price),
            });
            alert("Product updated successfully!");
            router.push("/"); // Redirect to the homepage or product list page
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                const docRef = doc(db, "products", id);
                await deleteDoc(docRef);
                alert("Product deleted successfully!");
                router.push("/"); // Redirect to the homepage or product list page
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <div className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Price"
                />
                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Delete Product
                </button>
            </div>
        </div>
    );
}
