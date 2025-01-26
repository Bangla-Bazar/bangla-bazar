"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/utils/firebase"; // Import Firestore and Storage
import { collection, getDocs, addDoc } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage functions

export default function TimeComponent() {
    const [time, setTime] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]); // State to store products
    const [showAddProductForm, setShowAddProductForm] = useState(false); // Toggle add product form
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: null,
    });

    // Hardcoded login credentials (for simplicity)
    const validUsername = "admin";
    const validPassword = "password123";

    useEffect(() => {
        setTime(Date.now());
    }, []);

    // Fetch products from Firestore
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData); // Update products state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === validUsername && password === validPassword) {
            setIsLoggedIn(true);
            setError("");
            await fetchProducts(); // Fetch products after successful login
        } else {
            setError("Invalid username or password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setProducts([]); // Clear products on logout
    };

    // Handle input changes for the new product form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prev) => ({
            ...prev,
            image: file,
        }));
    };

    // Add a new product to Firestore
    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!newProduct.image) {
            alert("Please upload an image");
            return;
        }

        try {
            // Upload the image to Firebase Storage
            const imageRef = ref(storage, `products/${newProduct.image.name}`);
            await uploadBytes(imageRef, newProduct.image);
            const imageUrl = await getDownloadURL(imageRef);

            // Add the product to Firestore
            await addDoc(collection(db, "products"), {
                title: newProduct.title,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                imageUrl,
            });

            // Refresh the product list
            await fetchProducts();

            // Reset the form
            setNewProduct({
                title: "",
                description: "",
                price: "",
                image: null,
            });
            setShowAddProductForm(false); // Hide the form after adding

            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

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
                        <label htmlFor="username" className="block text-black text-sm font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Email or Phone"
                            required
                            className="w-full p-3 mt-2 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="password" className="block text-black text-sm font-medium mt-6">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 mt-2 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 mt-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>
                ) : (
                    <div className="w-full p-4">
                        <h2 className="text-3xl font-semibold text-center text-black mb-8">Welcome, {username}!</h2>
                        <p className="text-lg text-center text-black mb-8">Current time: {new Date(time).toLocaleString()}</p>

                        {/* Add Product Button */}
                        <button
                            onClick={() => setShowAddProductForm(!showAddProductForm)}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-8"
                        >
                            {showAddProductForm ? "Cancel" : "Add Product"}
                        </button>

                        {/* Add Product Form */}
                        {showAddProductForm && (
                            <form
                                onSubmit={handleAddProduct}
                                className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg mb-8 border-2 border-opacity-10 border-white"
                            >
                                <h3 className="text-2xl font-semibold text-center text-black mb-6">Add New Product</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={newProduct.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={newProduct.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        required
                                        className="w-full p-3 bg-white bg-opacity-10 rounded-md text-black placeholder-gray-300 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Product List */}
                        <h3 className="text-2xl font-semibold text-center text-black mb-6">Product List</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.length === 0 ? (
                                <p className="text-center col-span-full">No products found.</p>
                            ) : (
                                products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md border border-opacity-10 border-white"
                                    >
                                        <h4 className="text-xl font-semibold text-black">{product.title}</h4>
                                        <p className="text-gray-700">{product.description}</p>
                                        <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
                                        {product.imageUrl && (
                                            <img
                                                src={product.imageUrl}
                                                alt={product.title}
                                                className="w-full h-32 object-cover mt-2 rounded-lg"
                                            />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 mt-8 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}