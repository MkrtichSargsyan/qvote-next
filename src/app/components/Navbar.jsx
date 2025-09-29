"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("qvote-user");
        if (saved) setUser(saved);
    }, []);

    const handleLogin = () => {
        localStorage.setItem("qvote-user", "DemoUser");
        setUser("DemoUser");
    };

    const handleLogout = () => {
        localStorage.removeItem("qvote-user");
        setUser(null);
    };

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0a0a12]/80 via-[#111827]/80 to-[#0a0a12]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide"
                >
                    QVote
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6 text-gray-300 font-medium">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/profile" className="hover:text-white transition-colors">
                        Profile
                    </Link>
                    {user && (
                        <Link href="/create" className="hover:text-white transition-colors">
                            Create
                        </Link>
                    )}

                    {/* Auth Buttons */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-pink-500 hover:to-purple-600 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleLogin}
                                className="ml-2 px-4 py-2 rounded-full border border-indigo-500/60 text-indigo-200 hover:bg-indigo-700/40 hover:text-white transition"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
