// "use client"; // Add this line to make the file a client component

// import { useState, useEffect } from "react";
// import { db, storage } from "@/utils/firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useRouter } from "next/navigation"; // Import Next.js router


// export default function AddProduct() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [image, setImage] = useState(null);
//     const [tags, setTags] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [newTag, setNewTag] = useState("");
//     const [isTemporary, setIsTemporary] = useState(false);
//     const [lastDate, setLastDate] = useState("");
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [allTags, setAllTags] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchTags = async () => {
//             const tagsSnapshot = await getDocs(collection(db, "tags"));
//             setAllTags(tagsSnapshot.docs.map((doc) => doc.data().name));
//         };
//         fetchTags();
//     }, []);

//     const handleAddTag = async () => {
//         if (newTag.trim() && !allTags.includes(newTag.trim())) {
//             try {
//                 await addDoc(collection(db, "tags"), { name: newTag.trim() });
//                 setAllTags((prev) => [...prev, newTag.trim()]);
//                 setSelectedTags((prev) => [...prev, newTag.trim()]);
//                 setNewTag("");
//             } catch (error) {
//                 console.error("Error adding tag:", error);
//             }
//         }
//     };

//     const handleAddProduct = async () => {
//         if (!image) {
//             setSuccessMessage("Please upload an image");
//             return;
//         }

//         try {
//             const imageRef = ref(storage, `products/${image.name}`);
//             await uploadBytes(imageRef, image);
//             const imageUrl = await getDownloadURL(imageRef);

//             await addDoc(collection(db, "products"), {
//                 title,
//                 description,
//                 price: parseFloat(price),
//                 tags: selectedTags,
//                 imageUrl,
//                 isTemporary,
//                 lastDate: isTemporary ? lastDate : null,
//                 dateAdded: new Date().toISOString(),
//             });

//             setSuccessMessage("Product added successfully! Do you want to add another product?");
//         } catch (error) {
//             console.error("Error adding product:", error);
//             setSuccessMessage("Failed to add product.");
//         }
//     };

//     const resetForm = () => {
//         setTitle("");
//         setDescription("");
//         setPrice("");
//         setImage(null);
//         setSelectedTags([]);
//         setIsTemporary(false);
//         setLastDate("");
//         setSuccessMessage(null);
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
//             <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Product</h1>

//             <div className="space-y-6">
//                 <input
//                     type="text"
//                     placeholder="Product Name"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <div>
//                     <div className="flex gap-3 items-center mb-4">
//                         <input
//                             type="text"
//                             placeholder="Add a new tag"
//                             value={newTag}
//                             onChange={(e) => setNewTag(e.target.value)}
//                             className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         <button
//                             onClick={handleAddTag}
//                             className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
//                         >
//                             Add Tag
//                         </button>
//                     </div>
//                     <div className="flex gap-3 flex-wrap">
//                         {allTags.map((tag) => (
//                             <button
//                                 key={tag}
//                                 onClick={() =>
//                                     setSelectedTags((prev) =>
//                                         prev.includes(tag)
//                                             ? prev.filter((t) => t !== tag)
//                                             : [...prev, tag]
//                                     )
//                                 }
//                                 className={`px-4 py-2 rounded-lg shadow cursor-pointer ${selectedTags.includes(tag)
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-gray-200 text-gray-800"
//                                     }`}
//                             >
//                                 {tag}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <input
//                     type="number"
//                     placeholder="Price"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="file"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

//                 <div className="flex items-center gap-4">
//                     <label className="flex items-center gap-3">
//                         <input
//                             type="checkbox"
//                             checked={isTemporary}
//                             onChange={(e) => setIsTemporary(e.target.checked)}
//                             className="w-5 h-5 text-blue-500 focus:ring-blue-400"
//                         />
//                         Temporary Product
//                     </label>
//                     {isTemporary && (
//                         <input
//                             type="date"
//                             value={lastDate}
//                             onChange={(e) => setLastDate(e.target.value)}
//                             className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     )}
//                 </div>

//                 <textarea
//                     placeholder="Description (Optional)"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

//                 <button
//                     onClick={handleAddProduct}
//                     className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-blue-600"
//                 >
//                     Add Product
//                 </button>
//             </div>

//             {successMessage && (
//                 <div className="p-6 mt-6 bg-green-100 text-green-800 rounded-lg shadow">
//                     <p className="text-center font-medium">{successMessage}</p>
//                     <div className="mt-4 flex justify-center gap-4">
//                         <button
//                             onClick={resetForm}
//                             className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
//                         >
//                             Add Another Product
//                         </button>
//                         <button
//                             onClick={() => router.push("/admin")} // Navigate to Admin Page
//                             className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
//                         >
//                             Go to Admin Page
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [isTemporary, setIsTemporary] = useState(false);
    const [lastDate, setLastDate] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [allTags, setAllTags] = useState([]);
    const router = useRouter();

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
                tags: selectedTags,
                imageUrl,
                isTemporary,
                lastDate: isTemporary ? lastDate : null,
                dateAdded: new Date().toISOString(),
            });

            setSuccessMessage("Product added successfully!");
            resetForm();
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
        setImagePreview(null);
        setSelectedTags([]);
        setIsTemporary(false);
        setLastDate("");
        setSuccessMessage(null);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-10 border">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Add a New Product</h1>

            <div className="space-y-6">
                {/* Product Name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Tag Input */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add a new tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddTag}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() =>
                                    setSelectedTags((prev) =>
                                        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                    )
                                }
                                className={`px-4 py-2 rounded-lg shadow-md cursor-pointer transition ${selectedTags.includes(tag)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {tag}
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
                    className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Image Upload with Preview */}
                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-60 object-cover rounded-lg shadow-md border"
                        />
                    )}
                </div>

                {/* Temporary Product Checkbox */}
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
                            className="p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </div>

                {/* Description */}
                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Submit Button */}
                <button
                    onClick={handleAddProduct}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="p-6 mt-6 bg-green-100 text-green-800 rounded-lg shadow-md text-center">
                    <p className="font-medium">{successMessage}</p>
                </div>
            )}
        </div>
    );
}
