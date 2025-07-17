import React, { useEffect, useState } from 'react';

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } backdrop-blur-md bg-white/5 border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white font-light">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-wide">BookVerse ®</span>
        </div>


        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
            🌙
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition">
            🎚️
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition">
            🔊
          </button>
          <button className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm transition font-medium">
            Get in touch
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
