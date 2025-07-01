'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Gift, Heart, Star, ShieldCheck, Search, User, ChevronRight, Sparkles, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import Header from '../components/layout/Header';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const controls = useAnimation();

  const features = [
    {
      title: "Wish Categories",
      description: "Education, Health, Essentials, Gifts, Dreams, Emergency, and more.",
      icon: <Search className="text-rose-500" size={24} />
    },
    {
      title: "Trust & Safety",
      description: "AI + Human moderation, KYC, and anti-fraud monitoring for a safe experience.",
      icon: <ShieldCheck className="text-orange-500" size={24} />
    },
    {
      title: "Impact Stories",
      description: "See the difference you make with post-fulfillment photos and videos.",
      icon: <Heart className="text-rose-500" size={24} />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [activeFeature, controls]);

  // Floating Particles
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
      {/* Only one Header is rendered here now */}

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

      <Header />
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 px-4 flex flex-col items-center justify-center">
        <div className="absolute -top-20 right-0 w-72 h-72 bg-gradient-to-r from-orange-300 to-rose-300 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-20 left-0 w-64 h-64 bg-gradient-to-r from-rose-300 to-orange-300 rounded-full blur-3xl opacity-30 -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-4xl"
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
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Connect Hearts, Fulfill Dreams
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-xl text-gray-700 max-w-2xl mb-10"
          >
            A revolutionary platform where generosity meets aspiration. Post your wish, grant someone&apos;s dream, and create meaningful connections.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#post"
              className="relative bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-orange-200 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Post a Wish</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>

            <motion.a
              href="#explore"
              className="relative bg-white text-orange-500 border-2 border-orange-300 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Wishes <ChevronRight size={20} />
              </span>
              <div className="absolute inset-0 bg-orange-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[1, 2, 3, 4].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="text-orange-500" size={20} />
                </div>
                <div>
                  <h3 className="font-bold">24K+</h3>
                  <p className="text-sm text-gray-600">Wishes Granted</p>
                </div>
              </div>
              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.random() * 50 + 50}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <motion.section
        id="explore"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full py-16 md:py-24 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
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
                <p className="text-gray-600 mb-6">{item.description.replace("'", "&apos;")}</p>
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
      </motion.section>

      {/* Why WishBridge Section */}
      <motion.section
        id="post"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-white to-orange-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Why Choose WishBridge?
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re redefining generosity with technology, trust, and heartfelt connections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-orange-100 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-orange-200 to-rose-200 rounded-full blur-3xl opacity-20 -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <User className="text-orange-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">For Wish Makers</h3>
                  <ul className="space-y-4">
                    {[
                      "Real people, real stories, real impact",
                      "Verified wishes for trust and safety",
                      "Anonymous or public giving—your choice",
                      "Progress tracking and impact stories"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="bg-orange-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span>{item.replace("'", "&apos;")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-rose-50 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-rose-100 relative overflow-hidden"
            >
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-r from-rose-200 to-orange-200 rounded-full blur-3xl opacity-20 -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-xl">
                  <Heart className="text-rose-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">For Wish Granters</h3>
                  <ul className="space-y-4">
                    {[
                      "Karma points, badges, and top donor features",
                      "Platform handles logistics for tangible gifts",
                      "Anti-fraud AI and human moderation",
                      "Privacy and anonymity respected for all"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="bg-rose-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        </div>
                        <span>{item.replace("'", "&apos;")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full py-16 md:py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to make wishes come true and track your impact.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Explore Our Features</h3>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${activeFeature === i
                          ? 'bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 shadow-sm'
                          : 'hover:bg-orange-50'
                        }`}
                      onClick={() => setActiveFeature(i)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeFeature === i
                            ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white'
                            : 'bg-orange-100 text-orange-500'
                          }`}>
                          {feature.icon}
                        </div>
                        <span className={`font-medium ${activeFeature === i ? 'text-orange-600' : 'text-gray-700'
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
                  {features[activeFeature].description.replace("'", "&apos;")}
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
                    className={`w-3 h-3 rounded-full transition-colors ${activeFeature === i
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
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-white to-orange-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
            {[
              {
                name: "Sarah Johnson",
                role: "Wish Recipient",
                quote: "Thanks to a kind stranger on WishBridge, I received the laptop I needed for my studies. This platform restored my faith in humanity!",
                color: "bg-orange-100"
              },
              {
                name: "Michael Rodriguez",
                role: "Wish Granter",
                quote: "Granting wishes on WishBridge has been incredibly fulfilling. Seeing the impact photos makes every donation worthwhile.",
                color: "bg-rose-100"
              },
              {
                name: "Emma Thompson",
                role: "Wish Recipient",
                quote: "When our house burned down, WishBridge connected us with people who helped us rebuild our lives. Forever grateful!",
                color: "bg-orange-100"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className={`${testimonial.color} rounded-2xl shadow-lg p-8 relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-orange-300 to-rose-300 rounded-bl-full opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
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
      </motion.section>

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
    </div>
  );
}