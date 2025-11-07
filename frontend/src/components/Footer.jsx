import { Github, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const hoverClass = "hover:text-[#F24423] hover:translate-x-1 transition-all duration-200 inline-block";

  return (
    <footer className="bg-black text-white py-16 border-t-8 border-[#F24423]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 text-center md:text-left pb-12 mb-12 border-b-4 border-gray-700">
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <Link to="/" aria-label="Gymie Home">
              <div className="flex items-center justify-center md:justify-start mb-4">
                
                <span className="text-4xl font-black ml-4 uppercase tracking-tighter">
                  <span className="text-white">Gym</span>
                  <span className="text-[#F24423] bg-yellow-300 px-2 border-4 border-white inline-block -rotate-2">ie</span>
                </span>
              </div>
            </Link>
            <div className="bg-yellow-300 border-4 border-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] max-w-xs">
              <p className="text-sm font-bold text-black uppercase tracking-wide">
                Elevate your fitness journey with the best trainers and programs
              </p>
            </div>
          </div>
          <nav className="mt-4 md:mt-0">
            <h3 className="text-2xl font-black uppercase mb-6 text-[#F24423] border-b-4 border-[#F24423] inline-block pb-1">
              Quick Links
            </h3>
            <ul className="font-bold text-base space-y-3 uppercase tracking-wide">
              <li><Link to="/" className={hoverClass}>→ Home</Link></li>
              <li><Link to="/memberships" className={hoverClass}>→ Memberships</Link></li>
              <li><Link to="/trainers" className={hoverClass}>→ Trainers</Link></li>
              <li><Link to="/about" className={hoverClass}>→ About Us</Link></li>
            </ul>
          </nav>
          
          <div className="mt-4 md:mt-0">
            <h3 className="text-2xl font-black uppercase mb-6 text-[#F24423] border-b-4 border-[#F24423] inline-block pb-1">
              Get in Touch
            </h3>
            <address className="not-italic font-bold text-sm space-y-3 uppercase tracking-wide">
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5"/>
                <p>123 Gym Street,<br/>Fitness City, 90210</p>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-5 w-5 text-yellow-300 flex-shrink-0"/>
                <a href="mailto:support@gymie.com" className={hoverClass}>support@gymie.com</a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-yellow-300 flex-shrink-0"/>
                <p>(555) 123-4567</p>
              </div>
            </address>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6">
          
          <div className="order-2 sm:order-1">
            <div className="bg-white border-4 border-[#F24423] px-6 py-3 shadow-[4px_4px_0px_0px_rgba(242,68,35,1)] inline-block">
              <p className="text-sm font-black uppercase tracking-wide text-black">
                &copy; {new Date().getFullYear()} Gymie Inc. All Rights Reserved
              </p>
            </div>
          </div>

          <div className="order-1 sm:order-2">
            <div className="flex justify-center sm:justify-end gap-4">
              <a 
                href="#" 
                aria-label="Github" 
                className="p-3 bg-white border-4 border-white hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Github className="h-6 w-6 text-black"/>
              </a>
              <a 
                href="#" 
                aria-label="Linkedin" 
                className="p-3 bg-white border-4 border-white hover:bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Linkedin className="h-6 w-6 text-black"/>
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="p-3 bg-white border-4 border-white hover:bg-pink-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Instagram className="h-6 w-6 text-black"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
