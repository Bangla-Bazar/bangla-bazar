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
            alert("Failed to fetch products. Please try again.");
        }
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



    const handleLogout = async () => {
        await signOut(auth);
        setIsLoggedIn(false);
        router.push("/login"); // Redirect after logout
    };

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
                            <p className="text-base sm:text-lg text-black">
                                You have <span className="font-bold">{products.length}</span> products in inventory
                            </p>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Search Bar and Sorting Toggle */}
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full sm:w-80 p-3 bg-white rounded-md border-2 focus:ring-2"
                            />
                            <a href="/admin/add" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Add Product
                                </button>
                            </a>
                            <button
                                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
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
                                                    {product.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.description}
                                                </td>
                                                <td className="px-6 py-4 font-bold">
                                                    {
                                                        `$${product.price.toFixed(2)}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-row space-x-2">
                                                        <>
                                                            <button
                                                                onClick={() => router.push(`/admin/edit/${product.id}`)}
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