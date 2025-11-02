import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X, Shield } from "lucide-react"; // Imported Shield icon for Admin
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading] = useState(false); // Retained for structure
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Define the Admin Email ID
  const ADMIN_EMAIL = "test@gmail.com"; // <-- SET YOUR ADMIN EMAIL HERE

  // 2. Check if the logged-in user is the Admin
  const isAdmin = user && user.email === ADMIN_EMAIL;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Define the common link class
  const baseLinkClass = "hover:text-[#F24423] cursor-pointer block py-2 px-4 text-center sm:text-left transition-colors duration-200";

  // 3. Conditionally render the Admin link in navLinks
  const navLinks = (
    <>
      {/* Admin Dashboard Link (Appears only for the admin user) */}
      {isAdmin && (
        <Link 
          to="/admin/dashboard" 
          onClick={() => setIsMenuOpen(false)} 
          className="cursor-pointer block py-2 px-4 text-center sm:text-left border-b-2 border-[#F24423] md:border-b-0"
        >
          Admin Dashboard
        </Link>
      )}

      {/* Standard Links */}
      <Link to="/memberships" onClick={() => setIsMenuOpen(false)} className={baseLinkClass}>Memberships</Link>
      <Link to="/trainers" onClick={() => setIsMenuOpen(false)} className={baseLinkClass}>Trainers</Link>
      <Link to="/about" onClick={() => setIsMenuOpen(false)} className={baseLinkClass}>About Us</Link>
    </>
  );

  return (
    <nav className="border-b shadow-md sticky top-0 z-40 bg-white">
      <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center font-extrabold text-2xl sm:text-3xl font-mono text-[#F24423]">
            {/* Note: Updated image tag to include alt attribute for accessibility */}
            <img src="main-bg.png" width={40} height={40} className="-mr-1 sm:-mr-2" alt="Gymie Logo"/>
            <span className="text-black text-3xl sm:text-4xl">ymie</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 lg:space-x-12 tracking-wider items-center">
          {navLinks}
        </div>
        
        {/* Auth Actions (Desktop) */}
        <div className='hidden md:flex items-center space-x-2'> 
          {user ? (
            <>
              {/* Profile Link */}
              <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6 text-[#0C0C0C] hover:text-[#F24423]"/>
              </Link>
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant='outline' className='cursor-pointer border-gray-300 hover:bg-gray-50'>Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#F24423] hover:bg-[#c9371f] cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-[#F24423]" /> : <Menu className="h-6 w-6 text-[#0C0C0C]" />}
        </button>
      </div>

      {/* Mobile Menu Flyout */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col space-y-2 border-t pt-2">
            {/* Navigation Links (Includes Admin Link if applicable) */}
            {navLinks}
            
            {/* 4. Conditionally render Admin link button in mobile auth section for better visibility */}
            {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="px-4">
                  <Button variant='default' className="bg-green-600 hover:bg-green-700 w-full justify-start text-base">
                      <Shield className="mr-2 h-5 w-5"/> Admin Dashboard
                  </Button>
                </Link>
            )}

            {/* Auth Actions (Mobile) */}
            <div className="flex flex-col space-y-2 px-4 pt-2 border-t">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-gray-100">
                      <User className="mr-2 h-5 w-5"/> Profile
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 cursor-pointer w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant='outline' className='cursor-pointer w-full border-gray-300'>Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-[#F24423] hover:bg-[#c9371f] cursor-pointer w-full">Sign Up</Button>
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