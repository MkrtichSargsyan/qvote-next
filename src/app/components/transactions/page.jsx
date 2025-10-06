"use client";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("qvote-wallet");
        if (!saved) {
            setLoading(false);
            return;
        }
        setAddress(saved);
        fetchTransactions(saved);
    }, []);

    const fetchTransactions = async (wallet) => {
        try {
            const res = await fetch(
                `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=9U458IU4DC6V22JS71GQBVBVAWMW3QQ3XR`
            );
            const data = await res.json();
            setTransactions(data.result.slice(0, 10)); // last 10
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-20 text-gray-200">Loading...</p>;
    if (!address) return <p className="text-center mt-20 text-gray-300">No wallet connected.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-12 text-gray-100">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Recent Transactions
            </h1>
            <ul className="space-y-4">
                {transactions.map((tx) => (
                    <li
                        key={tx.hash}
                        className="p-4 rounded-lg bg-gradient-to-r from-[#111827] to-[#1f2937] border border-white/10"
                    >
                        <p><strong>Hash:</strong> {tx.hash.slice(0, 20)}...</p>
                        <p><strong>From:</strong> {tx.from.slice(0, 10)}...</p>
                        <p><strong>To:</strong> {tx.to?.slice(0, 10)}...</p>
                        <p><strong>Value:</strong> {Number(tx.value) / 1e18} ETH</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
// )98F-ahBn2P/hQk