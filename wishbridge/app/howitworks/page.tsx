"use client";

import { motion } from "framer-motion";
import { Heart, Gift, BookOpen, Smile, Star, ChevronRight, ShieldCheck, Users, MessageCircle, Globe, Handshake, Rocket, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-6 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          How WishBridge Works
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-12 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          WishBridge is a platform that brings together those in need and those who want to help. Here’s a step-by-step look at how you can make a wish, support a dream, and see the impact unfold:
        </motion.p>
        {/* Expanded Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mb-16">
          {/* Step 1 */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <BookOpen className="text-orange-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2 text-orange-600">1. Create Your Wish</h3>
            <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
              <li>Sign up and fill out a simple wish form.</li>
              <li>Describe your need or dream in detail—education, health, essentials, or a special goal.</li>
              <li>Add a photo and your story to help others connect with your journey.</li>
              <li>Submit your wish for review and verification.</li>
            </ul>
          </motion.div>
          {/* Step 2 */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-rose-100 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ShieldCheck className="text-rose-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2 text-rose-600">2. Verification & Approval</h3>
            <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
              <li>Our team reviews every wish for authenticity and safety.</li>
              <li>We may reach out for more details or supporting documents.</li>
              <li>Once verified, your wish goes live for the community to see.</li>
              <li>Verified wishes receive a special badge for trust and transparency.</li>
            </ul>
          </motion.div>
          {/* Step 3 */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Users className="text-orange-400 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2 text-orange-500">3. Community Support</h3>
            <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
              <li>Donors and supporters browse wishes and read your story.</li>
              <li>People can donate, share, or send you messages of encouragement.</li>
              <li>Every contribution, big or small, brings you closer to your goal.</li>
              <li>Wishes can be shared on social media to reach more hearts.</li>
            </ul>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
          {/* Step 4 */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-rose-100 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Gift className="text-rose-400 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2 text-rose-500">4. Wish Fulfillment</h3>
            <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
              <li>Once your wish is fully funded, we help coordinate fulfillment.</li>
              <li>Receive your support directly or through our trusted partners.</li>
              <li>Share updates and thank-yous with your supporters.</li>
              <li>Track your wish’s progress in your dashboard.</li>
            </ul>
          </motion.div>
          {/* Step 5 */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <MessageCircle className="text-orange-400 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2 text-orange-500">5. Celebrate & Inspire</h3>
            <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
              <li>Share your success story and inspire others to dream big.</li>
              <li>See your journey featured in our community highlights and newsletters.</li>
              <li>Stay connected and help others as a WishBridge ambassador!</li>
              <li>Join our events and meetups to celebrate together.</li>
            </ul>
          </motion.div>
        </div>
        {/* New: Donor Journey */}
        <div className="w-full max-w-4xl mb-20">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-rose-500 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            For Donors & Supporters
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Handshake className="text-orange-500 mb-4" size={36} />
              <h3 className="font-bold text-lg mb-2 text-orange-600">Find a Wish</h3>
              <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
                <li>Browse wishes by category, urgency, or location.</li>
                <li>Read real stories and see verified badges for trust.</li>
                <li>Filter wishes to find the ones that resonate with you.</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-rose-100 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Heart className="text-rose-500 mb-4" size={36} />
              <h3 className="font-bold text-lg mb-2 text-rose-600">Make an Impact</h3>
              <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
                <li>Donate securely and track your impact in real time.</li>
                <li>Send messages of encouragement to wishers.</li>
                <li>Share wishes with friends and family to multiply kindness.</li>
              </ul>
            </motion.div>
          </div>
        </div>
        {/* New: Why WishBridge? */}
        <div className="w-full max-w-4xl mb-20">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Why Choose WishBridge?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Globe className="text-orange-400 mb-4" size={36} />
              <h3 className="font-bold text-lg mb-2 text-orange-600">Global & Local</h3>
              <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
                <li>Support wishes from your neighborhood or across the world.</li>
                <li>Our platform is open to all, regardless of background.</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-rose-100 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <CheckCircle className="text-rose-400 mb-4" size={36} />
              <h3 className="font-bold text-lg mb-2 text-rose-600">Safe & Transparent</h3>
              <ul className="text-gray-600 text-left list-disc pl-4 space-y-1 text-sm">
                <li>Every wish is verified for authenticity and safety.</li>
                <li>Track donations and fulfillment with full transparency.</li>
              </ul>
            </motion.div>
          </div>
        </div>
        {/* CTA */}
        <motion.div
          className="w-full flex flex-col items-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <motion.a
              href="/explore"
              className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Wishes <ChevronRight size={22} />
            </motion.a>
            <motion.a
              href="#"
              className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition-all flex items-center gap-2 border border-orange-200"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Post a Wish <Smile className="text-rose-400" size={22} />
            </motion.a>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <Star className="text-orange-300 mb-2 animate-bounce" size={36} />
            <p className="text-lg text-gray-600 max-w-xl text-center">Every wish granted is a story of hope, kindness, and community. Thank you for being a part of WishBridge!</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
