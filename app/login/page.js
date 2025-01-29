"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Cookies from "js-cookie";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Import Firebase auth

export default function Login() {
    const router = useRouter(); // Initialize Next.js router
    const [time, setTime] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        setTime(Date.now());

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                const token = await user.getIdToken();
                Cookies.set("token", token, { expires: 1, path: "/" }); // Store token in cookies
                router.push("/admin"); // Redirect to /admin after login
            } else {
                setIsLoggedIn(false);
                setUser(null);
                Cookies.remove("token"); // Remove token on logout
            }
        });

        return () => unsubscribe();
    }, [router]); // Add router as a dependency

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            Cookies.set("token", token, { expires: 1, path: "/" }); // Store token in cookies
            router.push("/admin"); // Redirect to /admin
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        Cookies.remove("token"); // Remove token from cookies
        setIsLoggedIn(false);
        router.push("/login"); // Redirect to login page after logout
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center flex-grow">
                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96">
                        <h3 className="text-3xl font-semibold text-center text-black mb-8">Login Here</h3>
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 mt-2 bg-white rounded-md text-black border-2"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 mt-2 bg-white rounded-md text-black border-2"
                        />
                        <button type="submit" className="w-full py-3 mt-8 bg-blue-500 text-white font-semibold rounded-lg">
                            Log In
                        </button>
                    </form>
                ) : (
                    <div className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96">
                        <h2 className="text-3xl font-semibold text-center text-black mb-8">loading!</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
