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
import { Link, useLocation } from "react-router-dom";
import {
  BicepsFlexed,
  Building2Icon,
  Calendar,
  Users,
  Loader2,
  Trash2,
  UserPlus,
  Search,
  Home,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BRAND_COLOR = "#F24423";
const ACCENT_COLOR_B = "#000000"; // Used for Neobrutalist styling

// --- Custom Hook for Window Dimensions ---
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

// --- Link Class Generator ---
const getLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex items-center p-3 rounded-lg text-base font-medium transition-colors duration-150 group 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md`
              : "text-gray-700 hover:bg-gray-100"
          }`;
};

// --- Mobile Navigation Link Class Generator ---
const getMobileLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex flex-col items-center justify-center p-2 text-xs transition-colors duration-150 
          ${
            isActive
              ? `text-[${BRAND_COLOR}]`
              : "text-gray-500 hover:text-gray-700"
          }`;
};

// --- AdminMembers Component ---
const AdminMembers = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Add Member State
  const [newMember, setNewMember] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    plan_id: "", 
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Edit Member State
  const [editMember, setEditMember] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    plan_id: "", 
    current_plan_id: "", // Used to check if the plan was actually changed
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch all members (users with joined plan data)
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

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const response = await api.get("/plans");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error(error.response?.data?.message || "Failed to load plans.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPlans();
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
    try {
      await api.delete(`/user/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const createUser = async () => {
    const { full_name, email, phone, password, plan_id } = newMember;
    
    if (!full_name || !email || !password) {
      toast.error("Please fill in full name, email, and password.");
      return;
    }

    try {
      // 1. Create User
      const userPayload = { full_name, email, phone, password };
      const userResponse = await api.post("/user", userPayload); 
      const userId = userResponse.data.userId;

      let toastMessage = "Member created successfully!";

      // 2. Create Membership (if a plan is selected)
      if (plan_id) {
        const plan = plans.find(p => p.id == plan_id);
        
        if (!plan) {
             toast.error("Selected plan not found.");
             return;
        }

        const today = new Date();
        const expiryDate = new Date(today);
        
        // Calculate expiry date
        const durationDays = plan.duration_days;
        expiryDate.setDate(today.getDate() + parseInt(durationDays, 10));

        const membershipPayload = {
          user_id: userId,
          plan_id: plan_id,
          join_date: today.toISOString().split('T')[0],
          expiry_date: expiryDate.toISOString().split('T')[0],
        };

        await api.post("/membership", membershipPayload);
        toastMessage = "Member and Membership created successfully!";
      }

      toast.success(toastMessage);
      setNewMember({ full_name: "", email: "", phone: "", password: "", plan_id: "" });
      setDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user/membership:", error);
      toast.error(error.response?.data?.message || "Failed to create member/membership.");
    }
  };

  const openEditDialog = (user) => {
    setEditMember({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      password: "",
      plan_id: user.plan_id || "", 
      current_plan_id: user.plan_id || "", 
    });
    setEditDialogOpen(true);
  };

  const updateUser = async () => {
    if (!editMember.full_name || !editMember.email) {
      toast.error("Full name and email are required.");
      return;
    }

    try {
      // 1. Update User Details (Name, Email, Phone, Password)
      const updatePayload = {
        full_name: editMember.full_name,
        email: editMember.email,
        phone: editMember.phone,
      };

      if (editMember.password) {
        updatePayload.password = editMember.password;
      }
      
      await api.put(`/user/${editMember.id}`, updatePayload);
      
      let successMessage = "Member details updated successfully!";
      
      // 2. Check and Update Membership Plan
      const planChanged = editMember.plan_id !== editMember.current_plan_id;
      
      if (planChanged) {
        if (editMember.plan_id) {
          // If a new plan is selected, update the membership
          const membershipUpdatePayload = {
            plan_id: editMember.plan_id,
          };
          
          await api.put(`/membership/${editMember.id}/plan`, membershipUpdatePayload);
          successMessage = "Member details and **Membership Plan updated successfully!**";
        } else if (editMember.current_plan_id && !editMember.plan_id) {
            // Plan was removed from selection (plan_id is null/empty)
            toast.warning("Member details updated. Plan was set to 'None'. The old membership status remains unchanged.");
        }
      }

      toast.success(successMessage);
      setEditDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user/membership:", error);
      toast.error(error.response?.data?.message || "Failed to update member.");
    }
  };

  const filteredMembers = members.filter((user) =>
    `${user.full_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // --- Sidebar/Nav definitions remain unchanged ---
  const DesktopSidebar = (
    <aside className="hidden md:block w-64 text-gray-800 shadow-2xl p-4 bg-white border-r sticky top-0 h-screen">
      <div className="flex items-center justify-center h-16 border-b mb-6">
        <Link
          to="/admin"
          className={`text-2xl font-extrabold text-[${BRAND_COLOR}]`}
        >
          Admin Panel
        </Link>
      </div>
      <nav className="flex flex-col space-y-1">
        <Link
          to="/admin/trainers"
          className={getLinkClass("/admin/trainers", currentPath)}
        >
          <BicepsFlexed className="w-5 h-5 mr-3 group-hover:text-white" />
          Trainers
        </Link>

        <Link
          to="/admin/members"
          className={getLinkClass("/admin/members", currentPath)}
        >
          <Users
            className={`w-5 h-5 mr-3 ${
              currentPath === "/admin/members"
                ? "text-white"
                : "text-gray-600 group-hover:text-white"
            }`}
          />
          Members
        </Link>

        <Link
          to="/admin/classes"
          className={getLinkClass("/admin/classes", currentPath)}
        >
          <Building2Icon className="w-5 h-5 mr-3 group-hover:text-white" />
          Classes
        </Link>

        <Link
          to="/admin/attendance"
          className={getLinkClass("/admin/attendance", currentPath)}
        >
          <Calendar className="w-5 h-5 mr-3 group-hover:text-white" />
          Attendance
        </Link>
      </nav>
    </aside>
  );

  const MobileBottomNav = (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-50 md:hidden shadow-lg">
      <div className="flex justify-around h-full">
        <Link to="/admin" className={getMobileLinkClass("/admin", currentPath)}>
            <Home className="w-5 h-5" />
            <span className="mt-1">Dashboard</span>
        </Link>
        <Link
          to="/admin/trainers"
          className={getMobileLinkClass("/admin/trainers", currentPath)}
        >
          <BicepsFlexed className="w-5 h-5" />
          <span className="mt-1">Trainers</span>
        </Link>

        <Link
          to="/admin/members"
          className={getMobileLinkClass("/admin/members", currentPath)}
        >
          <Users className="w-5 h-5" />
          <span className="mt-1">Members</span>
        </Link>

        <Link
          to="/admin/classes"
          className={getMobileLinkClass("/admin/classes", currentPath)}
        >
          <Building2Icon className="w-5 h-5" />
          <span className="mt-1">Classes</span>
        </Link>

        <Link
          to="/admin/attendance"
          className={getMobileLinkClass("/admin/attendance", currentPath)}
        >
          <Calendar className="w-5 h-5" />
          <span className="mt-1">Attendance</span>
        </Link>
      </div>
    </nav>
  );
  // --- End Sidebar/Nav definitions ---

  return (
    <div className={`flex min-h-screen bg-gray-50 ${isMobile ? "pb-16" : ""}`}>
      {DesktopSidebar}

      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Member Management
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* ADD MEMBER DIALOG */}
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className={`bg-[${BRAND_COLOR}] hover:opacity-90 text-white w-full md:w-auto`}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a New Member</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill in the details below to create a new member.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Full Name"
                  value={newMember.full_name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, full_name: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newMember.password}
                  onChange={(e) =>
                    setNewMember({ ...newMember, password: e.target.value })
                  }
                />
                {/* Standard Plan Dropdown for Add Member */}
                <select
                  value={newMember.plan_id}
                  onChange={(e) =>
                    setNewMember({ ...newMember, plan_id: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 h-10 w-full bg-white text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Plan (Optional)</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {plan.duration_days} days - ₹{plan.price}
                    </option>
                  ))}
                </select>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={createUser}
                  className={`bg-[${BRAND_COLOR}] hover:bg-[#d53d1e] text-white`}
                >
                  Create
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* EDIT MEMBER DIALOG */}
        <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Member Details</AlertDialogTitle>
              <AlertDialogDescription>
                Update the details of the selected member. Changing the plan will create a new membership period starting today.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Full Name"
                value={editMember.full_name}
                onChange={(e) =>
                  setEditMember({ ...editMember, full_name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={editMember.email}
                onChange={(e) =>
                  setEditMember({ ...editMember, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={editMember.phone}
                onChange={(e) =>
                  setEditMember({ ...editMember, phone: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="New Password (optional)"
                value={editMember.password}
                onChange={(e) =>
                  setEditMember({ ...editMember, password: e.target.value })
                }
              />
              {/* --- Neobrutalist Plan Dropdown for Edit --- */}
              <div 
                className="relative"
                style={{
                  border: `2px solid ${ACCENT_COLOR_B}`,
                  boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                  backgroundColor: 'white',
                  transition: 'box-shadow 0.1s, transform 0.1s', 
                }}
              >
                  <select
                      value={editMember.plan_id}
                      onChange={(e) =>
                          setEditMember({ ...editMember, plan_id: e.target.value })
                      }
                      className="
                          h-10 w-full px-3 py-2 
                          bg-white text-gray-700 
                          border-0 
                          focus:ring-0 focus:border-0 
                          appearance-none 
                          cursor-pointer
                      "
                      style={{ border: 'none' }}
                  >
                      <option value="">Select Plan</option>
                      {plans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                              {plan.name} - {plan.duration_days} days - ₹{plan.price}
                          </option>
                      ))}
                  </select>
              </div>
              {/* --- End Neobrutalist Plan Dropdown --- */}

            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={updateUser}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Members Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg">
            <Loader2
              className={`w-8 h-8 text-[${BRAND_COLOR}] animate-spin`}
            />
            <p className="mt-4 text-gray-600">
              Loading all registered members...
            </p>
          </div>
        ) : (
          <Card className={`w-full shadow-xl border-t-4 border-t-[${BRAND_COLOR}]`}>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
                Registered Members ({filteredMembers.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  {filteredMembers.length === 0 && (
                    <TableCaption className="text-lg py-4">
                      No members found.
                    </TableCaption>
                  )}

                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="min-w-[100px]">Plan</TableHead> 
                      <TableHead className="min-w-[100px]">Expiry</TableHead>
                      <TableHead className="min-w-[120px]">Joined On</TableHead>
                      <TableHead className="text-center min-w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredMembers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium min-w-[150px]">{user.full_name}</TableCell>
                        <TableCell className="min-w-[200px]">{user.email}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                ${user.plan_name ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}
                            >
                                {user.plan_name || "None"}
                            </span>
                        </TableCell>
                        <TableCell>
                            {user.expiry_date ? formatDate(user.expiry_date) : "N/A"}
                        </TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-center flex justify-center gap-2">
                          <Button
                            onClick={() => openEditDialog(user)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-auto"
                          >
                            Edit
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 h-auto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the member **{user.full_name}**? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {isMobile && MobileBottomNav}
    </div>
  );
};

export default AdminMembers;