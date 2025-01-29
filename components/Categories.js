// import Link from "next/link";
// import { useRef, useEffect, useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../utils/firebase"; // Adjust the path to your Firebase initialization file

// export default function Categories() {
//     const scrollContainer = useRef(null);
//     const [isMobile, setIsMobile] = useState(false);
//     const [tags, setTags] = useState([]);


//     // Fetch and sort tags from Firestore
//     useEffect(() => {
//         const fetchTags = async () => {
//             try {
//                 const tagsCollection = collection(db, "tags"); // Adjust collection name if needed
//                 const tagsSnapshot = await getDocs(tagsCollection);
//                 const tagsList = tagsSnapshot.docs
//                     .map((doc) => doc.data().name) // Assuming each document has a 'name' field
//                     .sort((a, b) => a.localeCompare(b)); // Sort tags alphabetically
//                 setTags(tagsList);
//             } catch (error) {
//                 console.error("Error fetching tags:", error);
//             }
//         };
//         fetchTags();
//     }, []);

//     // Handle resize to determine mobile view
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 768);
//         handleResize(); // Set initial state
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Handle horizontal scroll for desktop
//     const handleScroll = (e) => {
//         if (!isMobile) {
//             e.preventDefault();
//             scrollContainer.current.scrollLeft += e.deltaY;
//         }
//     };

//     // Handle swipe gestures for mobile
//     const handleTouchStart = (e) => {
//         scrollContainer.current.startX = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e) => {
//         if (!scrollContainer.current.startX) return;
//         const deltaX = scrollContainer.current.startX - e.touches[0].clientX;
//         scrollContainer.current.scrollLeft += deltaX;
//         scrollContainer.current.startX = e.touches[0].clientX;
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <nav
//                 ref={scrollContainer}
//                 onWheel={handleScroll}
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 className={`flex gap-4 p-2 overflow-x-auto whitespace-nowrap scrollbar-hide ${isMobile ? "snap-x snap-mandatory" : ""
//                     }`}
//             >
//                 {tags.map((tag, index) => (
//                     <Link
//                         href={{
//                             pathname: "/product",
//                             query: { search: encodeURIComponent(tag) },
//                         }}
//                         key={index}
//                     >
//                         <span
//                             className={`flex-shrink-0 px-4 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-gray-300 ${isMobile ? "snap-center w-full text-center" : ""
//                                 }`}
//                         >
//                             {tag}
//                         </span>
//                     </Link>
//                 ))}
//             </nav>

//             {/* Styling for swipe and snapping behavior */}
//             <style jsx>{`
//                 @media (max-width: 768px) {
//                     nav {
//                         scroll-snap-type: x mandatory;
//                     }
//                     nav > * {
//                         scroll-snap-align: center;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }




import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase"; // Adjust the path to your Firebase initialization file

export default function Categories() {
    const scrollContainer = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [tags, setTags] = useState([]);

    // Fetch and sort tags from Firestore
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsCollection = collection(db, "tags"); // Adjust collection name if needed
                const tagsSnapshot = await getDocs(tagsCollection);
                const tagsList = tagsSnapshot.docs
                    .map((doc) => doc.data().name) // Assuming each document has a 'name' field
                    .sort((a, b) => a.localeCompare(b)); // Sort tags alphabetically
                setTags(tagsList);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        fetchTags();
    }, []);

    // Handle resize to determine mobile view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle horizontal scroll for desktop
    const handleScroll = (e) => {
        if (!isMobile) {
            e.preventDefault();
            scrollContainer.current.scrollLeft += e.deltaY * 2;
        }
    };

    // Handle swipe gestures for mobile
    const handleTouchStart = (e) => {
        scrollContainer.current.startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!scrollContainer.current.startX) return;
        const deltaX = scrollContainer.current.startX - e.touches[0].clientX;
        scrollContainer.current.scrollLeft += deltaX;
        scrollContainer.current.startX = e.touches[0].clientX;
    };

    return (
        <div className="container mx-auto px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Categories</h2>

            <nav
                ref={scrollContainer}
                onWheel={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                className={`
                    flex gap-4 p-2 overflow-x-auto whitespace-nowrap scrollbar-hide
                    bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md px-4 py-3
                `}
            >
                {tags.map((tag, index) => (
                    <Link
                        href={{
                            pathname: "/product",
                            query: { search: encodeURIComponent(tag) },
                        }}
                        key={index}
                    >
                        <span
                            className={`
                                flex-shrink-0 px-6 py-2 text-sm font-medium
                                bg-white text-gray-700 border border-blue-300
                                rounded-full shadow-md cursor-pointer transition-all
                                hover:bg-blue-500 hover:text-white hover:shadow-lg
                                active:scale-95
                            `}
                        >
                            {tag}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Styling for swipe and snapping behavior */}
            <style jsx>{`
                @media (max-width: 768px) {
                    nav {
                        scroll-snap-type: x mandatory;
                    }
                    nav > * {
                        scroll-snap-align: center;
                    }
                }
            `}</style>
        </div>
    );
}
