"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, Heart } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border border-orange-100 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-6">
          <Heart className="text-orange-500" size={32} />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Sign In to WishBridge</h2>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white border border-orange-200 rounded-xl py-3 mb-6 font-medium text-orange-600 shadow hover:bg-orange-50 transition-colors"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.528 2.848-2.12 5.26-4.52 6.88v5.68h7.32c4.28-3.944 6.73-9.76 6.73-16.876z" fill="#4285F4"/><path d="M24.48 48c6.12 0 11.26-2.032 15.012-5.52l-7.32-5.68c-2.032 1.36-4.62 2.168-7.692 2.168-5.92 0-10.936-4-12.736-9.36H4.18v5.88C7.92 43.44 15.56 48 24.48 48z" fill="#34A853"/><path d="M11.744 29.608A14.98 14.98 0 0 1 9.6 24c0-1.944.352-3.832.976-5.608v-5.88H4.18A23.98 23.98 0 0 0 0 24c0 3.944.944 7.68 2.6 10.888l9.144-5.28z" fill="#FBBC05"/><path d="M24.48 9.56c3.34 0 6.32 1.148 8.68 3.396l6.48-6.48C35.736 2.032 30.6 0 24.48 0 15.56 0 7.92 4.56 4.18 12.512l9.144 5.88c1.8-5.36 6.816-9.36 12.736-9.36z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
          Continue with Google
        </button>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50 pl-10"
                placeholder="you@email.com"
                autoComplete="email"
              />
              <User className="absolute left-3 top-3 text-orange-400" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50 pl-10"
                placeholder="Password"
                autoComplete="current-password"
              />
              <Lock className="absolute left-3 top-3 text-orange-400" size={18} />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
