import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth"; // 👈 import signOut
import { useNavigate } from "react-router-dom"; // 👈 navigate after logout
import { onAuthStateChanged } from "firebase/auth";

import Navbar from './Navbar';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such user document!");
      }
    }
    else{
      console.log("No user is logged in");
      
    }
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such user document!");
      }
    } else {
      console.log("No user is logged in");
      navigate("/login"); // Optional: redirect to login page if unauthenticated
    }
  });

  return () => unsubscribe(); // 👈 clean up on unmount
}, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1e201e] text-[#ecdfcc]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e201e] text-[#ecdfcc] p-8 mt-[12vh]">
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        

        <div className="bg-[#3c3d37] rounded-2xl shadow-xl p-6 mb-6 flex flex-row items-center">
          <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-2">User Info</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          </div>
          <div >
          <button
            onClick={handleLogout}
            className="  bg-[#697565] text-[#ecdfcc] px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
          </div>
        </div>

        <div className="bg-[#3c3d37] rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Your Reading List</h2>
          <p>📌 This section will show all your bookmarked books and progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
