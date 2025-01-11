"use client";

import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/edit/${product.id}`);
    };

    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <div className="w-full h-48 overflow-hidden rounded bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-2 rounded bg-gray-100 center"
                />
            </div>
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-bold">${product.price.toFixed(2)}</p>
            <button
                onClick={handleEdit}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Edit
            </button>
        </div>
    );
}
