"use client";
import { useState } from "react";
import Link from "next/link";
import { BanglaBazar } from "@/utils/globals_constants";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to handle menu toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to close the menu
    const closeMenu = () => {
        setIsMenuOpen(false);
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
                    className={`sm:flex gap-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-5 sm:p-0 shadow-md sm:shadow-none transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
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
                </ul>
            </div>
        </nav>
    );
}
