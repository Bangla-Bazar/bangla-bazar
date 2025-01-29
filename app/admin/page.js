"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for redirection
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Firebase authentication
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase"; // Firebase Firestore

export default function Admin() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order: A-Z

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                fetchProducts(); // Fetch products only if logged in
            } else {
                setIsLoggedIn(false);
                setUser(null);
                router.push("/login"); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
    }, [router]); // Depend on router for redirecting

    const [message, setMessage] = useState(null); // State for notifications

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
            setMessage({ type: "success", text: "Products loaded successfully!" });
        } catch (error) {
            console.error("Error fetching products:", error);
            setMessage({ type: "error", text: "Failed to fetch products. Please try again." });
        }
    };

    const handleRemoveProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, "products", productId));
            setProducts((prev) => prev.filter((product) => product.id !== productId));
            setMessage({ type: "success", text: "Product removed successfully!" });
        } catch (error) {
            console.error("Error removing product:", error);
            setMessage({ type: "error", text: "Failed to remove product." });
        }
    };

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    // Sort and filter products
    const sortedProducts = products
        .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => (sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center flex-grow">
                {!isLoggedIn ? (
                    <p className="text-center text-black">Loading...</p>
                ) : (
                    <div className="w-full p-4">
                        {/* Header with Welcome and Inventory Count */}
                        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-black">
                                Welcome, {user?.email}!
                            </h2>
                            <p className="text-base sm:text-lg text-black bg-gray-200 p-2 py-2 rounded-lg">
                                Total Inventory : <span className="font-bold">{products.length}</span>
                            </p>
                        </div>

                        {/* Search Bar and Sorting Toggle */}
                        <div className="flex flex-wrap justify-between items-center gap-2 py-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full sm:w-80 p-3 bg-white rounded-md border-2 focus:ring-2"
                            />

                            <div className="flex w-full sm:w-auto gap-2">
                                <button
                                    onClick={() => router.push("/admin/add")}
                                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Add Product
                                </button>
                                <button
                                    onClick={() => router.push("/admin/banners")}
                                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Add Banners
                                </button>
                                <button
                                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                                </button>
                            </div>
                        </div>



                        {/* Product List */}


                        {sortedProducts.length === 0 ? (
                            <p className="text-center text-gray-600">No products found</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg shadow-lg">
                                <table className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
                                            <th className="px-4 py-3 text-sm font-semibold">Date Added</th>
                                            <th className="px-4 py-3 text-sm font-semibold">Image</th>
                                            <th className="px-4 py-3 text-sm font-semibold">Title</th>
                                            <th className="px-4 py-3 text-sm font-semibold hidden sm:table-cell">Description</th>
                                            <th className="px-4 py-3 text-sm font-semibold">Price</th>
                                            <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-opacity-30 transition-all">
                                                <td className="px-4 py-3 text-sm">
                                                    {product.dateAdded ? new Date(product.dateAdded).toLocaleDateString() : "N/A"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-lg mx-auto" />
                                                </td>
                                                <td className="px-4 py-3 text-sm">{product.title}</td>
                                                <td className="px-4 py-3 text-sm hidden sm:table-cell">{product.description}</td>
                                                <td className="px-4 py-3 text-sm font-bold">{`$${product.price.toFixed(2)}`}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                                                        <button
                                                            onClick={() => router.push(`/admin/edit/${product.id}`)}
                                                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 w-full sm:w-auto"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveProduct(product.id)}
                                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Notification */}
                        {message && (
                            <div
                                className={`text-center px-4 py-2 rounded-lg mb-4 text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}