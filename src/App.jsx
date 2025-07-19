import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './index.css';
import AllBooks from './components/AllBooks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
    <Router>
      <div className="bg-[#1E201E] text-[#ECDFCC] min-h-screen flex flex-col">
        <Routes>
      {/* <div className="bg-[#1E201E] border">
        <Hero/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div> */}

      <Route path="/" element={
        <>
        <Navbar/>
        <Hero/>
        <AllBooks/>
        
        </>
      } />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

