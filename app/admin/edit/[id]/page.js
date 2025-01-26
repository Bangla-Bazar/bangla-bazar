// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { db } from "@/utils/firebase";
// import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// export default function EditProduct({ params }) {
//     const { id } = params;
//     const router = useRouter();

//     const [product, setProduct] = useState(null);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");

//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (id) {
//                 const docRef = doc(db, "products", id);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     setProduct(data);
//                     setTitle(data.title);
//                     setDescription(data.description);
//                     setPrice(data.price);
//                 }
//             }
//         };
//         fetchProduct();
//     }, [id]);

//     const handleUpdate = async () => {
//         try {
//             const docRef = doc(db, "products", id);
//             await updateDoc(docRef, {
//                 title,
//                 description,
//                 price: parseFloat(price),
//             });
//             alert("Product updated successfully!");
//             router.push("/"); // Redirect to the homepage or product list page
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     const handleDelete = async () => {
//         const confirmDelete = confirm("Are you sure you want to delete this product?");
//         if (confirmDelete) {
//             try {
//                 const docRef = doc(db, "products", id);
//                 await deleteDoc(docRef);
//                 alert("Product deleted successfully!");
//                 router.push("/"); // Redirect to the homepage or product list page
//             } catch (error) {
//                 console.error("Error deleting product:", error);
//             }
//         }
//     };

//     if (!product) return <p>Loading...</p>;

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
//             <div className="space-y-4">
//                 <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Title"
//                 />
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Description"
//                 />
//                 <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Price"
//                 />
//                 <button
//                     onClick={handleUpdate}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 >
//                     Save Changes
//                 </button>
//                 <button
//                     onClick={handleDelete}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                 >
//                     Delete Product
//                 </button>
//             </div>
//         </div>
//     );
// }





// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { db, storage } from "@/utils/firebase";
// import {
//     doc,
//     getDoc,
//     updateDoc,
//     deleteDoc,
//     getDocs,
//     collection,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export default function EditProduct({ params }) {
//     const { id } = params;
//     const router = useRouter();

//     const [product, setProduct] = useState(null);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [image, setImage] = useState(null);
//     const [imageUrl, setImageUrl] = useState("");
//     const [tags, setTags] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [allTags, setAllTags] = useState([]);
//     const [isTemporary, setIsTemporary] = useState(false);
//     const [lastDate, setLastDate] = useState("");

//     useEffect(() => {
//         const fetchProductAndTags = async () => {
//             // Fetch product
//             if (id) {
//                 const docRef = doc(db, "products", id);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     setProduct(data);
//                     setTitle(data.title);
//                     setDescription(data.description);
//                     setPrice(data.price);
//                     setImageUrl(data.imageUrl);
//                     setSelectedTags(data.tags || []);
//                     setIsTemporary(data.isTemporary || false);
//                     setLastDate(data.lastDate || "");
//                 }
//             }

//             // Fetch all available tags
//             const tagsSnapshot = await getDocs(collection(db, "tags"));
//             setAllTags(tagsSnapshot.docs.map((doc) => doc.data().name));
//         };

//         fetchProductAndTags();
//     }, [id]);

//     const handleUpdate = async () => {
//         try {
//             let updatedImageUrl = imageUrl;

//             // Handle image upload if a new image is selected
//             if (image) {
//                 const imageRef = ref(storage, `products/${image.name}`);
//                 await uploadBytes(imageRef, image);
//                 updatedImageUrl = await getDownloadURL(imageRef);
//             }

//             // Update product details
//             const docRef = doc(db, "products", id);
//             await updateDoc(docRef, {
//                 title,
//                 description,
//                 price: parseFloat(price),
//                 tags: selectedTags,
//                 imageUrl: updatedImageUrl,
//                 isTemporary,
//                 lastDate: isTemporary ? lastDate : null,
//             });

//             alert("Product updated successfully!");
//             router.push("/"); // Redirect to the homepage or product list page
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     const handleDelete = async () => {
//         const confirmDelete = confirm("Are you sure you want to delete this product?");
//         if (confirmDelete) {
//             try {
//                 const docRef = doc(db, "products", id);
//                 await deleteDoc(docRef);
//                 alert("Product deleted successfully!");
//                 router.push("/"); // Redirect to the homepage or product list page
//             } catch (error) {
//                 console.error("Error deleting product:", error);
//             }
//         }
//     };

//     if (!product) return <p>Loading...</p>;

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
//             <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//                 Edit Product
//             </h1>

//             <div className="space-y-6">
//                 <input
//                     type="text"
//                     placeholder="Product Name"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

//                 <textarea
//                     placeholder="Description (Optional)"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

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

//                 {imageUrl && (
//                     <img
//                         src={imageUrl}
//                         alt="Current Product"
//                         className="w-32 h-32 object-cover rounded-lg mt-4"
//                     />
//                 )}

//                 <div>
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

//                 <div className="flex gap-4">
//                     <button
//                         onClick={handleUpdate}
//                         className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-blue-600"
//                     >
//                         Save Changes
//                     </button>
//                     <button
//                         onClick={handleDelete}
//                         className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-red-600"
//                     >
//                         Delete Product
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import {
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProduct({ params }) {
    const { id } = use(params); // Unwrap the promise for `params`

    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [isTemporary, setIsTemporary] = useState(false);
    const [lastDate, setLastDate] = useState("");

    useEffect(() => {
        const fetchProductAndTags = async () => {
            // Fetch product
            if (id) {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                    setImageUrl(data.imageUrl);
                    setSelectedTags(data.tags || []);
                    setIsTemporary(data.isTemporary || false);
                    setLastDate(data.lastDate || "");
                }
            }

            // Fetch all available tags
            const tagsSnapshot = await getDocs(collection(db, "tags"));
            setAllTags(tagsSnapshot.docs.map((doc) => doc.data().name));
        };

        fetchProductAndTags();
    }, [id]);

    const handleUpdate = async () => {
        try {
            let updatedImageUrl = imageUrl;

            // Handle image upload if a new image is selected
            if (image) {
                const imageRef = ref(storage, `products/${image.name}`);
                await uploadBytes(imageRef, image);
                updatedImageUrl = await getDownloadURL(imageRef);
            }

            // Update product details
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                title,
                description,
                price: parseFloat(price),
                tags: selectedTags,
                imageUrl: updatedImageUrl,
                isTemporary,
                lastDate: isTemporary ? lastDate : null,
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
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Edit Product
            </h1>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

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

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Current Product"
                        className="w-32 h-32 object-cover rounded-lg mt-4"
                    />
                )}

                <div>
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

                <div className="flex gap-4">
                    <button
                        onClick={handleUpdate}
                        className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-red-600"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
}
