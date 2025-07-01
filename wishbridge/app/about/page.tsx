'use client';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { Gift, Heart, Star, Users, Globe, ShieldCheck, BookOpen, Sparkles, Smile, HandHeart, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ProtectedRoute from "@/components/common/ProtectedRoute";

// Define a type for the particle objects
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

export default function AboutPage() {
  // Generate random values for particles only on the client
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
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Header />

        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 px-4">
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
                <span className="text-orange-500 font-medium">Our Story of Kindness</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Where Generosity Meets Aspiration
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-gray-700 mb-8"
              >
                WishBridge was born from a simple idea: that technology can create meaningful human connections. We believe in the power of generosity to transform lives and build communities.
              </motion.p>
              
              <div className="flex items-center gap-6">
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">24K+</div>
                    <div className="text-gray-600">Wishes Granted</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">120+</div>
                    <div className="text-gray-600">Countries</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-orange-400 to-rose-400 rounded-3xl overflow-hidden h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="relative z-10 text-white text-center p-8">
                  <Heart className="mx-auto mb-6" size={48} />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-xl max-w-md mx-auto">
                    To create a world where no wish goes unheard and every act of kindness finds its purpose.
                  </p>
                </div>
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-xl blur-xl opacity-20 -z-10"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-white to-orange-50">
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
                  Our Journey
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From a simple idea to a global movement of kindness
              </p>
            </motion.div>
            
            <div className="relative pl-8 border-l-4 border-orange-200 ml-4">
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full -translate-x-1/2"></div>
              
              <div className="space-y-16">
                {[
                  {
                    year: "2020",
                    title: "The Spark of an Idea",
                    description: "Founder Sarah Chen witnessed how small acts of kindness transformed her community during a crisis. She envisioned a platform to scale this impact globally.",
                    icon: <Sparkles className="text-orange-500" size={24} />
                  },
                  {
                    year: "2021",
                    title: "First Prototype",
                    description: "With a small team of volunteers, we built the first version of WishBridge. Our beta launch connected 100 wish makers with granters in 3 countries.",
                    icon: <BookOpen className="text-rose-500" size={24} />
                  },
                  {
                    year: "2022",
                    title: "Going Global",
                    description: "After securing seed funding, we expanded to 20 countries. Our verification system was developed to ensure trust and safety for all users.",
                    icon: <Globe className="text-orange-500" size={24} />
                  },
                  {
                    year: "2023",
                    title: "Impact Recognition",
                    description: "WishBridge was awarded the Global Innovation Prize for Social Good. We celebrated our 10,000th granted wish with a worldwide campaign.",
                    icon: <Star className="text-rose-500" size={24} />
                  },
                  {
                    year: "Today",
                    title: "The Journey Continues",
                    description: "With a team of 45 across 12 countries, we're building new features to deepen connections and expand our impact. Every day brings new stories of hope.",
                    icon: <Heart className="text-orange-500" size={24} />
                  }
                ].map((milestone, i) => (
                  <motion.div 
                    key={i}
                    className="relative pl-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center -translate-x-1/2">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-orange-500 font-bold">{milestone.year}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            {milestone.icon}
                          </div>
                          <h3 className="text-xl font-bold">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-rose-50 to-orange-50">
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
                  Our Core Values
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Compassion First",
                  description: "We approach every interaction with empathy and understanding, recognizing the humanity in each wish.",
                  icon: <Heart className="text-white" size={24} />,
                  color: "from-rose-400 to-rose-500"
                },
                {
                  title: "Radical Transparency",
                  description: "We build trust through openness about our processes, fees, and impact metrics.",
                  icon: <ShieldCheck className="text-white" size={24} />,
                  color: "from-orange-400 to-orange-500"
                },
                {
                  title: "Inclusive Generosity",
                  description: "We believe everyone has something to give, and every genuine need deserves to be heard.",
                  icon: <Users className="text-white" size={24} />,
                  color: "from-orange-400 to-rose-400"
                },
                {
                  title: "Joyful Impact",
                  description: "We celebrate every connection made and every wish fulfilled as a victory for human kindness.",
                  icon: <Smile className="text-white" size={24} />,
                  color: "from-rose-400 to-rose-500"
                },
                {
                  title: "Innovative Trust",
                  description: "We combine cutting-edge technology with human insight to create a safe giving environment.",
                  icon: <Globe className="text-white" size={24} />,
                  color: "from-orange-500 to-orange-600"
                },
                {
                  title: "Community Power",
                  description: "We foster connections that go beyond transactions to build supportive networks.",
                  icon: <HandHeart className="text-white" size={24} />,
                  color: "from-orange-400 to-rose-500"
                }
              ].map((value, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl p-8 flex flex-col border border-orange-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 mb-6">{value.description}</p>
                  <div className="mt-auto">
                    <div className="w-full h-1 bg-orange-100 rounded-full">
                      <div className={`h-full bg-gradient-to-r ${value.color} rounded-full`} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-white to-orange-50">
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
                  Meet Our Team
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Passionate individuals united by a vision of global generosity
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Founder & CEO",
                  bio: "Former social worker turned tech entrepreneur. Believes technology should serve human connection.",
                  color: "bg-gradient-to-r from-orange-400 to-rose-400"
                },
                {
                  name: "Michael Rodriguez",
                  role: "CTO",
                  bio: "Tech visionary with 15 years experience building secure, scalable platforms for social impact.",
                  color: "bg-gradient-to-r from-orange-500 to-orange-600"
                },
                {
                  name: "Priya Patel",
                  role: "Head of Community",
                  bio: "Community builder who creates spaces where kindness flourishes and connections deepen.",
                  color: "bg-gradient-to-r from-rose-400 to-rose-500"
                },
                {
                  name: "David Kim",
                  role: "Trust & Safety Lead",
                  bio: "Developed our verification system to protect both wish makers and granters.",
                  color: "bg-gradient-to-r from-orange-400 to-rose-500"
                }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`h-32 ${member.color}`}></div>
                  <div className="p-6 -mt-16">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-white mx-auto mb-4 shadow-lg">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                    <p className="text-orange-500 text-center mb-4">{member.role}</p>
                    <p className="text-gray-600 text-center">{member.bio}</p>
                    
                    <div className="flex justify-center gap-3 mt-6">
                      {[Twitter, Instagram, Mail].map((Icon, j) => (
                        <motion.a 
                          key={j}
                          href="#"
                          className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                          whileHover={{ y: -3 }}
                        >
                          <Icon className="text-orange-500" size={16} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-8 border border-orange-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Join Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  We're always looking for passionate individuals who believe in the power of generosity. If you want to use your skills to create meaningful connections around the world, we'd love to hear from you.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                >
                  View Open Positions
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Impact */}
        <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-rose-50 to-orange-50">
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
                  Global Impact
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Numbers that tell the story of kindness in action
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  value: "24,581",
                  label: "Wishes Granted",
                  icon: <Gift className="text-white" size={24} />,
                  color: "from-orange-400 to-orange-500"
                },
                {
                  value: "120+",
                  label: "Countries",
                  icon: <Globe className="text-white" size={24} />,
                  color: "from-rose-400 to-rose-500"
                },
                {
                  value: "89%",
                  label: "Verified Wishes",
                  icon: <ShieldCheck className="text-white" size={24} />,
                  color: "from-orange-400 to-rose-400"
                },
                {
                  value: "98.7%",
                  label: "Happy Users",
                  icon: <Smile className="text-white" size={24} />,
                  color: "from-orange-500 to-rose-500"
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-orange-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Be Part of the Kindness Revolution</h2>
                <p className="max-w-2xl mx-auto mb-8">
                  Join our global community of wish makers and granters who are transforming lives through simple acts of generosity.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a 
                    href="#"
                    className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Join WishBridge <Heart className="text-rose-500" size={20} />
                    </span>
                  </motion.a>
                  <motion.a 
                    href="#"
                    className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Our Impact Stories <Gift className="text-orange-300" size={20} />
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
    </ProtectedRoute>
  );
}