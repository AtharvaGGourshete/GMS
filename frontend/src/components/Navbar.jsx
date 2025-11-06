import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X, Shield } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "test@gmail.com";
  const MEMBER_EMAIL = "atharva@gmail.com" || "sarakshi@gmail.com";

  const isAdmin = user && user.email === ADMIN_EMAIL;
  const isMember = user && user.email === MEMBER_EMAIL;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Neobrutalism link style
  const baseLinkClass = "font-bold uppercase tracking-wide text-black hover:text-[#F24423] cursor-pointer block py-3 px-4 text-center sm:text-left transition-colors duration-200 border-2 border-transparent hover:border-black hover:bg-yellow-300 sm:border-0 sm:hover:bg-transparent";

  const navLinks = (
    <>
      {isAdmin && (
        <Link 
          to="/admin/trainers" 
          onClick={() => setIsMenuOpen(false)} 
          className="font-black uppercase tracking-wide cursor-pointer block py-3 px-4 text-center sm:text-left bg-green-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-2 sm:mb-0"
        >
          Admin Dashboard
        </Link>
      )}

      {isMember && (
        <Link 
          to="/trainer/dashboard" 
          onClick={() => setIsMenuOpen(false)} 
          className="font-black uppercase tracking-wide cursor-pointer block py-3 px-4 text-center sm:text-left bg-cyan-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-2 sm:mb-0"
        >
          Trainer Dashboard
        </Link>
      )}

      <Link to="/membership-plans" onClick={() => setIsMenuOpen(false)} className={baseLinkClass}>
        Memberships
      </Link>
      <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className={baseLinkClass}>
        About Us
      </Link>
    </>
  );

  return (
    <nav className="border-b-8 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-40 bg-white">
      <div className="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        {/* Logo Section - Neobrutalism */}
        <Link to="/">
          <div className="flex items-center font-black text-3xl sm:text-4xl uppercase tracking-tighter ">
            <img src="main-bg.png" width={50} height={50} className="-mr-2"/>
            <span className="text-black">ym</span>
            <span className="text-[#F24423] bg-yellow-300 px-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
              ie
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {navLinks}
        </div>
        
        {/* Auth Actions (Desktop) - Neobrutalism */}
        <div className='hidden md:flex items-center space-x-3'> 
          {user ? (
            <>
              {/* Profile Link */}
              <Link 
                to="/profile" 
                className="p-3 border-4 border-black bg-white hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <User className="h-6 w-6 text-black"/>
              </Link>
              <Button 
                onClick={handleLogout} 
                className="bg-[#F24423] hover:bg-[#c9371f] text-white font-black uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none cursor-pointer px-6 py-5"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  className='font-black uppercase tracking-wide cursor-pointer border-4 border-black bg-white text-black hover:bg-gray-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none px-6 py-5'
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  className="bg-[#F24423] hover:bg-[#c9371f] text-white font-black uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none cursor-pointer px-6 py-5"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button - Neobrutalism */}
        <button 
          className="md:hidden p-3 border-4 border-black bg-white hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
        </button>
      </div>

      {/* Mobile Menu Flyout - Neobrutalism */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t-4 border-black bg-cyan-50 ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-3 px-4">
          {/* Navigation Links */}
          {navLinks}
          
          {/* Admin Link Button for Mobile */}
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button 
                className="bg-green-300 hover:bg-green-400 text-black font-black uppercase w-full justify-start border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
              >
                <Shield className="mr-2 h-5 w-5"/> Admin Dashboard
              </Button>
            </Link>
          )}

          {/* Auth Actions (Mobile) */}
          <div className="flex flex-col space-y-3 pt-4 border-t-4 border-black">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    className="w-full justify-start border-4 border-black bg-white hover:bg-yellow-300 text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
                  >
                    <User className="mr-2 h-5 w-5"/> Profile
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout} 
                  className="bg-[#F24423] hover:bg-[#c9371f] text-white font-black uppercase cursor-pointer w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    className='cursor-pointer w-full border-4 border-black bg-white text-black hover:bg-gray-100 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none'
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    className="bg-[#F24423] hover:bg-[#c9371f] text-white font-black uppercase cursor-pointer w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
