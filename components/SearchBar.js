
import { useState } from "react";

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
        <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder || "Search..."}
                className="w-full px-4 py-2 border-none outline-none text-gray-700"
            />
            <button
                onClick={handleSearchClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Search
            </button>
        </div>
    );
}

