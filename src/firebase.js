// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const googleapikey = import.meta.env.VITE_GOOGLE_API_KEY;


const firebaseConfig = {
  apiKey: googleapikey,
  authDomain: "bookverse-sm.firebaseapp.com",
  projectId: "bookverse-sm",
  storageBucket: "bookverse-sm.firebasestorage.app",
  messagingSenderId: "258948585517",
  appId: "1:258948585517:web:0154fb3fed0ba83fde80a4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
