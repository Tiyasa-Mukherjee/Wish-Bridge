'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, User, Gift, Plus, Menu, X } from 'lucide-react';

const navItems = [
	{ label: 'Home', href: '#' },
	{ label: 'Explore', href: '#explore' },
	{ label: 'How It Works', href: '#how' },
	{ label: 'About', href: '#about' },
	{ label: 'Contact', href: '#contact' },
];

const searchExamples = [
	'Search wishes... ',
	'Need a bicycle for school',
	'Medical help for my pet',
	'Winter jacket for my son',
	'Dreams, essentials, education...',
];

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [searchIndex, setSearchIndex] = useState(0);
	const [displayed, setDisplayed] = useState('');
	const [typing, setTyping] = useState(true);

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

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm border-b border-orange-100"
		>
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 relative">
				{/* Logo */}
				<motion.div
					whileHover={{ scale: 1.05 }}
					className="flex items-center gap-2 flex-shrink-0"
				>
					<Gift className="text-orange-500" size={32} />
					<h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
						WishBridge
					</h1>
				</motion.div>

				{/* Desktop Navigation */}
				<motion.nav
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="hidden lg:flex items-center gap-6 ml-8"
				>
					{navItems.map((item, i) => (
						<motion.a
							key={i}
							href={item.href}
							className="text-gray-700 hover:text-orange-500 font-medium relative px-2 py-1 rounded transition-colors"
							whileHover={{ scale: 1.05 }}
						>
							{item.label}
							<motion.div
								className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
								initial={{ width: 0 }}
								whileHover={{ width: '100%' }}
							/>
						</motion.a>
					))}
				</motion.nav>

				

				{/* Desktop Actions */}
				<motion.div className="hidden lg:flex items-center gap-3 flex-shrink-0">
					<motion.button
						className="text-gray-700 hover:text-orange-500 p-2 rounded-full"
						whileHover={{ scale: 1.1 }}
					>
						<Heart className="text-rose-500" size={22} />
						<span className="sr-only">Favorites</span>
					</motion.button>
					<motion.button
						className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-orange-200 transition-all"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<User size={20} />
						<span>Sign In</span>
					</motion.button>
					<motion.button
						className="primary-gradient text-white px-4 py-2 rounded-full font-medium"
						whileHover={{ scale: 1.05 }}
					>
						Post a Wish
					</motion.button>
				</motion.div>

				{/* Mobile Hamburger */}
				<button
					className="lg:hidden p-2 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors"
					onClick={() => setMobileOpen((v) => !v)}
					aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				>
					{mobileOpen ? (
						<X size={28} className="text-orange-500" />
					) : (
						<Menu size={28} className="text-orange-500" />
					)}
				</button>

				{/* Mobile Menu */}
				<AnimatePresence>
					{mobileOpen && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="fixed top-0 left-0 w-full h-full bg-white/95 z-50 flex flex-col p-6 gap-8 shadow-2xl"
						>
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-2">
									<Gift className="text-orange-500" size={28} />
									<span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
										WishBridge
									</span>
								</div>
								<button
									onClick={() => setMobileOpen(false)}
									className="p-2 rounded-full bg-orange-50 hover:bg-orange-100"
								>
									<X size={28} className="text-orange-500" />
								</button>
							</div>
							<nav className="flex flex-col gap-4">
								{navItems.map((item, i) => (
									<a
										key={i}
										href={item.href}
										className="text-lg font-medium text-gray-700 hover:text-orange-500 py-2 px-2 rounded transition-colors"
										onClick={() => setMobileOpen(false)}
									>
										{item.label}
									</a>
								))}
							</nav>
							<div className="flex flex-col gap-4 mt-6">
								<div className="relative">
									<input
										type="text"
										value={displayed}
										placeholder="Search wishes..."
										className="w-full py-2 px-4 pl-10 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
										readOnly
										style={{ letterSpacing: '0.01em', background: 'rgba(255,255,255,0.95)' }}
									/>
									<Search className="absolute left-3 top-2.5 text-orange-400" size={18} />
									<span className="absolute left-12 top-2.5 text-orange-400 animate-pulse select-none pointer-events-none">
										{displayed === '' ? '\u00A0' : ''}
									</span>
								</div>
								<button className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg">
									<User size={20} /> Sign In
								</button>
								<button className="primary-gradient text-white px-4 py-2 rounded-full font-medium">
									Post a Wish
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{/* Mobile search bar (hidden, now in menu) */}
		</motion.header>
	);
}
