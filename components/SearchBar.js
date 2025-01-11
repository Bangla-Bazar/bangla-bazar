import { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Call the onSearch function to handle the search
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
                onClick={() => onSearch(query)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Search
            </button>
        </div>
    );
}
