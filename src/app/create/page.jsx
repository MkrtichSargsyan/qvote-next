"use client";

import { useState } from "react";

export default function CreatePage() {
    const [text, setText] = useState("");
    const [type, setType] = useState("image");
    const [options, setOptions] = useState(["", "", ""]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem("qvote-questions") || "[]");
        const newQuestion = {
            id: stored.length + 1,
            text,
            type,
            options: options.map((o, i) => ({ id: i + 1, content: o, votes: 0 })),
        };
        const updated = [...stored, newQuestion];
        localStorage.setItem("qvote-questions", JSON.stringify(updated));
        alert("Question created!");
        setText("");
        setOptions(["", "", ""]);
    };

    return (
        <div className="min-h-full px-6 py-20 max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-10">Create New Question</h1>
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Question text"
                    className="p-3 rounded-xl bg-[#0f1a14]/90 border border-[#1f2d25] text-gray-200"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-3 rounded-xl bg-[#0f1a14]/90 border border-[#1f2d25] text-gray-200"
                >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                </select>
                {options.map((opt, idx) => (
                    <input
                        key={idx}
                        type="text"
                        placeholder={`Option ${idx + 1}`}
                        className="p-3 rounded-xl bg-[#0f1a14]/90 border border-[#1f2d25] text-gray-200"
                        value={opt}
                        onChange={(e) =>
                            setOptions((prev) => prev.map((o, i) => (i === idx ? e.target.value : o)))
                        }
                        required
                    />
                ))}
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-800 to-green-900 text-gray-100 hover:from-green-700 hover:to-green-800 transition"
                >
                    Create Question
                </button>
            </form>
        </div>
    );
}
