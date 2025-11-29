import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Menu, User, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="w-full flex justify-center mt-4 px-4">
      {/* NAV CONTAINER */}
      <div className="
        bg-white text-black rounded-full 
        flex items-center justify-between
        px-6 py-3 w-full max-w-6xl 
        shadow-xl
      ">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center font-black text-xl tracking-tight">
          <span className="text-black">Gym</span>
          <span className="text-black bg-yellow-300 px-2 rounded-full ml-1">
            ie
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 ml-8 text-sm font-semibold">
          {isAdmin && (
            <Link to="/admin/trainers" className="hover:text-gray-800">
              Admin Dashboard
            </Link>
          )}

          {isMember && (
            <Link to="/trainer/members" className="hover:text-gray-800">
              Trainer Dashboard
            </Link>
          )}

          <Link to="/membership-plans" className="hover:text-gray-800">Memberships</Link>
          <Link to="/aboutus" className="hover:text-gray-800">About Us</Link>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <Link to="/profile">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white text-black hover:bg-neutral-200"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" className="rounded-full bg-white text-black hover:bg-neutral-200">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="rounded-full bg-red-500 hover:bg-red-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU (SHADCN SHEET) */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="md:hidden bg-white text-black rounded-full hover:bg-neutral-200"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="top" className="rounded-b-3xl bg-black text-white border-neutral-800">
            <SheetHeader className="flex justify-between">
              <span className="text-xl font-bold">Menu</span>
              <X onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
            </SheetHeader>

            <div className="flex flex-col space-y-6 mt-6 text-lg">
              {isAdmin && (
                <Link to="/admin/trainers" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-300">
                  <Shield className="inline-block mr-2" /> Admin Dashboard
                </Link>
              )}

              {isMember && (
                <Link to="/trainer/members" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-300">
                  Trainer Dashboard
                </Link>
              )}

              <Link to="/membership-plans" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-300">
                Memberships
              </Link>

              <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-300">
                About Us
              </Link>

              <div className="border-t border-neutral-700 pt-6">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-full bg-white text-black hover:bg-neutral-200">
                        <User className="mr-2" /> Profile
                      </Button>
                    </Link>

                    <Button
                      onClick={handleLogout}
                      className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white mt-3"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-full bg-white text-black hover:bg-neutral-200">
                        Login
                      </Button>
                    </Link>

                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white mt-3">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
