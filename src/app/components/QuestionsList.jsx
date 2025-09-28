"use client";

import { useState, useEffect } from "react";
import { HandThumbUpIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("qvote-questions");
        if (stored) {
            setQuestions(JSON.parse(stored));
        } else {
            const demo = [
                {
                    id: 1,
                    text: "Which image inspires you most?",
                    type: "image",
                    options: [
                        { id: 1, content: "https://picsum.photos/300/200?1", votes: 0 },
                        { id: 2, content: "https://picsum.photos/300/200?2", votes: 0 },
                        { id: 3, content: "https://picsum.photos/300/200?3", votes: 0 },
                    ],
                },
                {
                    id: 2,
                    text: "Pick your favorite clip:",
                    type: "video",
                    options: [
                        { id: 1, content: "https://www.w3schools.com/html/mov_bbb.mp4", votes: 0 },
                        { id: 2, content: "https://www.w3schools.com/html/movie.mp4", votes: 0 },
                        { id: 3, content: "https://www.w3schools.com/html/mov_bbb.mp4", votes: 0 },
                    ],
                },
            ];
            setQuestions(demo);
            localStorage.setItem("qvote-questions", JSON.stringify(demo));
        }
    }, []);

    const vote = (qid, oid) => {
        const updated = questions.map((q) =>
            q.id === qid
                ? {
                    ...q,
                    options: q.options.map((o) =>
                        o.id === oid ? { ...o, votes: o.votes + 1 } : o
                    ),
                }
                : q
        );
        setQuestions(updated);
        localStorage.setItem("qvote-questions", JSON.stringify(updated));

        const votes = JSON.parse(localStorage.getItem("qvote-votes") || "[]");
        votes.push({ qid, oid });
        localStorage.setItem("qvote-votes", JSON.stringify(votes));
    };

    const next = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    if (!questions.length) return <p className="text-center mt-20">Loading...</p>;

    const question = questions[currentIndex];

    return (
        <div className="relative w-full max-w-6xl z-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-3xl font-semibold text-center mb-10 text-gray-100">
                        {question.text}
                    </h1>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                        {question.options.map((option) => (
                            <div
                                key={option.id}
                                className="p-4 rounded-2xl bg-[#0f1a14]/90 backdrop-blur border border-[#1f2d25] shadow-md hover:shadow-lg hover:border-gray-400 transition flex flex-col items-center gap-4"
                            >
                                {question.type === "image" && (
                                    <img
                                        src={option.content}
                                        className="rounded-xl max-h-56 object-cover"
                                    />
                                )}
                                {question.type === "video" && (
                                    <video
                                        src={option.content}
                                        controls
                                        className="rounded-xl max-h-56"
                                    />
                                )}
                                {question.type === "text" && (
                                    <p className="text-lg font-medium text-center text-gray-200">
                                        {option.content}
                                    </p>
                                )}

                                <button
                                    onClick={() => vote(question.id, option.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2a21] text-gray-200 border border-[#2a3b31] hover:bg-[#22372b] transition"
                                >
                                    <HandThumbUpIcon className="w-5 h-5" />
                                    <span>{option.votes} Votes</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between w-full mt-10">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="p-3 rounded-full bg-[#1a2a21] border border-[#2a3b31] text-gray-200 hover:bg-[#22372b] transition disabled:opacity-40"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    disabled={currentIndex === questions.length - 1}
                    className="p-3 rounded-full bg-[#1a2a21] border border-[#2a3b31] text-gray-200 hover:bg-[#22372b] transition disabled:opacity-40"
                >
                    <ChevronDownIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
