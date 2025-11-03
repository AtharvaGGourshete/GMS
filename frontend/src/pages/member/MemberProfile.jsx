// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, CalendarDays, User, LogOut, Package } from "lucide-react"; // Added Package icon
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/axios"; // Assuming you have an axios instance for API calls

const BRAND_COLOR = "#F24423";
const ACCENT_COLOR_B = "#000000"; // Black for Neobrutalist borders/shadows

const MemberProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State to hold membership details
  const [membershipDetails, setMembershipDetails] = useState(null);
  const [loadingMembership, setLoadingMembership] = useState(true);

  // --- Fetch membership details ---
  useEffect(() => {
    const fetchMembership = async () => {
      if (user && user.id) {
        try {
          // Assuming an API endpoint like /membership/user/:userId
          // This endpoint should return the latest membership for the user
          const response = await api.get(`/membership/user/${user.id}`);
          if (response.data && response.data.length > 0) {
            setMembershipDetails(response.data[0]); // Take the first (latest) if multiple are returned
          } else {
            setMembershipDetails(null); // No membership found
          }
        } catch (error) {
          console.error("Error fetching membership details:", error);
          setMembershipDetails(null);
        } finally {
          setLoadingMembership(false);
        }
      } else {
        setLoadingMembership(false); // No user, no membership to fetch
      }
    };
    fetchMembership();
  }, [user]);


  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card 
          className="p-8 text-center border-4 border-black"
          style={{boxShadow: `8px 8px 0 0 ${BRAND_COLOR}`}}
        >
          <p className="text-xl font-semibold text-gray-800">
            Please log in to view your profile.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="mt-6 font-bold uppercase"
            style={{
                backgroundColor: BRAND_COLOR,
                color: 'white',
                border: `2px solid ${ACCENT_COLOR_B}`,
                boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
            }}
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  // Ensure dates are formatted correctly
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const profileData = {
    name: user.full_name || user.name, // Use full_name if available, fallback to name
    email: user.email,
    phone: user.phone || "Not provided",
    joined: user.created_at ? formatDate(user.created_at) : "N/A", // Format joined date
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-8 text-black text-center">
          <span className="inline-block p-2 border-b-4 border-black pb-2">
            My Account Dashboard
          </span>
        </h1>

        <Card 
          className="shadow-2xl p-6 md:p-8 border-4 border-black bg-white"
          style={{ boxShadow: `12px 12px 0 0 ${BRAND_COLOR}` }}
        >
          <CardHeader className="p-0 mb-6 border-b-2 border-black pb-4">
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-black">
              {profileData.name}
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-gray-700 mt-2">
              View and manage your account details, membership, and contact information.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-0 pt-4"> {/* Removed default shadcn CardContent padding */}
            
            {/* Contact Details */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-black border-b-2 border-gray-300 pb-2">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${BRAND_COLOR}` }}>
                  <Mail className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email Address</p>
                    <p className="font-bold text-black">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${BRAND_COLOR}` }}>
                  <Phone className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                    <p className="font-bold text-black">{profileData.phone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Membership Details */}
            <section>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-black border-b-2 border-gray-300 pb-2">
                    Membership Details
                </h3>
                {loadingMembership ? (
                    <p className="text-gray-600">Loading membership details...</p>
                ) : membershipDetails ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Plan Name */}
                        <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${ACCENT_COLOR_B}` }}>
                            <Package className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Current Plan</p>
                                <p className="font-bold text-black">{membershipDetails.plan_name || "No Active Plan"}</p>
                            </div>
                        </div>
                        {/* Expiry Date */}
                        <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${ACCENT_COLOR_B}` }}>
                            <CalendarDays className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Expires On</p>
                                <p className="font-bold text-black">{formatDate(membershipDetails.expiry_date) || "N/A"}</p>
                            </div>
                        </div>
                        {/* Status */}
                        <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${ACCENT_COLOR_B}` }}>
                            <span className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black
                                ${membershipDetails.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                style={{ boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}` }}
                            >
                                {membershipDetails.status || "N/A"}
                            </span>
                             <div className="leading-none">
                                <p className="text-sm text-gray-600 font-medium">Membership Status</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">No active membership found.</p>
                )}
            </section>

            {/* Account History Section */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-black border-b-2 border-gray-300 pb-2">
                Account History
              </h3>
              <div className="flex items-center space-x-4 p-3 border-2 border-black" style={{ boxShadow: `3px 3px 0 0 ${BRAND_COLOR}` }}>
                <CalendarDays className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Joined Gymie On</p>
                  <p className="font-bold text-black">{profileData.joined}</p>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-4 border-t-2 border-black">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-base font-bold uppercase border-2 border-black"
                style={{
                  color: BRAND_COLOR,
                  borderColor: BRAND_COLOR,
                  boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                  backgroundColor: 'white',
                }}
                onClick={() => toast.info("Edit Profile functionality coming soon!")} // Placeholder
              >
                Edit Profile
              </Button>
              <Button 
                onClick={handleLogout} 
                className="w-full sm:w-auto text-base font-bold uppercase transition-all duration-200"
                style={{
                    backgroundColor: BRAND_COLOR,
                    color: 'white',
                    border: `2px solid ${ACCENT_COLOR_B}`,
                    boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberProfile;