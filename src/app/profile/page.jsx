"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const [votes, setVotes] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Read votes and questions from sessionStorage
        const storedVotes = JSON.parse(sessionStorage.getItem("qvote-votes") || "[]");
        const storedQuestions = JSON.parse(sessionStorage.getItem("qvote-questions") || "[]");
        setVotes(storedVotes);
        setQuestions(storedQuestions);
    }, []);

    const getVoteDetail = (vote) => {
        const question = questions.find((q) => q.id === vote.qid);
        if (!question) return { questionText: "Unknown Question", optionText: "Unknown Option" };

        const option = question.options.find((o) => o.id === vote.oid);
        return { questionText: question.text, optionText: option?.content || "Unknown Option" };
    };

    return (
        <div className="flex flex-col flex-1 min-h-full px-6 py-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-100">Your Profile</h1>
                <Link
                    href="/create"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-700/90 to-purple-800/90
                               text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition shadow-lg"
                >
                    + Add New Question
                </Link>
            </div>

            {votes.length === 0 ? (
                <p className="text-gray-300">You haven’t voted yet.</p>
            ) : (
                <ul className="w-full grid md:grid-cols-2 gap-6">
                    {votes.map((v, idx) => {
                        const { questionText, optionText } = getVoteDetail(v);
                        return (
                            <li
                                key={idx}
                                className="relative p-5 rounded-2xl
                                           bg-gradient-to-br from-[#0c0c12] via-[#141421] to-[#0c0c12]
                                           border border-purple-600/30
                                           shadow-2xl overflow-hidden
                                           text-gray-100 flex flex-col gap-3"
                            >
                                {/* Shining overlay */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                    <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_6s_linear_infinite]" />
                                </div>

                                <h2 className="text-lg font-semibold z-10 relative">{questionText}</h2>
                                <p className="text-gray-300 z-10 relative">Voted: {optionText}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
