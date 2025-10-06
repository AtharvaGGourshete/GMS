import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const {isLoading, setIsLoading} = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    
    navigate("/");
  };
  return (
    <nav>
      <div className="grid grid-cols-3 items-center h-16 px-4 border-b">
        <Link to="/">
        <div className="flex justify-start font-extrabold text-5xl font-mono text-[#F24423]">
          <img src="main.png" width={50} height={50} className="-mr-2" alt="Gymie Logo" />
          <span className="text-black mr-10 ">ymie</span>
        </div>
        </Link>

        <div className="grid grid-cols-4 gap-5 tracking-widest justify-center">
          <Link to="/memberships" className="hover:text-[#F24423] cursor-pointer">Memberships</Link>
          <Link to="/trainers" className="ml-10 hover:text-[#F24423] cursor-pointer">Trainers</Link>
          <Link to="/about" className="ml-5 hover:text-[#F24423] cursor-pointer">About Us</Link>
        </div>
        
        <div className='flex justify-end space-x-2'> 
          {user ? (
            <>
              <Link to="/profile">
                <User className="mt-1"/>
              </Link>
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant='outline' className='cursor-pointer'>Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#F24423] hover:bg-[#c9371f] cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;