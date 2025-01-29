// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { BanglaBazar } from "@/utils/globals_constants";
// import { auth } from "@/utils/firebase"; // Import Firebase Auth
// import { useAuthState } from "react-firebase-hooks/auth";

// export default function Navbar() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [user] = useAuthState(auth); // Get current user

//     // Function to handle menu toggle
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     // Function to close the menu
//     const closeMenu = () => {
//         setIsMenuOpen(false);
//     };
//     // Logout function
//     const handleLogout = async () => {
//         try {
//             await auth.signOut(); // Firebase sign-out
//             closeMenu(); // Close menu after logout
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };

//     return (
//         <nav className="bg-white text-black p-5 shadow-sm relative z-50">
//             <div className="container mx-auto flex justify-between items-center">
//                 {/* Logo */}
//                 <h1 className="text-xl font-bold">
//                     <Link href="/">{BanglaBazar.NAME}</Link>
//                 </h1>

//                 {/* Hamburger Menu Button */}
//                 <button
//                     className="sm:hidden text-xl"
//                     onClick={toggleMenu}
//                 >
//                     ☰
//                 </button>

//                 {/* Navigation Links */}
//                 <ul
//                     className={`sm:flex gap-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-5 sm:p-0 shadow-md sm:shadow-none transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
//                         }`}
//                     style={{ zIndex: 50 }} // Ensure it floats above everything
//                 >
//                     <li className="py-2 sm:py-0">
//                         <Link href="/" onClick={closeMenu}>
//                             Home
//                         </Link>
//                     </li>
//                     <li className="py-2 sm:py-0">
//                         <Link href="/product" onClick={closeMenu}>
//                             Products
//                         </Link>
//                     </li>
//                     <li className="py-2 sm:py-0">
//                         <Link href="/about" onClick={closeMenu}>
//                             About Us
//                         </Link>
//                     </li>
//                     <li className="py-2 sm:py-0">
//                         <Link href="/faq" onClick={closeMenu}>
//                             FAQ
//                         </Link>
//                     </li>
//                     {/* Logout Button (Only on Mobile & When Logged In) */}
//                     {user && (
//                         <li className="py-2">
//                             <button
//                                 onClick={() => {
//                                     handleLogout();
//                                     closeMenu();
//                                 }}
//                                 className="text-left py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                             >
//                                 Logout
//                             </button>
//                         </li>
//                     )}
//                 </ul>
//             </div>
//         </nav>
//     );
// }


"use client";
import { useState } from "react";
import Link from "next/link";
import { BanglaBazar } from "@/utils/globals_constants";
import { auth } from "@/utils/firebase"; // Import Firebase Auth
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user] = useAuthState(auth); // Get current user

    // Function to handle menu toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to close the menu
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Firebase sign-out
            closeMenu(); // Close menu after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="bg-white text-black p-5 shadow-sm relative z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-xl font-bold">
                    <Link href="/">{BanglaBazar.NAME}</Link>
                </h1>

                {/* Hamburger Menu Button */}
                <button
                    className="sm:hidden text-xl"
                    onClick={toggleMenu}
                >
                    ☰
                </button>

                {/* Navigation Links */}
                <ul
                    className={`sm:flex flex-col sm:flex-row items-center text-center gap-5 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-5 sm:p-0 shadow-md sm:shadow-none transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
                        }`}
                    style={{ zIndex: 50 }} // Ensure it floats above everything
                >
                    <li className="py-2 sm:py-0">
                        <Link href="/" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="py-2 sm:py-0">
                        <Link href="/product" onClick={closeMenu}>
                            Products
                        </Link>
                    </li>
                    <li className="py-2 sm:py-0">
                        <Link href="/about" onClick={closeMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className="py-2 sm:py-0">
                        <Link href="/faq" onClick={closeMenu}>
                            FAQ
                        </Link>
                    </li>

                    {/* Login Button (Only on Mobile) */}
                    {!user && (
                        <li className="py-2">
                            <Link href="/login" onClick={closeMenu}>
                                Login
                            </Link>
                        </li>
                    )}
                    {/*admin button only on logged in */}
                    {user && (
                        <li className="py-2">
                            <Link href="/admin" onClick={closeMenu}>
                                Admin
                            </Link>
                        </li>
                    )}

                    {/* Logout Button (Only on Mobile & Centered) */}
                    {user && (
                        <li className="py-1">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                                className="w-full sm:w-auto px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
