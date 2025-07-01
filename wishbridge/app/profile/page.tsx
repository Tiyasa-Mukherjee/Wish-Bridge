"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, Mail, LogOut, Calendar, ShieldCheck, Edit2, Star, Heart, Gift, ArrowLeft, AlertTriangle } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { updateUserProfile } from '@/lib/userProfile';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(user?.displayName || '');
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  const [wishesPosted, setWishesPosted] = useState(0);
  const [wishesSupported, setWishesSupported] = useState(0);
  const [karmaPoints, setKarmaPoints] = useState(0);

  // Save all user data to Firestore on login or profile update
  React.useEffect(() => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
        providerData: user.providerData.map(p => ({ providerId: p.providerId, uid: p.uid, displayName: p.displayName, email: p.email, photoURL: p.photoURL })),
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
        updatedAt: new Date().toISOString(),
      };
      setDoc(doc(db, 'users', user.uid), userData, { merge: true });
    }
  }, [user]);

  // Fetch wishes posted and supported, and calculate karma points
  useEffect(() => {
    if (!user) return;
    // Fetch wishes posted by user
    async function fetchUserStats() {
      // Wishes posted
      const postedQuery = query(collection(db, 'wishes'), where('createdBy', '==', user?.uid || ''));
      const postedSnap = await getDocs(postedQuery);
      setWishesPosted(postedSnap.size);
      // Wishes supported (count unique wish ids in a 'supports' subcollection or similar, fallback: 0)
      const supported = 0;
      let karma = 0;
      // If you have a 'supports' subcollection or log, fetch here. Otherwise, fallback to 0.
      // Karma points: 10 per wish posted, 2 per wish supported
      karma = postedSnap.size * 10 + supported * 2;
      setWishesSupported(supported);
      setKarmaPoints(karma);
    }
    fetchUserStats();
  }, [user]);

  // Helper to check for a winner
  function calculateWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Handle user move
  function handleClick(idx: number) {
    if (board[idx] || gameOver) return;
    const newBoard = board.slice();
    newBoard[idx] = 'X';
    const win = calculateWinner(newBoard);
    if (win) {
      setBoard(newBoard);
      setWinner('You');
      setGameOver(true);
      return;
    }
    if (newBoard.every(cell => cell)) {
      setBoard(newBoard);
      setWinner('Draw');
      setGameOver(true);
      return;
    }
    setBoard(newBoard);
    setIsXNext(false);
    // Computer move after short delay
    setTimeout(() => {
      computerMove(newBoard);
    }, 500);
  }

  // Computer move (random empty cell)
  function computerMove(currentBoard: (string | null)[]) {
    const empty = currentBoard.map((v, i) => v ? null : i).filter(v => v !== null) as number[];
    if (empty.length === 0) return;
    const move = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = currentBoard.slice();
    newBoard[move] = 'O';
    const win = calculateWinner(newBoard);
    if (win) {
      setBoard(newBoard);
      setWinner('Computer');
      setGameOver(true);
      return;
    }
    if (newBoard.every(cell => cell)) {
      setBoard(newBoard);
      setWinner('Draw');
      setGameOver(true);
      return;
    }
    setBoard(newBoard);
    setIsXNext(true);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  }

  async function handleEditProfile(e: React.FormEvent) {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    setEditSuccess('');
    try {
      await updateUserProfile({
        uid: user!.uid,
        displayName: editName,
        photoFile: editPhoto || undefined,
      });
      setEditSuccess('Profile updated!');
      setEditOpen(false);
      // Optionally, reload page or user state
      router.refresh?.();
    } catch (err: unknown) {
      setEditError((err as Error).message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="text-orange-500 text-xl font-bold animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col items-center py-12 px-2 md:px-6">
      <div className="w-full max-w-5xl flex items-center mb-6">
        <button
          onClick={() => router.push('/home')}
          className="flex items-center gap-2 text-orange-500 font-medium bg-white border border-orange-200 rounded-full px-4 py-2 shadow hover:bg-orange-50 transition-all"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-orange-100 p-0 md:p-12 flex flex-col md:flex-row gap-10"
      >
        {/* Left: Profile Card */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 p-8 md:p-0 border-b md:border-b-0 md:border-r border-orange-100">
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-full border-4 border-orange-200 bg-orange-50 flex items-center justify-center overflow-hidden shadow-lg">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={144}
                  height={144}
                  className="rounded-full object-cover"
                  priority
                />
              ) : (
                <User size={72} className="text-orange-400" />
              )}
            </div>
            <button
              className="absolute bottom-2 right-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white p-2 rounded-full shadow hover:scale-105 transition-transform"
              title="Edit profile"
              onClick={() => setEditOpen(true)}
            >
              <Edit2 size={18} />
            </button>
          </div>
          <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent text-center md:text-left">
            {user.displayName || 'Anonymous User'}
          </h2>
          <p className="text-gray-600 mb-2 flex items-center gap-2 text-center md:text-left">
            <Mail className="text-orange-400" size={18} />
            {user.email}
          </p>
          <div className="flex gap-2 mb-4">
            <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs font-medium">{user.emailVerified ? 'Verified' : 'Unverified'}</span>
            <span className="bg-rose-100 text-rose-500 px-3 py-1 rounded-full text-xs font-medium">{user.providerData.map(p => p.providerId).join(', ')}</span>
          </div>
          <button
            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:shadow-orange-200 transition-all mt-2"
            onClick={() => auth.signOut()}
          >
            <LogOut size={18} /> Log Out
          </button>
          {/* --- Tic Tac Toe Game (left column, below log out) --- */}
          <div className="w-full mt-8 flex flex-col items-center">
            <h4 className="text-lg font-bold mb-2 text-orange-500 flex items-center gap-2">
              <Star size={20} /> Play Tic Tac Toe
            </h4>
            <div className="flex flex-col gap-4 items-center bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl p-4 shadow border border-orange-100">
              <div className="grid grid-cols-3 gap-2">
                {board.map((cell, i) => (
                  <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl font-bold rounded-xl border-2 border-orange-200 bg-white shadow hover:bg-orange-100 transition-all flex items-center justify-center ${cell === 'X' ? 'text-orange-500' : cell === 'O' ? 'text-rose-500' : 'text-gray-300'}`}
                    disabled={!!cell || gameOver || !isXNext}
                    aria-label={`Cell ${i + 1}`}
                  >
                    {cell || ''}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 items-center">
                {winner && (
                  <div className="text-base font-bold text-orange-500 mb-1">
                    {winner === 'Draw' ? 'It&rsquo;s a draw!' : winner === 'You' ? 'You win! 🎉' : 'Computer wins!'}
                  </div>
                )}
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-3 py-1.5 rounded-full font-medium shadow hover:shadow-orange-200 transition-all text-sm"
                >
                  Restart Game
                </button>
                <div className="text-xs text-gray-500 mt-1">You are <span className="font-bold text-orange-500">X</span>, Computer is <span className="font-bold text-rose-500">O</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details & Activity */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Account Details */}
          <div className="bg-orange-50 rounded-2xl p-6 shadow border border-orange-100 mb-2">
            <h3 className="text-lg font-bold mb-3 text-orange-500 flex items-center gap-2">
              <ShieldCheck size={20} /> Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div><span className="font-medium">User ID:</span> <span className="break-all">{user.uid}</span></div>
              <div><span className="font-medium">Last Sign-In:</span> {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}</div>
              <div><span className="font-medium">Account Created:</span> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleString() : 'N/A'}</div>
              <div><span className="font-medium">Email Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</div>
              <div><span className="font-medium">Provider:</span> {user.providerData.map(p => p.providerId).join(', ')}</div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-orange-50 rounded-2xl p-6 shadow border border-orange-100 mb-2">
            <h3 className="text-lg font-bold mb-3 text-orange-500 flex items-center gap-2">
              <Calendar size={20} /> Activity Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Gift size={32} className="text-orange-400 mb-2" />
                <span className="text-2xl font-bold text-orange-500">{wishesPosted}</span>
                <span className="text-gray-600">Wishes Posted</span>
              </div>
              <div className="flex flex-col items-center">
                <Heart size={32} className="text-rose-400 mb-2" />
                <span className="text-2xl font-bold text-rose-500">{wishesSupported}</span>
                <span className="text-gray-600">Wishes Supported</span>
              </div>
              <div className="flex flex-col items-center">
                <Star size={32} className="text-yellow-400 mb-2" />
                <span className="text-2xl font-bold text-yellow-500">{karmaPoints}</span>
                <span className="text-gray-600">Karma Points</span>
              </div>
            </div>
          </div>

          {/* Security & Notifications */}
          <div className="bg-orange-50 rounded-2xl p-6 shadow border border-orange-100 mb-2">
            <h3 className="text-lg font-bold mb-3 text-orange-500 flex items-center gap-2">
              <AlertTriangle size={20} /> Security & Notifications
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li><span className="font-medium">Multi-factor Auth:</span> <span className="text-orange-500">Not enabled</span> <span className="text-xs text-gray-400">(coming soon)</span></li>
              <li><span className="font-medium">Notification Settings:</span> <span className="text-orange-500">Default</span> <span className="text-xs text-gray-400">(coming soon)</span></li>
              <li><span className="font-medium">Privacy Controls:</span> <span className="text-orange-500">Standard</span> <span className="text-xs text-gray-400">(coming soon)</span></li>
            </ul>
          </div>

          {/* Profile Info & Future Features */}
          <div className="w-full bg-gradient-to-r from-orange-100 to-rose-100 rounded-2xl p-6 shadow border border-orange-100 mt-2">
            <h3 className="text-lg font-bold mb-3 text-orange-500 flex items-center gap-2">
              <User size={20} /> Profile Info
            </h3>
            <p className="text-gray-700 mb-2">This is your personal profile page. In the future, you&apos;ll be able to update your details, view your wish history, and track your impact and karma points. More features coming soon!</p>
            <ul className="text-gray-600 text-sm list-disc pl-5 mb-6">
              <li>Edit your profile and upload a custom avatar</li>
              <li>See your wish posting and support history</li>
              <li>Earn and display karma points and badges</li>
              <li>Manage privacy, notifications, and security</li>
              <li>Connect with other users and share your story</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center border border-orange-100 relative">
            <button className="absolute top-2 right-2 text-orange-400 hover:text-orange-600" onClick={() => setEditOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Edit Profile</h3>
            <form className="w-full flex flex-col gap-4" onSubmit={handleEditProfile}>
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="profile-pic" className="cursor-pointer">
                  <div className="w-20 h-20 rounded-full border-2 border-orange-200 bg-orange-50 flex items-center justify-center overflow-hidden shadow">
                    {editPhoto ? (
                      <Image src={URL.createObjectURL(editPhoto)} alt="Preview" width={80} height={80} className="w-full h-full object-cover rounded-full" />
                    ) : user.photoURL ? (
                      <Image src={user.photoURL} alt="Profile" width={80} height={80} className="rounded-full object-cover" />
                    ) : (
                      <User size={40} className="text-orange-400" />
                    )}
                  </div>
                  <input id="profile-pic" type="file" accept="image/*" className="hidden" onChange={e => setEditPhoto(e.target.files?.[0] || null)} />
                  <span className="text-xs text-gray-500 mt-1">Change photo</span>
                </label>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-300 outline-none bg-orange-50"
                  required
                />
              </div>
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
              {editSuccess && <div className="text-green-600 text-sm">{editSuccess}</div>}
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-4 py-2 rounded-full font-medium shadow hover:shadow-orange-200 transition-all mt-2"
                disabled={editLoading}
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
