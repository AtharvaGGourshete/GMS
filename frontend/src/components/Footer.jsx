import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom for navigation

const Footer = () => {
  return (
    <footer className="bg-[#131313] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left border-b border-gray-700 pb-8 mb-8">

          {/* Logo/Branding */}
          <div className="flex justify-center md:justify-start items-center md:col-span-2">
            <Link to="/">
              <div className="flex items-center">
                <img
                  src="main-bg.png" // Assuming this is the correct path to the logo
                  alt="Gymie Logo"
                  width={80}
                  height={80}
                  className="rounded-full h-20 w-20 object-cover"
                />
                <span className="text-4xl font-extrabold ml-3 text-[#F24423]">Gymie</span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold mb-4 text-[#F24423]">Quick Links</h3>
            <ul className="font-light text-base text-gray-300 space-y-2">
              <li><Link to="/" className="hover:text-[#F24423] transition-colors duration-300">Home</Link></li>
              <li><Link to="/memberships" className="hover:text-[#F24423] transition-colors duration-300">Memberships</Link></li>
              <li><Link to="/trainers" className="hover:text-[#F24423] transition-colors duration-300">Trainers</Link></li>
              <li><Link to="/about" className="hover:text-[#F24423] transition-colors duration-300">About Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info / Newsletter (Added a dummy section for better layout) */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold mb-4 text-[#F24423]">Get in Touch</h3>
            <p className="text-sm text-gray-300 mb-2">123 Gym Street, Fitness City, 90210</p>
            <p className="text-sm text-gray-300">support@gymie.com</p>
          </div>

        </div>

        {/* Bottom Section: Copyright and Social Media */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left mt-8">
          
          {/* Copyright/Terms */}
          <div className="text-sm text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Gymie Inc. All rights reserved. | Terms and conditions applied
          </div>

          {/* Social Media Links */}
          <div className="order-1 sm:order-2">
            <div className="flex justify-center sm:justify-end gap-5 text-gray-400">
              <a href="#" aria-label="Github" className="hover:text-[#F24423] transition-colors duration-300"><Github/></a>
              <a href="#" aria-label="Linkedin" className="hover:text-[#F24423] transition-colors duration-300"><Linkedin/></a>
              <a href="#" aria-label="Instagram" className="hover:text-[#F24423] transition-colors duration-300"><Instagram/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;