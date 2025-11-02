import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Common hover class for consistency
  const hoverClass = "hover:text-[#F24423] transition-colors duration-300";

  return (
    <footer className="bg-[#1a1a1a] text-white py-12 border-t border-gray-800"> {/* Slightly darker background, border for visual separation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left border-b border-gray-700 pb-8 mb-8">

          {/* Logo/Branding */}
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <Link to="/" aria-label="Gymie Home">
              <div className="flex items-center justify-center md:justify-start">
                <img
                  src="main-bg.png"
                  alt="Gymie Logo"
                  width={64} // Slightly smaller logo for better balance
                  height={64}
                  className="rounded-full h-16 w-16 object-cover"
                />
                <span className="text-3xl font-extrabold ml-3 text-[#F24423]">Gymie</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mt-4 max-w-xs text-center md:text-left">
              Elevate your fitness journey with the best trainers and programs.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="mt-4 md:mt-0"> {/* Use <nav> for links */}
            <h3 className="text-xl font-bold mb-4 text-[#F24423]">Quick Links</h3>
            <ul className="font-light text-base text-gray-300 space-y-2">
              <li><Link to="/" className={hoverClass}>Home</Link></li>
              <li><Link to="/memberships" className={hoverClass}>Memberships</Link></li>
              <li><Link to="/trainers" className={hoverClass}>Trainers</Link></li>
              <li><Link to="/about" className={hoverClass}>About Us</Link></li>
            </ul>
          </nav>
          
          {/* Contact Info */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold mb-4 text-[#F24423]">Get in Touch</h3>
            <address className="not-italic text-sm text-gray-300 space-y-1">
              <p>123 Gym Street, Fitness City, 90210</p>
              <a href="mailto:support@gymie.com" className={hoverClass}>support@gymie.com</a>
              <p className="mt-2">(555) 123-4567</p>
            </address>
          </div>

        </div>

        {/* Bottom Section: Copyright and Social Media */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left mt-8">
          
          {/* Copyright/Terms */}
          <div className="text-sm text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Gymie Inc. All rights reserved.
          </div>

          {/* Social Media Links */}
          <div className="order-1 sm:order-2">
            <div className="flex justify-center sm:justify-end gap-5 text-gray-400">
              <a href="#" aria-label="Github" className={hoverClass}><Github/></a>
              <a href="#" aria-label="Linkedin" className={hoverClass}><Linkedin/></a>
              <a href="#" aria-label="Instagram" className={hoverClass}><Instagram/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;