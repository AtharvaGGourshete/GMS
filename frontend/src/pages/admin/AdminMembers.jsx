// src/pages/AdminMembers.jsx
import React, { useEffect, useState } from "react";
import api from "@/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  BicepsFlexed,
  Building2Icon,
  Calendar,
  Users,
  Loader2,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";

const BRAND_COLOR = "#F24423";

const getLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex items-center p-3 rounded-lg text-base font-medium transition-colors duration-150 group 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md`
              : "text-gray-700 hover:bg-gray-100"
          }`;
};

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ full_name: "", email: "", phone: "" });

  const currentPath = "/admin/members";

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const response = await api.get("/user");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

 
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/user/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 text-gray-800 shadow-2xl p-4 bg-white border-r sticky top-0 h-screen">
        <div className="flex items-center justify-center h-16 border-b mb-6">
          <Link to="/admin" className={`text-2xl font-extrabold text-[${BRAND_COLOR}]`}>
            Admin Panel
          </Link>
        </div>
        <nav className="flex flex-col space-y-1">
          <Link to="/admin/trainers" className={getLinkClass("/admin/trainers", currentPath)}>
            <BicepsFlexed className="w-5 h-5 mr-3 group-hover:text-white" />
            Trainers
          </Link>

          <Link to="/admin/members" className={getLinkClass("/admin/members", currentPath)}>
            <Users
              className={`w-5 h-5 mr-3 ${
                currentPath === "/admin/members" ? "text-white" : "text-gray-600 group-hover:text-white"
              }`}
            />
            Members
          </Link>

          <Link to="/admin/classes" className={getLinkClass("/admin/classes", currentPath)}>
            <Building2Icon className="w-5 h-5 mr-3 group-hover:text-white" />
            Classes
          </Link>

          <Link to="/admin/attendance" className={getLinkClass("/admin/attendance", currentPath)}>
            <Calendar className="w-5 h-5 mr-3 group-hover:text-white" />
            Attendance
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Member Management</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg">
            <Loader2 className={`w-8 h-8 text-[${BRAND_COLOR}] animate-spin`} />
            <p className="mt-4 text-gray-600">Loading all registered members...</p>
          </div>
        ) : (
          <Card className="w-full shadow-xl border-t-4 border-t-[${BRAND_COLOR}]">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Registered Members ({members.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                {members.length === 0 && (
                  <TableCaption className="text-lg py-4">No members have registered yet.</TableCaption>
                )}
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Joined On</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                      
                        <>
                          <TableCell className="font-medium">{user.full_name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone || "N/A"}</TableCell>
                          <TableCell>{formatDate(user.created_at)}</TableCell>
                          <TableCell className="text-center flex justify-center gap-2">
                            <Button
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminMembers;
