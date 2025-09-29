"use client";

import { useState, useEffect } from "react";
import { HandThumbUpIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedQuestions = sessionStorage.getItem("qvote-questions");
        const storedVotes = sessionStorage.getItem("qvote-votes");

        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        } else {
            const demo = [
                {
                    id: 1,
                    text: "Which image inspires you most?",
                    type: "image",
                    options: [
                        { id: 1, content: "https://picsum.photos/400/250?1", votes: 0 },
                        { id: 2, content: "https://picsum.photos/400/250?2", votes: 0 },
                        { id: 3, content: "https://picsum.photos/400/250?3", votes: 0 },
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
                {
                    id: 3,
                    text: "Who wins the snack battle?",
                    type: "text",
                    options: [
                        { id: 1, content: "🍕 Pizza (the cheat day king)", votes: 0 },
                        { id: 2, content: "🍔 Burger (double the buns, double the fun)", votes: 0 },
                        { id: 3, content: "🌮 Taco (because Tuesday)", votes: 0 },
                    ],
                },
            ];
            setQuestions(demo);
            sessionStorage.setItem("qvote-questions", JSON.stringify(demo));
        }

        if (storedVotes) {
            setVotes(JSON.parse(storedVotes));
        }
    }, []);

    const vote = (qid, oid) => {
        if (votes.some((v) => v.qid === qid)) return;

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

        const newVotes = [...votes, { qid, oid }];
        setQuestions(updated);
        setVotes(newVotes);

        sessionStorage.setItem("qvote-questions", JSON.stringify(updated));
        sessionStorage.setItem("qvote-votes", JSON.stringify(newVotes));

        confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
        });

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }, 600);
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
                    <h1 className="text-3xl font-bold text-center mb-10 text-gray-100 drop-shadow-lg">
                        {question.text}
                    </h1>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                        {question.options.map((option) => (
                            <motion.div
                                key={option.id}
                                whileHover={{ scale: 1.04, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative p-5 rounded-2xl 
                           bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a]
                           border border-white/10 
                           shadow-xl overflow-hidden 
                           flex flex-col items-center gap-4 
                           h-[360px] justify-between text-gray-100"
                            >
                                {/* Infinite Shine */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                    <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_6s_linear_infinite]" />
                                </div>

                                <div className="flex-1 flex items-center justify-center w-full relative z-10">
                                    {question.type === "image" && (
                                        <img
                                            src={option.content}
                                            className="rounded-xl object-cover h-[200px] w-full shadow-md"
                                        />
                                    )}
                                    {question.type === "video" && (
                                        <video
                                            src={option.content}
                                            controls
                                            className="rounded-xl object-cover h-[200px] w-full shadow-md"
                                        />
                                    )}
                                    {question.type === "text" && (
                                        <p className="text-lg font-medium text-center px-2">
                                            {option.content}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => vote(question.id, option.id)}
                                    disabled={votes.some((v) => v.qid === question.id)}
                                    className="flex items-center gap-2 px-5 py-2.5 
                             rounded-full 
                             bg-gradient-to-r from-indigo-600/80 to-purple-700/80
                             text-white font-medium
                             border border-white/20 
                             shadow-md
                             hover:from-indigo-500 hover:to-purple-600
                             transition disabled:opacity-50 relative z-10"
                                >
                                    <HandThumbUpIcon className="w-5 h-5" />
                                    <span>{option.votes} Votes</span>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between w-full mt-10">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 transition disabled:opacity-40"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    disabled={currentIndex === questions.length - 1}
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 transition disabled:opacity-40"
                >
                    <ChevronDownIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
