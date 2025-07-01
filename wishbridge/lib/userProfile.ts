import { db, storage, auth } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export async function getUserProfile(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateUserProfile({ uid, displayName, photoFile }: { uid: string, displayName: string, photoFile?: File }) {
  let photoURL;
  if (photoFile) {
    const storageRef = ref(storage, `profile-pictures/${uid}`);
    await uploadBytes(storageRef, photoFile);
    photoURL = await getDownloadURL(storageRef);
  }
  // Update Firestore
  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, {
    displayName,
    ...(photoURL ? { photoURL } : {}),
    updatedAt: new Date().toISOString(),
  }, { merge: true });
  // Update Firebase Auth profile
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName,
      ...(photoURL ? { photoURL } : {}),
    });
  }
  return { displayName, photoURL };
}
