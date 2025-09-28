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
        <nav className="sticky top-0 z-50 backdrop-blur bg-[#0b100c]/90 border-b border-[#1f2d25] shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
                >
                    QVote
                </Link>

                <div className="flex items-center gap-6 text-gray-300">
                    <Link href="/" className="hover:text-gray-100 transition">
                        Home
                    </Link>
                    <Link href="/profile" className="hover:text-gray-100 transition">
                        Profile
                    </Link>

                    {user && (
                        <Link href="/create" className="hover:text-gray-100 transition">
                            Create
                        </Link>
                    )}

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-800 to-green-900 text-gray-100 hover:from-green-700 hover:to-green-800 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-800 to-green-900 text-gray-100 hover:from-green-700 hover:to-green-800 transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleLogin}
                                className="ml-2 px-4 py-2 rounded-full border border-green-700 text-gray-100 hover:bg-green-900 hover:text-white transition"
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
