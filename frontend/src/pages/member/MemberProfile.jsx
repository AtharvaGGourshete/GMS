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
import {
  Mail,
  Phone,
  CalendarDays,
  LogOut,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/axios";

const MemberProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [membershipDetails, setMembershipDetails] = useState(null);
  const [loadingMembership, setLoadingMembership] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      if (user && user.id) {
        try {
          const response = await api.get(`/membership/user/${user.id}`);
          setMembershipDetails(response.data?.[0] || null);
        } catch (error) {
          console.error("Error fetching membership details:", error);
          setMembershipDetails(null);
        } finally {
          setLoadingMembership(false);
        }
      } else {
        setLoadingMembership(false);
      }
    };
    fetchMembership();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="p-8 text-center shadow-lg rounded-2xl border border-gray-200">
          <p className="text-xl font-semibold text-gray-800">
            Please log in to view your profile.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="mt-6"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const profileData = {
    name: user.full_name || user.name,
    email: user.email,
    phone: user.phone || "Not provided",
    joined: user.created_at ? formatDate(user.created_at) : "N/A",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-semibold text-center text-gray-900">
          My Account
        </h1>

        {/* Profile Header */}
        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {profileData.name}
            </CardTitle>
            <CardDescription>
              Manage your personal information and membership details.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Contact Details */}
        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{profileData.phone}</p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Membership Section */}
        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Membership Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {loadingMembership ? (
              <p className="text-gray-600">Loading membership details...</p>
            ) : membershipDetails ? (
              <>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <Package className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Current Plan</p>
                    <p className="font-medium text-gray-900">
                      {membershipDetails.plan_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <CalendarDays className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Expires On</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(membershipDetails.expiry_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      membershipDetails.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {membershipDetails.status}
                  </span>
                  <p className="text-gray-700 text-sm">Membership Status</p>
                </div>

              </>
            ) : (
              <p className="text-gray-600">No active membership found.</p>
            )}
          </CardContent>
        </Card>

        {/* Account History */}
        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Account History
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <CalendarDays className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Joined Gymie On</p>
                <p className="font-medium text-gray-900">{profileData.joined}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">

          <Button
            variant="outline"
            className="border-gray-300 text-gray-800 hover:bg-gray-100"
            onClick={() => {}}
          >
            Edit Profile
          </Button>

          <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Log Out
          </Button>

        </div>

      </div>
    </div>
  );
};

export default MemberProfile;
