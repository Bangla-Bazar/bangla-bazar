"use client";

import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function TimeComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        title: "",
        description: "",
        price: 0,
    });
    const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order: A-Z

    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
        }
    }, [isLoggedIn]);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            setError("");
            await fetchProducts();
        } else {
            setError("Invalid username or password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setProducts([]);
    };

    const handleRemoveProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, "products", productId));
            setProducts((prev) => prev.filter((product) => product.id !== productId));
            alert("Product removed successfully!");
        } catch (error) {
            console.error("Error removing product:", error);
            alert("Failed to remove product.");
        }
    };

    const handleEdit = (product) => {
        setEditedProduct({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        });
    };

    const handleUpdateProduct = async () => {
        if (!editedProduct.id) return;

        // Ensure price is a valid number, default to 0 if not
        const updatedPrice = !isNaN(editedProduct.price) ? parseFloat(editedProduct.price) : 0;

        try {
            await updateDoc(doc(db, "products", editedProduct.id), {
                title: editedProduct.title,
                description: editedProduct.description,
                price: updatedPrice,
            });

            setProducts((prev) =>
                prev.map((product) =>
                    product.id === editedProduct.id ? { ...product, ...editedProduct, price: updatedPrice } : product
                )
            );

            setEditedProduct({ id: null });
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };

    // Sort products based on the current sorting order
    const sortedProducts = products
        .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title); // A-Z
            } else {
                return b.title.localeCompare(a.title); // Z-A
            }
        });

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center flex-grow">
                {!isLoggedIn ? (
                    <form
                        onSubmit={handleLogin}
                        className="bg-white bg-opacity-20 p-10 rounded-xl shadow-lg w-full sm:w-96 border-2 border-opacity-10 border-white"
                    >
                        <h3 className="text-3xl font-semibold text-center text-black mb-8">Login Here</h3>
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 mt-2 bg-white rounded-md border-2 focus:ring-2"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 mt-2 bg-white rounded-md border-2 focus:ring-2"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 mt-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Log In
                        </button>
                    </form>
                ) : (
                    <div className="w-full p-4">
                        {/* Header with Welcome and Inventory Count */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-semibold text-black">Welcome, Monir!</h2>
                            <p className="text-lg text-black">
                                You have <span className="font-bold">{products.length}</span> products in inventory
                            </p>
                        </div>

                        {/* Search Bar and Sorting Toggle */}
                        <div className="flex justify-between items-center mb-6">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full sm:w-96 p-3 bg-white rounded-md border-2 focus:ring-2"
                            />
                            <button
                                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
                            </button>
                        </div>

                        {/* Product List */}
                        <h3 className="text-2xl font-semibold text-center text-black mb-6">Product List</h3>
                        {sortedProducts.length === 0 ? (
                            <p className="text-center text-gray-600">No products found</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg shadow-lg">
                                <table className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-500 to-blue-600">
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Date Added</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Image</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Title</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Description</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Price</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-white text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-opacity-30 transition-all">
                                                <td className="px-6 py-4">
                                                    {product.dateAdded ? new Date(product.dateAdded).toLocaleDateString() : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editedProduct.id === product.id ? (
                                                        <input
                                                            type="text"
                                                            value={editedProduct.title}
                                                            onChange={(e) =>
                                                                setEditedProduct({ ...editedProduct, title: e.target.value })
                                                            }
                                                            className="w-full p-2 bg-white bg-opacity-20 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-600"
                                                        />
                                                    ) : (
                                                        product.title
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editedProduct.id === product.id ? (
                                                        <input
                                                            type="text"
                                                            value={editedProduct.description}
                                                            onChange={(e) =>
                                                                setEditedProduct({ ...editedProduct, description: e.target.value })
                                                            }
                                                            className="w-full p-2 bg-white bg-opacity-20 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-600"
                                                        />
                                                    ) : (
                                                        product.description
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-bold">
                                                    {editedProduct.id === product.id ? (
                                                        <input
                                                            type="number"
                                                            value={editedProduct.price}
                                                            onChange={(e) =>
                                                                setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) || 0 })
                                                            }
                                                            className="w-full p-2 bg-white bg-opacity-20 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-600"
                                                            step="0.01"
                                                        />
                                                    ) : (
                                                        `$${product.price.toFixed(2)}`
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
    <div className="flex flex-row space-x-2">
        {editedProduct.id === product.id ? (
            <>
                <button
                    onClick={handleUpdateProduct}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Save
                </button>
                <button
                    onClick={() => setEditedProduct({ id: null })}
                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Remove
                </button>
            </>
        )}
    </div>
</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}