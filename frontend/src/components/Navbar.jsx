import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Renamed 'isLoading' to 'loading' and simplified state usage
  // The line 'const {isLoading, setIsLoading} = useState(false);' was incorrect.
  const [loading] = useState(false); // Retained for structure, though unused
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const navLinks = (
    <>
      <Link to="/memberships" onClick={() => setIsMenuOpen(false)} className="hover:text-[#F24423] cursor-pointer block py-2 px-4 text-center sm:text-left">Memberships</Link>
      <Link to="/trainers" onClick={() => setIsMenuOpen(false)} className="hover:text-[#F24423] cursor-pointer block py-2 px-4 text-center sm:text-left">Trainers</Link>
      <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#F24423] cursor-pointer block py-2 px-4 text-center sm:text-left">About Us</Link>
    </>
  );

  return (
    <nav className="border-b shadow-sm">
      <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center font-extrabold text-2xl sm:text-3xl font-mono text-[#F24423]">
            <img src="main.png" width={40} height={40} className="-mr-1 sm:-mr-2" alt="Gymie Logo" />
            <span className="text-black text-3xl sm:text-4xl">ymie</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 lg:space-x-12 tracking-wider">
          {navLinks}
        </div>
        
        {/* Auth Actions (Desktop) */}
        <div className='hidden md:flex items-center space-x-2'> 
          {user ? (
            <>
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col space-y-2 border-t pt-2">
            {/* Navigation Links */}
            {navLinks}
            
            {/* Auth Actions (Mobile) */}
            <div className="flex flex-col space-y-2 px-4 pt-2 border-t">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base">
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
                    <Button variant='outline' className='cursor-pointer w-full'>Login</Button>
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