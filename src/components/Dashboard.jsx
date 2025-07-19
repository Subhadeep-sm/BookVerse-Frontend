import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

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
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1e201e] text-[#ecdfcc]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e201e] text-[#ecdfcc] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to BookVerse 📚</h1>

        <div className="bg-[#3c3d37] rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">User Info</h2>
          <p className="text-[#ecdfcc]"><strong>Name:</strong> {userData.name}</p>
          <p className="text-[#ecdfcc]"><strong>Email:</strong> {userData.email}</p>
        </div>

        <div className="bg-[#3c3d37] rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Your Reading List</h2>
          <p className="text-[#ecdfcc]">📌 This section will show all your bookmarked books and progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
