import React from 'react';
import './index.css';
import AllBooks from './components/AllBooks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


function App() {
  return (
    <>
    <div className="bg-[#1E201E] border">
      <Hero/>
    <Navbar/>
    <AllBooks/>
    </div>
    </>
  )
}

export default App

