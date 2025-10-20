// src/pages/UserProfilePage.jsx
import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, CalendarDays, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MemberProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-10 text-center">
        Please log in to view your profile.
      </div>
    );
  }
  const profileData = {
    name: user.name,
    email: user.email,
    phone: user.phone || "Not provided",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pt-12 min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 flex items-center text-gray-800">
        <User className="w-8 h-8 mr-3 text-[#F24423]" />
        Account Dashboard
      </h1>
      <Card className="shadow-2xl ">
        <CardHeader>
          <CardTitle className="text-3xl">{profileData.name}</CardTitle>
          <CardDescription>
            View and manage your account details, membership, and contact
            information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />

          <h3 className="text-xl font-semibold mb-3">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div className="leading-none">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{profileData.email}</p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-500" />
              <div className="leading-none">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{profileData.phone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account History Section */}
          <h3 className="text-xl font-semibold mb-3">Account History</h3>
          <div className="flex items-center space-x-3">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            <div className="leading-none">
              <p className="text-sm text-gray-500">Joined Gymie On</p>
              <p className="font-medium">{profileData.joined}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="text-[#F24423] border-[#F24423] hover:bg-[#F24423] hover:text-white cursor-pointer"
            >
              Edit Profile
            </Button>
            <Button onClick={handleLogout} className="bg-[#F24423] hover:bg-orange-500 text-white cursor-pointer">
              <LogOut className="w-4 h-4 mr-2 " /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberProfile;
