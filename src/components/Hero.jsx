import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/Hero.png';
import './Hero.css'; 

export default function Hero() {
  return (
    <section className="bg-[#1e201e] text-[#ecdfcc] min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-10 mt-15">
      <div className="max-w-xl text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm font-medium text-[#697565]"
        >
          Explore Books Like Never Before
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} //Discover Your Next Great Read With BookVerse
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Discover <span className="text-[#ecdfcc]">Your Next Great Read</span> With
          <br className="hidden md:block" />
           <span className="text-[#697565]"> Bookverse</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-base md:text-lg text-[#cfc3b3] mb-8"
        >
          Search through millions of books, create your personalized reading list, and track your literary adventures. Filter by genre, sort by ratings, and never lose track of your next great read.
        </motion.p>

        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#697565] to-[#3c3d37] text-[#ecdfcc] font-semibold shadow-lg hover:from-[#5c6455] hover:to-[#2f2f2b] transition duration-300"
        >
          Find Your Next Book
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        {/* Ring background */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          {/* <div className="absolute w-[380px] h-[380px] rounded-full border-2 border-[#697565]/30 animate-pulse "></div>
          <div className="absolute w-[460px] h-[460px] rounded-full border-2 border-[#ecdfcc]/10 animate-pulse "></div>
          <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-[#3c3d37]/10 animate-pulse "></div> */}
          
        </div>

        {/* Glowing gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#697565]/30 via-[#ecdfcc]/10 to-[#3c3d37]/10 animate-pulse blur-xl"></div>


        <div className="absolute inset-0 z-20 pointer-events-none  rounded-2xl">
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <div className="absolute rounded-4xl inset-0 bg-gradient-to-b from-transparent via-[#1e201e]/40 to-[#1e201e] blur-xl h-[90%]"></div>
    </div>
  </div>
  
        <img
          src={heroImage}
          alt="Hero"
          className="relative z-10 w-full rounded-xl mb-12 ml-3 heroimg"
          
        />

        {/* Sparkles */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          {/* <div className="w-2 h-2 bg-[#ecdfcc] rounded-full absolute animate-ping left-[20%] top-[10%] opacity-50"></div> */}
          {/* <div className="w-1.5 h-1.5 bg-[#697565] rounded-full absolute animate-ping left-[60%] top-[20%] opacity-70"></div>
          <div className="w-2 h-2 bg-[#3c3d37] rounded-full absolute animate-ping left-[40%] top-[60%] opacity-50"></div>
          <div className="w-1 h-1 bg-[#ecdfcc] rounded-full absolute animate-ping left-[70%] top-[40%] opacity-75"></div>
          <div className="w-1.5 h-1.5 bg-[#697565] rounded-full absolute animate-ping left-[30%] top-[75%] opacity-60"></div> */}
        </div>
      </motion.div>
    </section>
  );
}
