import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { auth, db } from "../firebase";

import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

// const googleapikey = import.meta.env.VITE_GOOGLE_API_KEY;

// // const firebaseConfig = {
// //   apiKey: googleapikey,
// //   authDomain: "bookverse-sm.firebaseapp.com",
// //   projectId: "bookverse-sm",
// //   storageBucket: "bookverse-sm.firebasestorage.app",
// //   messagingSenderId: "258948585517",
// //   appId: "1:258948585517:web:0154fb3fed0ba83fde80a4",
// //   measurementId: "G-44HKLSBKZ1"
// // };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        alert(`Welcome back, ${userData?.name || 'User'}!`);
        navigate('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name,
          email
        });
        alert('Account created successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#1e201e] p-4">
        <div className="bg-[#3c3d37] text-[#ecdfcc] p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isLogin ? 'Login to BookVerse' : 'Sign Up for BookVerse'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-[#697565] focus:outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-[#697565] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-[#697565] focus:outline-none"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#697565] text-[#ecdfcc] font-semibold py-3 rounded hover:bg-opacity-90"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-[#ecdfcc] underline hover:text-[#dfc399]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
