'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Mail, Twitter, Instagram, Facebook, Phone, MapPin, Sparkles, Heart } from 'lucide-react';
import ProtectedRoute from '@/components/common/ProtectedRoute';

interface Particle {
  background: string;
  width: number;
  height: number;
  left: number;
  top: number;
  y: number;
  x: number;
  duration: number;
}

export default function ContactPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      [...Array(15)].map((_, i) => ({
        background: i % 3 === 0 ? 'rgba(255, 112, 46, 0.1)' : i % 3 === 1 ? 'rgba(249, 168, 212, 0.1)' : 'rgba(255, 159, 67, 0.1)',
        width: Math.random() * 30 + 10,
        height: Math.random() * 30 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: particle.background,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, particle.y],
                x: [0, particle.x],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <Header />
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 px-4">
          <div className="absolute -top-20 right-0 w-72 h-72 bg-gradient-to-r from-orange-300 to-rose-300 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute -bottom-20 left-0 w-64 h-64 bg-gradient-to-r from-rose-300 to-orange-300 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6"
            >
              <Sparkles className="text-orange-500" size={20} />
              <span className="text-orange-500 font-medium">We'd Love to Hear From You</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Get in Touch With WishBridge
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            >
              Whether you have a question, want to share your story, or just want to say hello, our team is here for you. Fill out the form or reach us through the channels below.
            </motion.p>
          </div>
        </section>
        {/* Contact Section */}
        <section className="w-full py-12 md:py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl p-10 border border-orange-100 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
                <Mail className="text-rose-400" size={24} /> Send Us a Message
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50 resize-none"
                    placeholder="Type your message..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg mt-2"
                  type="submit"
                  disabled={submitted}
                >
                  {submitted ? 'Thank you! We received your message.' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
            {/* Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-8 justify-center"
            >
              <div className="bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl p-8 text-white shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span className="font-medium">+91 6291346873</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <span className="font-medium">contact@wishbridge.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span className="font-medium">180 K.G.Road, Kolkata 8</span>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                {[
                  { icon: <Twitter className="text-orange-500" size={20} />, url: '#' },
                  { icon: <Facebook className="text-orange-500" size={20} />, url: '#' },
                  { icon: <Instagram className="text-orange-500" size={20} />, url: '#' },
                  { icon: <Mail className="text-orange-500" size={20} />, url: '#' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mt-4 border border-orange-100">
                <Heart className="text-rose-400 mb-2" size={32} />
                <div className="text-lg font-bold text-orange-500 mb-1">Our Promise</div>
                <p className="text-gray-600 text-center">We read every message and do our best to respond within 2 business days. Your kindness inspires us!</p>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-white border-t border-orange-100 py-12 px-4 mt-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Heart className="text-orange-500" size={28} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                WishBridge
              </h3>
            </div>
            <div className="text-gray-600 text-center md:text-right">
              © {new Date().getFullYear()} WishBridge. Spreading kindness, one message at a time.
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
