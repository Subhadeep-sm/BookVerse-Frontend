import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import Navbar from './Navbar';

const firebaseConfig = {
  apiKey: "AIzaSyB0KspVLuW3NiL0gLl2DmayZwMDcQNqDdU",
  authDomain: "bookverse-sm.firebaseapp.com",
  projectId: "bookverse-sm",
  storageBucket: "bookverse-sm.firebasestorage.app",
  messagingSenderId: "258948585517",
  appId: "1:258948585517:web:0154fb3fed0ba83fde80a4",
  measurementId: "G-44HKLSBKZ1"
};

initializeApp(firebaseConfig);
const auth = getAuth();

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-[#1e201e] p-4">
      <div className="bg-[#3c3d37] text-[#ecdfcc] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? 'Login to BookVerse' : 'Sign Up for BookVerse'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
