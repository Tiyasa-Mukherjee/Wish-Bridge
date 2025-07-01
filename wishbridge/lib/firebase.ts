import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9EuQ2ds379CdNc_eDbrFkz6FtJsVmSO0",
  authDomain: "wishbridge-76dfd.firebaseapp.com",
  projectId: "wishbridge-76dfd",
  storageBucket: "wishbridge-76dfd.firebasestorage.app",
  messagingSenderId: "265268528000",
  appId: "1:265268528000:web:e62d23e42de7b770cdb765",
  measurementId: "G-T2YJS07Q4B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
