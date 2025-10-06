"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";

export default function Navbar() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("qvote-wallet");
        if (saved) setAccount(saved);
    }, []);

    const connectWallet = async () => {
        try {
            if (typeof window.ethereum === "undefined") {
                alert("No crypto wallet found. Please install MetaMask or Coinbase Wallet.");
                return;
            }

            // If multiple providers exist (MetaMask, Coinbase, etc.)
            const providers = window.ethereum.providers || [window.ethereum];
            let selectedProvider;

            if (providers.length > 1) {
                const choice = prompt(
                    providers
                        .map(
                            (p, i) =>
                                `${i + 1}. ${p.isMetaMask
                                    ? "MetaMask"
                                    : p.isCoinbaseWallet
                                        ? "Coinbase Wallet"
                                        : "Other"
                                }`
                        )
                        .join("\n") + "\n\nSelect wallet by number:"
                );
                selectedProvider = providers[parseInt(choice) - 1];
                if (!selectedProvider) {
                    alert("Invalid selection or wallet not found.");
                    return;
                }
            } else {
                selectedProvider = window.ethereum;
            }

            // Request wallet connection
            await selectedProvider.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(selectedProvider);
            const signer = await provider.getSigner();
            const wallet = await signer.getAddress();

            // Check chain (Base Mainnet = 0x2105)
            const network = await provider.getNetwork();
            if (network.chainId !== 8453n) {
                alert("Please switch to Base Mainnet (chainId 8453).");
                return;
            }

            setAccount(wallet);
            localStorage.setItem("qvote-wallet", wallet);

            console.log("Connected:", wallet);
        } catch (err) {
            console.error("Wallet connection error:", err);
            alert("Failed to connect wallet. Please try again.");
        }
    };
    const disconnectWallet = () => {
        localStorage.removeItem("qvote-wallet");
        setAccount(null);
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
                    <Link href="/transactions" className="hover:text-white transition-colors">
                        Transactions
                    </Link>

                    {/* Wallet Connect */}
                    {account ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-300">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </span>
                            <button
                                onClick={disconnectWallet}
                                className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-red-500 hover:to-orange-600 transition"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 transition"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
