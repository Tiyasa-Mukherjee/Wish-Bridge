"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function WalletPage() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<number>(0);
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) setTokens(snap.data().tokens || 0);
    });
  }, [user]);

  async function handleBuyTokens(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMsg("");
    try {
      // Dummy payment simulation
      setTimeout(async () => {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        const prevTokens = snap.exists() ? snap.data().tokens || 0 : 0;
        await updateDoc(userRef, { tokens: prevTokens + amount });
        setTokens(prevTokens + amount);
        setMsg(`Successfully purchased ${amount} token(s)!`);
        setLoading(false);
      }, 1200); // Simulate network/payment delay
    } catch {
      setMsg("Purchase failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-orange-100 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/App_logo.png" alt="WishBridge Logo" width={40} height={40} className="rounded-lg" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              My Wallet
            </h2>
          </div>
          <div className="mb-6">
            <span className="text-gray-700 font-medium">Token Balance:</span>
            <span className="ml-2 text-orange-500 font-bold text-xl">{tokens}</span>
          </div>
          <form onSubmit={handleBuyTokens} className="flex flex-col gap-4">
            <label className="block text-gray-700 font-medium">
              Buy Tokens (₹10 per token)
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50 mt-2"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium shadow hover:shadow-orange-200 transition-all"
              disabled={loading}
            >
              {loading ? "Processing..." : `Buy for ₹${amount * 10}`}
            </button>
            {msg && <div className="text-center text-orange-500 font-medium">{msg}</div>}
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Tokens are used to support wishes. 1 token = ₹10.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
