"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const storedVotes = JSON.parse(localStorage.getItem("qvote-votes") || "[]");
        setVotes(storedVotes);
    }, []);

    return (
        <div className="flex flex-col flex-1 min-h-full px-6 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-10">Your Profile</h1>
            {votes.length === 0 ? (
                <p>You haven’t voted yet.</p>
            ) : (
                <ul className="w-full space-y-4">
                    {votes.map((v, idx) => (
                        <li
                            key={idx}
                            className="p-4 rounded-xl bg-[#0f1a14]/90 border border-[#1f2d25] text-gray-200"
                        >
                            Question ID: {v.qid}, Option ID: {v.oid}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
