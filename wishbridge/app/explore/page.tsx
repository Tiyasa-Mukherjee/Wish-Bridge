"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Gift, Heart, Search, User, Plus, ChevronRight, BookOpen, Stethoscope, House, Palette, AlertTriangle, GraduationCap, Bike, Smile, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const categories = [
	{ name: "Education", icon: <BookOpen className="text-orange-500" size={20} /> },
	{ name: "Health", icon: <Stethoscope className="text-rose-500" size={20} /> },
	{ name: "Essentials", icon: <House className="text-orange-500" size={20} /> },
	{ name: "Dreams", icon: <Palette className="text-orange-500" size={20} /> },
	{ name: "Emergency", icon: <AlertTriangle className="text-rose-500" size={20} /> },
];

const wishes = [
	{
		title: "Laptop for Online Classes",
		category: "Education",
		icon: <GraduationCap className="text-orange-500" size={20} />,
		description: "A laptop would help me complete assignments and attend lectures.",
		target: 800,
		raised: 420,
		supporters: 24,
		verified: true,
		image: null,
	},
	{
		title: "Bicycle for School Commute",
		category: "Education",
		icon: <Bike className="text-orange-500" size={20} />,
		description: "I walk 5km daily to school. A bicycle would save time and energy for studying.",
		target: 120,
		raised: 75,
		supporters: 12,
		verified: false,
		image: null,
	},
	{
		title: "Medical Treatment for Dog",
		category: "Emergency",
		icon: <AlertTriangle className="text-rose-500" size={20} />,
		description: "My dog needs surgery after an accident. Help us save our family member.",
		target: 800,
		raised: 420,
		supporters: 18,
		verified: true,
		image: null,
	},
	{
		title: "Art Supplies for Community Class",
		category: "Dreams",
		icon: <Palette className="text-orange-500" size={20} />,
		description: "Supplies for free art classes for underprivileged children in our neighborhood.",
		target: 200,
		raised: 90,
		supporters: 8,
		verified: false,
		image: null,
	},
	{
		title: "Winter Jacket for My Son",
		category: "Essentials",
		icon: <House className="text-orange-500" size={20} />,
		description: "My 8-year-old son needs a warm winter jacket as temperatures drop.",
		target: 60,
		raised: 35,
		supporters: 5,
		verified: false,
		image: null,
	},
	{
		title: "Smile Surgery for Little Aanya",
		category: "Health",
		icon: <Smile className="text-rose-500" size={20} />,
		description: "Aanya needs cleft surgery to smile with confidence.",
		target: 1500,
		raised: 900,
		supporters: 30,
		verified: true,
		image: null,
	},
];

export default function Explore() {
	const [activeCategory, setActiveCategory] = useState(-1);
	const filteredWishes = activeCategory === -1 ? wishes : wishes.filter(w => w.category === categories[activeCategory].name);

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
				<Header />
				{/* Wishes Grid */}
				<main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.1 } },
						}}
					>
						{filteredWishes.map((wish, i) => (
							<motion.div
								key={i}
								className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 flex flex-col"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(255,112,46,0.10), 0 1.5px 8px 0 rgba(249,168,212,0.10)' }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
							>
								<div className="h-44 bg-gray-100 border-b border-orange-50 flex items-center justify-center">
									{wish.icon}
								</div>
								<div className="p-6 flex-1 flex flex-col">
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-bold text-lg flex items-center gap-2">
											{wish.title}
											{wish.verified && (
												<span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Verified</span>
											)}
										</h3>
										<span className="text-orange-500 text-xs font-semibold flex items-center gap-1">{wish.category}</span>
									</div>
									<p className="text-gray-700 mb-4 flex-1">{wish.description}</p>
									<div className="mb-3">
										<div className="flex justify-between items-center mb-1">
											<span className="text-sm font-medium text-gray-700">${wish.raised} raised of ${wish.target}</span>
											<span className="text-sm font-medium text-orange-600">{Math.round((wish.raised / wish.target) * 100)}%</span>
										</div>
										<div className="w-full bg-orange-100 rounded-full h-2.5">
											<motion.div
												className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
												initial={{ width: 0 }}
												whileInView={{ width: `${(wish.raised / wish.target) * 100}%` }}
												transition={{ duration: 1.2 }}
											/>
										</div>
									</div>
									<div className="flex justify-between items-center mt-2">
										<div className="flex items-center gap-2 text-gray-500">
											<Heart className="text-rose-400" size={18} />
											<span className="text-xs">{wish.supporters} supporters</span>
										</div>
										<motion.button
											whileHover={{ scale: 1.05 }}
											className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full text-xs font-medium shadow-md"
										>
											Support Wish
										</motion.button>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
					{filteredWishes.length === 0 && (
						<div className="text-center text-gray-500 py-20 text-lg flex flex-col items-center">
							<Star className="text-orange-300 mb-2" size={32} />
							No wishes found in this category yet. Be the first to post!
						</div>
					)}
				</main>

				{/* CTA */}
				<section className="w-full py-16 px-4">
					<div className="max-w-3xl mx-auto">
						<div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
							<motion.div
								className="relative z-10"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
							>
								<h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
								<p className="max-w-2xl mx-auto mb-8">
									Join our community of wish granters and bring joy to someone's life today.
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
				</section>
			</div>
		</ProtectedRoute>
	);
}
