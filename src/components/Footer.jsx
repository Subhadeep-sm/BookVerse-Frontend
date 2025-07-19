import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e201e] text-[#F2EAD3] px-6 md:px-20 py-10 mt-20 shadow-t shadow-2xl shadow-amber-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold mb-1">BookVerse</h2>
          <p className="text-sm opacity-80">Inspire. Discover. Read more.</p>
        </div>

        {/* Center Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-1">Explore</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/marketplace" className="hover:underline">Marketplace</a></li>
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">About</h3>
            <ul className="space-y-1">
              <li><a href="/mission" className="hover:underline">Our Mission</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/how-it-works" className="hover:underline">How It Works</a></li>
            </ul>
          </div>
          
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 items-start">
          <button className="bg-[#697565] text-white px-5 py-2 rounded-md hover:bg-[#e66e50] transition font-bold">
            Contact Us
          </button>
          <div className="flex gap-3 text-lg">
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-[#F2EAD3]/20 mt-10 pt-4 text-xs text-center opacity-70">
        © {new Date().getFullYear()} BookVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
