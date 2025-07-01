'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Gift, Heart, Star, ShieldCheck, Search, Plus, ChevronRight, Sparkles, Mail, Twitter, Instagram, Facebook, BookOpen, House, Stethoscope, Palette, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { collection, getDocs, query, orderBy, limit, doc, getDoc, addDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

// Define a Wish type for better type safety
interface Wish {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  supporters: number;
  createdBy: string;
  createdAt?: Date | string | null;
  verified?: boolean;
  imageUrl?: string;
}

interface UserData {
  displayName?: string;
  tokens?: number;
  [key: string]: unknown;
}

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const controls = useAnimation();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [users, setUsers] = useState<{[uid: string]: UserData}>({});

  const { user } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postCategory, setPostCategory] = useState('Education');
  const [postTarget, setPostTarget] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState('');

  // Token system state
  const [supportLoading, setSupportLoading] = useState<string | null>(null);
  const [supportError, setSupportError] = useState('');
  const [supportAmount, setSupportAmount] = useState('');
  const [showSupportModal, setShowSupportModal] = useState<string | null>(null); // wishId

  const features = [
    {
      title: "Wish Categories",
      description: "Education, Health, Essentials, Gifts, Dreams, Emergency, and more. Find exactly what moves your heart.",
      icon: <Search className="text-rose-500" size={24} />
    },
    {
      title: "Trust & Safety",
      description: "AI + Human moderation, KYC verification, and anti-fraud monitoring ensure a safe giving experience.",
      icon: <ShieldCheck className="text-orange-500" size={24} />
    },
    {
      title: "Impact Stories",
      description: "See the difference you make with heartfelt post-fulfillment photos and videos from recipients.",
      icon: <Heart className="text-rose-500" size={24} />
    }
  ];

  const categories = [
    { name: "Education", icon: <BookOpen className="text-orange-500" size={20} /> },
    { name: "Health", icon: <Stethoscope className="text-rose-500" size={20} /> },
    { name: "Essentials", icon: <House className="text-orange-500" size={20} /> },
    { name: "Gifts", icon: <Gift className="text-rose-500" size={20} /> },
    { name: "Dreams", icon: <Palette className="text-orange-500" size={20} /> },
    { name: "Emergency", icon: <AlertTriangle className="text-rose-500" size={20} /> }
  ];

  // Replace Math.random() in floating particles with fixed values to avoid hydration errors
  const particleStyles = [
    { background: 'rgba(255, 112, 46, 0.1)', width: 32, height: 32, left: '10%', top: '20%' },
    { background: 'rgba(249, 168, 212, 0.1)', width: 24, height: 24, left: '30%', top: '40%' },
    { background: 'rgba(255, 159, 67, 0.1)', width: 18, height: 28, left: '60%', top: '10%' },
    { background: 'rgba(255, 112, 46, 0.1)', width: 28, height: 24, left: '80%', top: '60%' },
    { background: 'rgba(249, 168, 212, 0.1)', width: 40, height: 30, left: '50%', top: '70%' },
    { background: 'rgba(255, 159, 67, 0.1)', width: 20, height: 36, left: '20%', top: '80%' },
    { background: 'rgba(255, 112, 46, 0.1)', width: 22, height: 34, left: '70%', top: '30%' },
    { background: 'rgba(249, 168, 212, 0.1)', width: 16, height: 19, left: '40%', top: '50%' },
    { background: 'rgba(255, 159, 67, 0.1)', width: 12, height: 15, left: '75%', top: '55%' },
    { background: 'rgba(255, 112, 46, 0.1)', width: 34, height: 34, left: '90%', top: '35%' },
    { background: 'rgba(249, 168, 212, 0.1)', width: 36, height: 33, left: '5%', top: '15%' },
    { background: 'rgba(255, 159, 67, 0.1)', width: 33, height: 14, left: '95%', top: '45%' },
    { background: 'rgba(255, 112, 46, 0.1)', width: 35, height: 31, left: '85%', top: '65%' },
    { background: 'rgba(249, 168, 212, 0.1)', width: 34, height: 16, left: '18%', top: '56%' },
    { background: 'rgba(255, 159, 67, 0.1)', width: 20, height: 39, left: '23%', top: '50%' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [activeFeature, controls]);

  const [featuredWish, setFeaturedWish] = useState<Wish | null>(null);
  const [stories, setStories] = useState<Wish[]>([]);

  useEffect(() => {
    // Fetch wishes from Firestore
    async function fetchWishes() {
      const wishesQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'), limit(12));
      const wishesSnap = await getDocs(wishesQuery);
      const wishList: Wish[] = [];
      const userIds = new Set<string>();
      wishesSnap.forEach(docSnap => {
        const data = docSnap.data();
        wishList.push({ id: docSnap.id, ...data } as Wish);
        if (data.createdBy) userIds.add(data.createdBy);
      });
      setWishes(wishList);
      // Fetch user info for wish creators
      const userMap: { [uid: string]: UserData } = {};
      await Promise.all(Array.from(userIds).map(async (uid) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) userMap[uid] = userDoc.data() as UserData;
      }));
      setUsers(userMap);

      // Featured Wish: pick the wish with highest percent funded, else most recent
      let featured: Wish | null = null;
      if (wishList.length > 0) {
        featured = wishList.reduce((prev, curr) => {
          const prevPct = (prev.raisedAmount || 0) / (prev.targetAmount || 1);
          const currPct = (curr.raisedAmount || 0) / (curr.targetAmount || 1);
          return currPct > prevPct ? curr : prev;
        }, wishList[0]);
      }
      setFeaturedWish(featured);

      // Heartwarming Stories: wishes that are fulfilled (raised >= target), up to 3
      const fulfilled = wishList.filter(w => (w.raisedAmount || 0) >= (w.targetAmount || 0)).slice(0, 3);
      setStories(fulfilled);
    }
    fetchWishes();
  }, []);

  async function handlePostWish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPostLoading(true);
    setPostError('');
    try {
      if (!user) throw new Error('You must be signed in.');
      if (!postTitle || !postDesc || !postCategory || !postTarget) throw new Error('All fields required.');
      await addDoc(collection(db, 'wishes'), {
        title: postTitle,
        description: postDesc,
        category: postCategory,
        targetAmount: Number(postTarget),
        raisedAmount: 0,
        supporters: 0,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        verified: false,
        imageUrl: postImage || '',
      });
      setShowPostModal(false);
      setPostTitle(''); setPostDesc(''); setPostCategory('Education'); setPostTarget(''); setPostImage('');
      // Refresh wishes
      const wishesQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'), limit(12));
      const wishesSnap = await getDocs(wishesQuery);
      const wishList: Wish[] = [];
      const userIds = new Set<string>();
      wishesSnap.forEach(docSnap => {
        const data = docSnap.data();
        wishList.push({ id: docSnap.id, ...data } as Wish);
        if (data.createdBy) userIds.add(data.createdBy);
      });
      setWishes(wishList);
      // Fetch user info for wish creators
      const userMap: { [uid: string]: UserData } = {};
      await Promise.all(Array.from(userIds).map(async (uid) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) userMap[uid] = userDoc.data() as UserData;
      }));
      setUsers(userMap);
    } catch (err) {
      setPostError((err as Error).message || 'Failed to post wish');
    } finally {
      setPostLoading(false);
    }
  }

  // Helper: get user's token balance
  const userTokens = users[user?.uid || '']?.tokens || 0;

  // Support Wish handler
  async function handleSupportWish(wish: Wish, amount: number) {
    setSupportLoading(wish.id);
    setSupportError('');
    try {
      if (!user) throw new Error('You must be signed in.');
      if (amount < 1) throw new Error('Amount must be at least 1 token.');
      if (userTokens < amount) throw new Error('Insufficient tokens.');
      await runTransaction(db, async (transaction) => {
        const wishRef = doc(db, 'wishes', wish.id);
        const userRef = doc(db, 'users', user.uid);
        const wishSnap = await transaction.get(wishRef);
        const userSnap = await transaction.get(userRef);
        if (!wishSnap.exists() || !userSnap.exists()) throw new Error('Wish or user not found.');
        const wishData = wishSnap.data();
        const userData = userSnap.data();
        if ((userData.tokens || 0) < amount) throw new Error('Insufficient tokens.');
        transaction.update(wishRef, {
          raisedAmount: (wishData.raisedAmount || 0) + amount,
          supporters: (wishData.supporters || 0) + 1
        });
        transaction.update(userRef, {
          tokens: (userData.tokens || 0) - amount
        });
      });
      setShowSupportModal(null);
      setSupportAmount('');
      // Refresh wishes and users
      const wishesQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'), limit(12));
      const wishesSnap = await getDocs(wishesQuery);
      const wishList: Wish[] = [];
      const userIds = new Set<string>();
      wishesSnap.forEach(docSnap => {
        const data = docSnap.data();
        wishList.push({ id: docSnap.id, ...data } as Wish);
        if (data.createdBy) userIds.add(data.createdBy);
      });
      setWishes(wishList);
      const userMap: { [uid: string]: UserData } = {};
      await Promise.all(Array.from(userIds).map(async (uid) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) userMap[uid] = userDoc.data() as UserData;
      }));
      setUsers(userMap);
    } catch (err) {
      setSupportError((err as Error).message || 'Failed to support wish');
    } finally {
      setSupportLoading(null);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particleStyles.map((style, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={style}
              animate={{
                y: [0, (i % 2 === 0 ? 1 : -1) * 20],
                x: [0, (i % 3 === 0 ? 1 : -1) * 20],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {/* Navbar Section */}
        <Header />
        

        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 px-4 flex flex-col items-center justify-center">
          <div className="absolute -top-20 right-0 w-72 h-72 bg-gradient-to-r from-orange-300 to-rose-300 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute -bottom-20 left-0 w-64 h-64 bg-gradient-to-r from-rose-300 to-orange-300 rounded-full blur-3xl opacity-30 -z-10"></div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="text-orange-500" size={20} />
                <span className="text-orange-500 font-medium">Making dreams come true since 2024</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Where Kindness Connects Dreams
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-gray-700 mb-8"
              >
                WishBridge brings together those in need and those who can help. Share your wish or grant someone&apos;s dream - anonymously or publicly.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a 
                  href="#post"
                  className="relative bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-orange-200 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={e => { e.preventDefault(); setShowPostModal(true); }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Plus size={20} /> Post a Wish
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.a>
                
                <motion.a 
                  href="#explore"
                  className="relative bg-white text-orange-500 border-2 border-orange-300 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Search size={20} /> Explore Wishes
                  </span>
                  <div className="absolute inset-0 bg-orange-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Featured Wish
                </div>
                {featuredWish ? (
                  <>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-orange-100 rounded-full p-2">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 overflow-hidden flex items-center justify-center">
                        {featuredWish.imageUrl ? (
                          <Image src={featuredWish.imageUrl} alt={featuredWish.title} width={64} height={64} className="object-cover w-full h-full rounded-xl" />
                        ) : (
                          <Gift className="text-orange-200" size={40} />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        {featuredWish.title}
                        {featuredWish.verified && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Verified</span>
                        )}
                      </h3>
                      <p className="text-orange-500 text-sm flex items-center gap-1">
                        {/* Show category icon if available */}
                        {categories.find(c => c.name === featuredWish.category)?.icon}
                        {featuredWish.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {featuredWish.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">${featuredWish.raisedAmount || 0} raised of ${featuredWish.targetAmount || 0}</span>
                      <span className="text-sm font-medium text-orange-600">{Math.round((featuredWish.raisedAmount || 0) / (featuredWish.targetAmount || 1) * 100)}%</span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-2.5">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((featuredWish.raisedAmount || 0) / (featuredWish.targetAmount || 1) * 100)}%` }}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500">
                      <a href={`/profile/${featuredWish.createdBy}`} className="font-medium text-orange-500 hover:underline">
                        {users[featuredWish.createdBy]?.displayName || 'User'}
                      </a>
                      <span>({featuredWish.supporters || 0} supporters)</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                      onClick={() => { setShowSupportModal(featuredWish.id); setSupportAmount(''); setSupportError(''); }}
                    >
                      Grant Wish
                    </motion.button>
                  </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-center py-8">No featured wish yet.</div>
                )}
              </div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-orange-300 to-rose-300 rounded-xl blur-xl opacity-40 -z-10"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-br from-white to-orange-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Wish Categories
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover wishes that resonate with your desire to help. Filter by category to find what moves you.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, i) => (
                <motion.button
                  key={i}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                    activeCategory === i 
                      ? 'bg-gradient-to-br from-orange-100 to-rose-100 border-2 border-orange-300 shadow-md' 
                      : 'bg-white hover:bg-orange-50 border border-orange-100'
                  }`}
                  onClick={() => setActiveCategory(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                    activeCategory === i 
                      ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white' 
                      : 'bg-orange-100 text-orange-500'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Wishes */}
        <section id="explore" className="w-full py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex justify-between items-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                    Featured Wishes
                  </span>
                </h2>
                <p className="text-gray-600">Wishes that need your support right now</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-orange-500 font-medium"
              >
                View all wishes <ChevronRight size={18} />
              </motion.button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">No wishes yet.</div>
              ) : wishes.map((wish, i) => {
                  const percent = Math.round((wish.raisedAmount || 0) / (wish.targetAmount || 1) * 100);
                  const creator = users[wish.createdBy] || {};
                  return (
                    <motion.div
                      key={wish.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="h-48 bg-gray-200 border-2 border-dashed flex items-center justify-center overflow-hidden">
                        {wish.imageUrl ? (
                          <Image src={wish.imageUrl} alt={wish.title} width={384} height={192} className="object-cover w-full h-full" />
                        ) : (
                          <Gift className="text-orange-200" size={48} />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-xl">{wish.title}</h3>
                          {wish.verified && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-orange-500 mb-3">
                          {/* Optionally show category icon */}
                          <span>{wish.category}</span>
                        </div>
                        <p className="text-gray-700 mb-6">{wish.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">${wish.raisedAmount || 0} raised of ${wish.targetAmount || 0}</span>
                            <span className="text-sm font-medium text-orange-600">{percent}%</span>
                          </div>
                          <div className="w-full bg-orange-100 rounded-full h-2.5">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percent}%` }}
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-500">
                            <a href={`/profile/${wish.createdBy}`} className="font-medium text-orange-500 hover:underline">
                              {creator.displayName || 'User'}
                            </a>
                            <span className="text-xs">({wish.supporters || 0} supporters)</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                            onClick={() => { setShowSupportModal(wish.id); setSupportAmount(''); setSupportError(''); }}
                          >
                            Support Wish
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
        {/* Support Wish Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center border border-orange-100 relative">
              <button className="absolute top-2 right-2 text-orange-400 hover:text-orange-600" onClick={() => setShowSupportModal(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-orange-500">Support Wish</h3>
              <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); const wish = wishes.find(w => w.id === showSupportModal); if (wish) handleSupportWish(wish, Number(supportAmount)); }}>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Amount (tokens)</label>
                  <input type="number" min="1" value={supportAmount} onChange={e => setSupportAmount(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
                </div>
                <div className="text-sm text-gray-500">Your balance: <span className="font-bold text-orange-500">{userTokens}</span> tokens</div>
                {supportError && <div className="text-red-500 text-sm">{supportError}</div>}
                <button type="submit" className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium shadow hover:shadow-orange-200 transition-all mt-2" disabled={supportLoading === showSupportModal}>
                  {supportLoading === showSupportModal ? 'Processing...' : 'Support'}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 px-4 bg-gradient-to-br from-white to-rose-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  How WishBridge Works
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A seamless journey from wish to fulfillment. Our platform makes generosity simple and impactful.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-1 bg-gradient-to-r from-orange-300 to-rose-300 rounded-full hidden md:block"></div>
              
              {[
                {
                  icon: <Gift className="text-white" size={32} />,
                  title: "Post a Wish",
                  description: "Sign up, share your story, and let the world know what you need—be it education, essentials, or a dream.",
                  color: "from-orange-400 to-orange-500"
                },
                {
                  icon: <ShieldCheck className="text-white" size={32} />,
                  title: "Verified & Safe",
                  description: "Our team and AI ensure every wish is genuine. Look for the Trust Badge for verified wishes.",
                  color: "from-rose-400 to-rose-500"
                },
                {
                  icon: <Heart className="text-white" size={32} />,
                  title: "Grant a Wish",
                  description: "Browse, filter, and grant wishes—anonymously or publicly. Track your impact and earn karma points!",
                  color: "from-orange-400 to-rose-400"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-orange-100 z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mt-8 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <motion.div 
                    className="text-xs font-medium text-orange-500 flex items-center gap-1"
                    whileHover={{ gap: 4 }}
                  >
                    Learn more <ChevronRight size={16} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Why Choose WishBridge?
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We&apos;re redefining generosity with technology, trust, and heartfelt connections.
              </p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Our Features</h3>
                  <div className="space-y-4">
                    {features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          activeFeature === i 
                            ? 'bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 shadow-sm' 
                            : 'hover:bg-orange-50'
                        }`}
                        onClick={() => setActiveFeature(i)}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            activeFeature === i 
                              ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white' 
                              : 'bg-orange-100 text-orange-500'
                          }`}>
                            {feature.icon}
                          </div>
                          <span className={`font-medium ${
                            activeFeature === i ? 'text-orange-600' : 'text-gray-700'
                          }`}>
                            {feature.title}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="md:w-2/3 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl shadow-xl p-8 flex items-center justify-center relative overflow-hidden"
                animate={controls}
                initial={{ opacity: 0, y: 20 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-rose-400"></div>
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-rose-400 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {features[activeFeature].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                  >
                    Learn More
                  </motion.button>
                </div>
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {features.map((_, i) => (
                    <button 
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        activeFeature === i 
                          ? 'bg-gradient-to-r from-orange-500 to-rose-500' 
                          : 'bg-orange-200'
                      }`}
                      onClick={() => setActiveFeature(i)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 px-4 bg-gradient-to-br from-white to-orange-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  Heartwarming Stories
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how WishBridge has transformed lives and created moments of joy.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {stories.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">No fulfilled wishes yet.</div>
              ) : stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  className="bg-orange-100 rounded-2xl shadow-lg p-8 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-orange-300 to-rose-300 rounded-bl-full opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white overflow-hidden">
                        {story.imageUrl ? (
                          <Image src={story.imageUrl} alt={story.title} width={48} height={48} className="object-cover w-full h-full rounded-full" />
                        ) : (
                          story.title?.charAt(0) || 'W'
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold">{story.title}</h4>
                        <p className="text-sm text-gray-600">{users[story.createdBy]?.displayName || 'Wish Recipient'}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-6">&quot;{story.description.replace("'", "&apos;")}&quot;</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={j < 4 ? "text-orange-500 fill-current" : "text-orange-300"} 
                          size={16} 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full py-16 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full"></div>
              </div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make Magic Happen?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                  Join our community of dream-makers and experience the joy of giving and receiving.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a 
                    href="#"
                    className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Become a Donor <Heart className="text-rose-500" size={20} />
                    </span>
                  </motion.a>
                  <motion.a 
                    href="#"
                    className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Post a Wish <Gift className="text-orange-300" size={20} />
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-white border-t border-orange-100 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="text-orange-500" size={32} />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                    WishBridge
                  </h3>
                </div>
                <p className="text-gray-600 max-w-md mb-6">
                  Connecting dreams with generosity. A platform where wishes find their guardians and kindness transforms lives.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: <Twitter className="text-orange-500" size={20} />, url: "#" },
                    { icon: <Facebook className="text-orange-500" size={20} />, url: "#" },
                    { icon: <Instagram className="text-orange-500" size={20} />, url: "#" },
                    { icon: <Mail className="text-orange-500" size={20} />, url: "#" }
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
              </div>
              
              {[
                {
                  title: "Platform",
                  links: ["Explore Wishes", "How It Works", "Success Stories", "For Businesses"]
                },
                {
                  title: "Company",
                  links: ["About Us", "Careers", "Press", "Contact"]
                },
                {
                  title: "Resources",
                  links: ["Help Center", "Blog", "Trust & Safety", "FAQ"]
                }
              ].map((column, i) => (
                <div key={i}>
                  <h4 className="text-lg font-bold mb-6 text-gray-800">{column.title}</h4>
                  <ul className="space-y-3">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a 
                          href="#" 
                          className="text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-orange-100 text-center text-gray-600">
              <p>
                © {new Date().getFullYear()} WishBridge. Making wishes come true, one gift at a time.
              </p>
            </div>
          </div>
        </footer>

        {/* Post Wish Modal */}
        {showPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center border border-orange-100 relative">
              <button className="absolute top-2 right-2 text-orange-400 hover:text-orange-600" onClick={() => setShowPostModal(false)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-orange-500">Post a Wish</h3>
              <form className="w-full flex flex-col gap-4" onSubmit={handlePostWish}>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Title</label>
                  <input type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <textarea value={postDesc} onChange={e => setPostDesc(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  <select value={postCategory} onChange={e => setPostCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50">
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Target Amount ($)</label>
                  <input type="number" min="1" value={postTarget} onChange={e => setPostTarget(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Image URL (optional)</label>
                  <input type="url" value={postImage} onChange={e => setPostImage(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" placeholder="https://..." />
                </div>
                {postError && <div className="text-red-500 text-sm">{postError}</div>}
                <button type="submit" className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium shadow hover:shadow-orange-200 transition-all mt-2" disabled={postLoading}>
                  {postLoading ? 'Posting...' : 'Post Wish'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}