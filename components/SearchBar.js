import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon

export default function SearchBar({ placeholder, onSearch, onRedirect }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) onSearch(value);
    };

    const handleSearchClick = () => {
        if (onSearch) onSearch(query);
        if (onRedirect) onRedirect(query); // Handle redirection if provided
    };

    return (
        <div className="flex items-center bg-white/80 backdrop-blur-lg shadow-lg rounded-full px-4 py-2 
                        border border-gray-300 hover:shadow-xl transition-all duration-300">
            <FiSearch className="text-gray-500 text-xl" /> {/* Search Icon */}

            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder || "Search for products..."}
                className="w-full px-4 py-2 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            />

            <button
                onClick={handleSearchClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium 
                           hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
                Search
            </button>
        </div>
    );
}
