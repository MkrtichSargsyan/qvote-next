"use client";

import { useState, useEffect, useRef } from "react";
import { HandThumbUpIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState([]);
    const videoRef = useRef(null);

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
                    text: "Pick your favorite video clip:",
                    type: "video",
                    options: [
                        { id: 1, content: "https://cdn.pixabay.com/video/2025/08/18/298103_large.mp4", votes: 0 },
                        { id: 2, content: "https://cdn.pixabay.com/video/2025/07/27/293788_large.mp4", votes: 0 },
                        { id: 3, content: "https://www.w3schools.com/html/mov_bbb.mp4", votes: 0 },
                    ],
                },
                {
                    id: 3,
                    text: "Who wins the snack battle?",
                    type: "text",
                    options: [
                        { id: 1, content: "🍕 Pizza", votes: 0 },
                        { id: 2, content: "🍔 Burger", votes: 0 },
                        { id: 3, content: "🌮 Taco", votes: 0 },
                    ],
                },
                {
                    id: 4,
                    text: "Best flirty emoji?",
                    type: "text",
                    options: [
                        { id: 1, content: "😏", votes: 0 },
                        { id: 2, content: "💦", votes: 0 },
                        { id: 3, content: "🔥", votes: 0 },
                    ],
                },
                {
                    id: 5,
                    text: "Funniest image?",
                    type: "image",
                    options: [
                        { id: 1, content: "https://picsum.photos/400/250?5", votes: 0 },
                        { id: 2, content: "https://picsum.photos/400/250?6", votes: 0 },
                        { id: 3, content: "https://picsum.photos/400/250?7", votes: 0 },
                    ],
                },
                {
                    id: 6,
                    text: "Pick your pleasure video:",
                    type: "video",
                    options: [
                        { id: 1, content: "https://cdn.pixabay.com/video/2024/05/18/212404_large.mp4", votes: 0 },
                        { id: 2, content: "https://cdn.pixabay.com/video/2024/12/12/246391_large.mp4", votes: 0 },
                        { id: 3, content: "https://cdn.pixabay.com/video/2023/02/25/152085-802335503_large.mp4", votes: 0 },
                    ],
                },
                {
                    id: 7,
                    text: "Most seductive fruit?",
                    type: "text",
                    options: [
                        { id: 1, content: "🍓 Strawberry", votes: 0 },
                        { id: 2, content: "🍌 Banana", votes: 0 },
                        { id: 3, content: "🍑 Peach", votes: 0 },
                    ],
                },
                {
                    id: 8,
                    text: "Cheekiest dare in public?",
                    type: "text",
                    options: [
                        { id: 1, content: "Dance like nobody's watching 💃", votes: 0 },
                        { id: 2, content: "Kiss your crush 😘", votes: 0 },
                        { id: 3, content: "Shout a secret 🚨", votes: 0 },
                    ],
                },
                {
                    id: 9,
                    text: "Funniest outfit?",
                    type: "image",
                    options: [
                        { id: 1, content: "https://picsum.photos/400/250?9", votes: 0 },
                        { id: 2, content: "https://picsum.photos/400/250?10", votes: 0 },
                        { id: 3, content: "https://picsum.photos/400/250?11", votes: 0 },
                    ],
                },
                {
                    id: 10,
                    text: "Pick your ultimate party video:",
                    type: "video",
                    options: [
                        { id: 1, content: "https://cdn.pixabay.com/video/2025/06/01/282995_large.mp4", votes: 0 },
                        { id: 2, content: "https://cdn.pixabay.com/video/2025/01/10/251873_large.mp4", votes: 0 },
                        { id: 3, content: "https://cdn.pixabay.com/video/2025/08/20/298643_large.mp4", votes: 0 },
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

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    }, [currentIndex]);

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

        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

        setTimeout(() => {
            if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
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
                                whileHover={{ scale: 1.06, y: -6 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                                className="relative p-5 rounded-3xl
                   bg-gradient-to-br from-[#0c0c12] via-[#141421] to-[#0c0c12]
                   border border-purple-600/30
                   shadow-2xl overflow-hidden
                   flex flex-col items-center gap-4 h-[360px] justify-between text-gray-100"
                            >
                                <div className="flex-1 flex items-center justify-center w-full relative z-10">
                                    {question.type === "image" && (
                                        <img
                                            src={option.content}
                                            key={option.id}
                                            className="rounded-xl object-cover h-[200px] w-full shadow-md"
                                        />
                                    )}
                                    {question.type === "video" && (
                                        <video
                                            key={option.id}
                                            ref={currentIndex === questions.indexOf(question) ? videoRef : null}
                                            src={option.content}
                                            controls
                                            muted
                                            autoPlay
                                            playsInline
                                            className="rounded-xl object-cover w-full h-[200px] shadow-md"
                                            onMouseEnter={(e) => e.currentTarget.play()}
                                            onMouseLeave={(e) => e.currentTarget.pause()}
                                        />
                                    )}
                                    {/* {question.type === "video" && (
                                        <video
                                            src={option.content}
                                            controls
                                            className="rounded-xl object-cover h-[200px] w-full shadow-md"
                                        />
                                    )} */}
                                    {question.type === "text" && (
                                        <p className="text-lg font-medium text-center px-2">{option.content}</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => vote(question.id, option.id)}
                                    disabled={votes.some((v) => v.qid === question.id)}
                                    className="flex items-center gap-2 px-5 py-2.5
                     rounded-full
                     bg-gradient-to-r from-indigo-700/90 to-purple-800/90
                     text-white font-semibold
                     border border-white/20 shadow-lg
                     hover:from-indigo-600 hover:to-purple-700
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
