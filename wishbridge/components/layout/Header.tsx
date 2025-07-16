'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Explore', href: '/explore' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const searchExamples = [
  'Search wishes...',
  'Need a bicycle for school',
  'Medical help for my pet',
  'Winter jacket for my son',
  'Dreams, essentials, education...',
];

export default function Navbar() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Typing effect for search placeholder
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < searchExamples[searchIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(searchExamples[searchIndex].slice(0, displayed.length + 1));
        }, 60);
      } else {
        setTyping(false);
        timeout = setTimeout(() => setTyping(true), 1500);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed('');
        setSearchIndex((searchIndex + 1) % searchExamples.length);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, searchIndex]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[9999] ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm shadow-sm'} border-b border-orange-100 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 relative">
        {/* Logo - Keep the same as in desktop design */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Link href="/">
            <Image
              src="/App_logo.png"
              alt="WishBridge Logo"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
          </Link>
          <Link href="/">
            <h1 className="py-2 text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              WishBridge
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex items-center gap-6 ml-8"
        >
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-gray-700 hover:text-orange-500 font-medium relative px-2 py-1 rounded transition-colors"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.nav>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={displayed}
              placeholder="Search wishes..."
              className="w-full py-2 px-4 pl-10 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
              readOnly
            />
            <Search className="absolute left-3 top-2.5 text-orange-400" size={18} />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <button
            className="text-gray-700 hover:text-orange-500 p-2 rounded-full"
          >
            <Heart className="text-rose-500" size={22} />
          </button>
          {!loading && user && (
            <Link
              href="/profile"
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-orange-200 bg-white shadow hover:bg-orange-50 transition-all overflow-hidden"
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <User size={24} className="text-orange-400" />
              )}
            </Link>
          )}
          {!loading && !user ? (
            <Link
              href="/login"
              className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-orange-200 transition-all"
            >
              <User size={20} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          ) : (
            !loading && user && (
              <button
                className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-orange-200 transition-all"
                onClick={() => signOut(auth)}
              >
                <User size={20} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {/* Mobile Search */}
              <div className="relative w-full px-3 py-2">
                <input
                  type="text"
                  value={displayed}
                  placeholder="Search wishes..."
                  className="w-full py-2 px-4 pl-10 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
                  readOnly
                />
                <Search className="absolute left-7 top-4 text-orange-400" size={18} />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-orange-100">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 w-full">
                  <Heart className="text-rose-500" size={20} />
                  <span>Wishlist</span>
                </button>

                {!loading && user && (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="text-orange-500" size={20} />
                    <span>Profile</span>
                  </Link>
                )}

                {!loading && !user ? (
                  <Link
                    href="/login"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-orange-500 hover:bg-orange-50 text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                ) : (
                  !loading && user && (
                    <button
                      className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-orange-500 to-rose-500 mt-2 text-center"
                      onClick={() => {
                        signOut(auth);
                        setMobileOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}