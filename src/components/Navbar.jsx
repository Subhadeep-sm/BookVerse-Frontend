import React, { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import audio1 from '../assets/audios/audio1.mp3';


import { FaHome } from "react-icons/fa";
import { RiBookShelfLine } from "react-icons/ri";
import { MdMovieCreation } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audio1));

  // Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle audio toggle
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);



  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } bg-[#1e201e] shadow-md`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 text-[#ecdfcc]">
        <div className="text-2xl font-bold tracking-wide">BookVerse</div>

        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          
            <li className="hover:text-[#ecdfcc]/80 transition-colors duration-200">
              <a href=""><FaHome className='inline mt-[-0.3rem]'/> Home</a>
            </li>
            <li className="hover:text-[#ecdfcc]/80 transition-colors duration-200">
              <a href=""><FaUser className='inline mt-[-0.3rem]'/> Dashboard</a>
            </li>
            <li className="hover:text-[#ecdfcc]/80 transition-colors duration-200">
              <a href=""><MdMovieCreation className='inline mt-[-0.3rem]'/> Genres</a>
            </li>
            <li className="hover:text-[#ecdfcc]/80 transition-colors duration-200">
              <a href=""><RiBookShelfLine className='inline mt-[-0.3rem]'/> My Library</a>
            </li>
            
          
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAudio}
            className="text-sm px-3 py-1 bg-[#3c3d37] hover:bg-[#697565] rounded-full transition-colors duration-300"
          >
            {isPlaying ? 'Pause Audio' : 'Play Audio'}
          </button>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1e201e] px-4 pb-4">
          <ul className="space-y-3 pt-2 text-[#ecdfcc] text-sm font-medium">
           
              <li>
                <a href="" onClick={() => setIsOpen(false)} className="block hover:text-[#ecdfcc]/80">
                  <FaHome className='inline mt-[-0.3rem]'/> Home
                </a>
              </li>
              <li>
                <a href="" onClick={() => setIsOpen(false)} className="block hover:text-[#ecdfcc]/80">
                  <FaUser className='inline mt-[-0.3rem]'/> Dashboard
                </a>
              </li>
              <li>
                <a href="" onClick={() => setIsOpen(false)} className="block hover:text-[#ecdfcc]/80">
                  <MdMovieCreation className='inline mt-[-0.3rem]'/> Genres
                </a>
              </li>
              <li>
                <a href="" onClick={() => setIsOpen(false)} className="block hover:text-[#ecdfcc]/80">
                  <RiBookShelfLine className='inline mt-[-0.3rem]'/> My Library
                </a>
              </li>
              
            
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
