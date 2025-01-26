"use client";

import { useEffect, useState } from "react";

export default function TimeComponent() {
    const [time, setTime] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Hardcoded login credentials (for simplicity)
    const validUsername = "admin";
    const validPassword = "admin";

    useEffect(() => {
        setTime(Date.now());
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === validUsername && password === validPassword) {
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Invalid username or password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center flex-grow"> {/* Adjusted padding here */}
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
                            className="w-full py-3 mt-8 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>
                ) : (
                    <div className="relative bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full sm:w-96 border-2 border-opacity-10 border-white">
                        <h2 className="text-3xl font-semibold text-center text-black mb-8">Welcome, {username}!</h2>
                        <p className="text-lg text-center text-black mb-8">Current time: {new Date(time).toLocaleString()}</p>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
