"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Gift, Heart, BookOpen, Stethoscope, House, Palette, AlertTriangle, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';

const categories = [
	{ name: "Education", icon: <BookOpen className="text-orange-500" size={20} /> },
	{ name: "Health", icon: <Stethoscope className="text-rose-500" size={20} /> },
	{ name: "Essentials", icon: <House className="text-orange-500" size={20} /> },
	{ name: "Gifts", icon: <Gift className="text-rose-500" size={20} /> },
	{ name: "Dreams", icon: <Palette className="text-orange-500" size={20} /> },
	{ name: "Emergency", icon: <AlertTriangle className="text-rose-500" size={20} /> },
];

const sortOptions = [
	{ label: "Newest", value: "newest" },
	{ label: "Amount Needed (Low to High)", value: "amountAsc" },
	{ label: "Amount Needed (High to Low)", value: "amountDesc" },
	{ label: "% Completed (Low to High)", value: "percentAsc" },
	{ label: "% Completed (High to Low)", value: "percentDesc" },
];

export default function Explore() {
	const { user } = useAuth();
	const [activeCategory, setActiveCategory] = useState(-1);
	const [wishes, setWishes] = useState<any[]>([]);
	const [users, setUsers] = useState<{ [uid: string]: any }>({});
	const [loading, setLoading] = useState(true);
	const [sortBy, setSortBy] = useState("newest");
	const [editWishId, setEditWishId] = useState<string | null>(null);
	const [editFields, setEditFields] = useState<any>({});
	const [editLoading, setEditLoading] = useState(false);
	const [editError, setEditError] = useState('');

	useEffect(() => {
		async function fetchWishes() {
			setLoading(true);
			const wishesQuery = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
			const wishesSnap = await getDocs(wishesQuery);
			const wishList: any[] = [];
			const userIds = new Set<string>();
			wishesSnap.forEach((doc) => {
				const data = doc.data();
				wishList.push({ id: doc.id, ...data });
				if (data.createdBy) userIds.add(data.createdBy);
			});
			setWishes(wishList);
			// Fetch user info for wish creators
			const userMap: { [uid: string]: any } = {};
			await Promise.all(
				Array.from(userIds).map(async (uid) => {
					const userDoc = await getDoc(doc(db, "users", uid));
					if (userDoc.exists()) userMap[uid] = userDoc.data();
				})
			);
			setUsers(userMap);
			setLoading(false);
		}
		fetchWishes();
	}, []);

	const filteredWishes =
		activeCategory === -1
			? wishes
			: wishes.filter((w) => w.category === categories[activeCategory].name);

	// Sorting logic
	const sortedWishes = [...filteredWishes].sort((a, b) => {
		if (sortBy === "amountAsc") {
			return (a.targetAmount || 0) - (b.targetAmount || 0);
		} else if (sortBy === "amountDesc") {
			return (b.targetAmount || 0) - (a.targetAmount || 0);
		} else if (sortBy === "percentAsc") {
			const pa = (a.raisedAmount || 0) / Math.max(1, a.targetAmount || 1);
			const pb = (b.raisedAmount || 0) / Math.max(1, b.targetAmount || 1);
			return pa - pb;
		} else if (sortBy === "percentDesc") {
			const pa = (a.raisedAmount || 0) / Math.max(1, a.targetAmount || 1);
			const pb = (b.raisedAmount || 0) / Math.max(1, b.targetAmount || 1);
			return pb - pa;
		}
		// Default: newest (already sorted by createdAt desc from Firestore)
		return 0;
	});

	// Edit wish handler
	async function handleEditWishSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!editWishId) return;
		setEditLoading(true);
		setEditError('');
		try {
			const wishRef = doc(db, 'wishes', editWishId);
			await updateDoc(wishRef, {
				title: editFields.title,
				description: editFields.description,
				category: editFields.category,
				targetAmount: Number(editFields.targetAmount),
				imageUrl: editFields.imageUrl || '',
			});
			setEditWishId(null);
			setEditFields({});
			// Refresh wishes
			const wishesQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
			const wishesSnap = await getDocs(wishesQuery);
			const wishList: any[] = [];
			const userIds = new Set<string>();
			wishesSnap.forEach((doc) => {
				const data = doc.data();
				wishList.push({ id: doc.id, ...data });
				if (data.createdBy) userIds.add(data.createdBy);
			});
			setWishes(wishList);
			const userMap: { [uid: string]: any } = {};
			await Promise.all(
				Array.from(userIds).map(async (uid) => {
					const userDoc = await getDoc(doc(db, 'users', uid));
					if (userDoc.exists()) userMap[uid] = userDoc.data();
				})
			);
			setUsers(userMap);
		} catch (err: any) {
			setEditError(err.message || 'Failed to update wish');
		} finally {
			setEditLoading(false);
		}
	}

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col overflow-x-hidden">
				<Header />
				{/* Category Filter & Sort */}
				<div className="max-w-7xl mx-auto px-4 pt-10 pb-2">
					<div className="flex flex-wrap gap-3 justify-center mb-8">
						<button
							className={`px-4 py-2 rounded-full font-medium border transition-all text-sm ${
								activeCategory === -1
									? "bg-gradient-to-r from-orange-400 to-rose-400 text-white border-orange-400"
									: "bg-white text-orange-500 border-orange-200 hover:bg-orange-50"
							}`}
							onClick={() => setActiveCategory(-1)}
						>
							All
						</button>
						{categories.map((cat, i) => (
							<button
								key={i}
								className={`px-4 py-2 rounded-full font-medium border transition-all text-sm flex items-center gap-2 ${
									activeCategory === i
										? "bg-gradient-to-r from-orange-400 to-rose-400 text-white border-orange-400"
										: "bg-white text-orange-500 border-orange-200 hover:bg-orange-50"
								}`}
								onClick={() => setActiveCategory(i)}
							>
								{cat.icon}
								{cat.name}
							</button>
						))}
					</div>
					<div className="flex justify-end mb-4">
						<label className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
						<select
							value={sortBy}
							onChange={e => setSortBy(e.target.value)}
							className="px-3 py-2 rounded-xl border border-orange-200 bg-white text-orange-500 text-sm font-medium focus:ring-2 focus:ring-orange-300 outline-none"
						>
							{sortOptions.map(opt => (
								<option key={opt.value} value={opt.value}>{opt.label}</option>
							))}
						</select>
					</div>
				</div>
				{/* Wishes Grid */}
				<main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
					{loading ? (
						<div className="text-center text-gray-400 py-20">Loading wishes...</div>
					) : (
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: {},
								visible: { transition: { staggerChildren: 0.1 } },
							}}
						>
							{sortedWishes.length === 0 ? (
								<div className="col-span-full text-center text-gray-400 py-20">
									<Star className="text-orange-300 mb-2" size={32} />
									No wishes found in this category yet. Be the first to post!
								</div>
							) : (
								sortedWishes.map((wish, i) => {
									const percent = Math.round((wish.raisedAmount || 0) / (wish.targetAmount || 1) * 100);
									const creator = users[wish.createdBy] || {};
									const isOwner = user && wish.createdBy === user.uid;
									return (
										<motion.div
											key={wish.id}
											className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 flex flex-col"
											initial={{ opacity: 0, y: 30 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(255,112,46,0.10), 0 1.5px 8px 0 rgba(249,168,212,0.10)' }}
											transition={{ duration: 0.5, delay: i * 0.1 }}
										>
											<div className="h-44 bg-gray-100 border-b border-orange-50 flex items-center justify-center overflow-hidden">
												{wish.imageUrl ? (
													<img src={wish.imageUrl} alt={wish.title} className="object-cover w-full h-full" />
												) : (
													<Gift className="text-orange-200" size={48} />
												)}
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
														<span className="text-sm font-medium text-gray-700">${wish.raisedAmount || 0} raised of ${wish.targetAmount || 0}</span>
														<span className="text-sm font-medium text-orange-600">{percent}%</span>
													</div>
													<div className="w-full bg-orange-100 rounded-full h-2.5">
														<motion.div
															className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
															initial={{ width: 0 }}
															whileInView={{ width: `${percent}%` }}
															transition={{ duration: 1.2 }}
														/>
													</div>
												</div>
												{/* In the wish card button row, improve alignment and style */}
												<div className="flex justify-between items-center mt-2">
													<div className="flex items-center gap-2 text-gray-500">
														<a href={`/profile/${wish.createdBy}`} className="font-medium text-orange-500 hover:underline">
															{creator.displayName || 'User'}
														</a>
														<span className="text-xs">({wish.supporters || 0} supporters)</span>
													</div>
													<div className="flex gap-2 items-center">
														<motion.button
															whileHover={{ scale: 1.05 }}
															className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
															style={{ minWidth: 110 }}
															disabled
														>
															<Heart className="inline-block mr-1 -mt-0.5" size={16} /> Support 
														</motion.button>
														{isOwner && (
															<motion.button
																whileHover={{ scale: 1.05 }}
																className="bg-white border border-orange-300 text-orange-500 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-50"
																style={{ minWidth: 80 }}
																onClick={() => {
																	setEditWishId(wish.id);
																	setEditFields({
																		title: wish.title,
																		description: wish.description,
																		category: wish.category,
																		targetAmount: wish.targetAmount,
																		imageUrl: wish.imageUrl || '',
																	});
																}}
															>
																Edit
															</motion.button>
														)}
													</div>
												</div>
											</div>
										</motion.div>
									);
								})
							)}
						</motion.div>
					)}
				</main>
				{/* Edit Wish Modal */}
				{editWishId && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
						<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center border border-orange-100 relative">
							<button className="absolute top-2 right-2 text-orange-400 hover:text-orange-600" onClick={() => setEditWishId(null)}>&times;</button>
							<h3 className="text-xl font-bold mb-4 text-orange-500">Edit Wish</h3>
							<form className="w-full flex flex-col gap-4" onSubmit={handleEditWishSubmit}>
								<div>
									<label className="block text-gray-700 font-medium mb-1">Title</label>
									<input type="text" value={editFields.title || ''} onChange={e => setEditFields((f: any) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
								</div>
								<div>
									<label className="block text-gray-700 font-medium mb-1">Description</label>
									<textarea value={editFields.description || ''} onChange={e => setEditFields((f: any) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
								</div>
								<div>
									<label className="block text-gray-700 font-medium mb-1">Category</label>
									<select value={editFields.category || ''} onChange={e => setEditFields((f: any) => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50">
										{categories.map((cat, i) => (
											<option key={i} value={cat.name}>{cat.name}</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-gray-700 font-medium mb-1">Target Amount ($)</label>
									<input type="number" min="1" value={editFields.targetAmount || ''} onChange={e => setEditFields((f: any) => ({ ...f, targetAmount: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" required />
								</div>
								<div>
									<label className="block text-gray-700 font-medium mb-1">Image URL (optional)</label>
									<input type="url" value={editFields.imageUrl || ''} onChange={e => setEditFields((f: any) => ({ ...f, imageUrl: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50" placeholder="https://..." />
								</div>
								{editError && <div className="text-red-500 text-sm">{editError}</div>}
								<button type="submit" className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium shadow hover:shadow-orange-200 transition-all mt-2" disabled={editLoading}>
									{editLoading ? 'Saving...' : 'Save Changes'}
								</button>
							</form>
						</div>
					</div>
				)}
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
