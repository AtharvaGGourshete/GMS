import React, { useEffect, useState } from "react";
import api from "@/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  User,
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
const ACCENT_COLOR_B = "#000000"; // Black for Neobrutalist styling

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
  return `flex items-center p-3 text-base font-medium transition-colors duration-150 group border-2 border-transparent 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md border-black`
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
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

// --- Neobrutalist Input Component (Shared) ---
const NeobrutalistInput = ({ placeholder, ...props }) => (
  <div
    className="relative w-full"
    style={{
      border: `2px solid ${ACCENT_COLOR_B}`,
      boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
      backgroundColor: "white",
    }}
  >
    <Input
      placeholder={placeholder}
      className="w-full h-10 px-3 py-2 border-0 focus:ring-0 focus:border-0 appearance-none bg-transparent"
      style={{ border: "none" }}
      {...props}
    />
  </div>
);

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
    const userPayload = { full_name, email, phone, password }; // backend will hash password
    const userResponse = await api.post("/user", userPayload);
    const userId = userResponse.data.id; // or userResponse.data.userId depending on backend

    // 2. Create Membership if plan selected
    if (plan_id) {
      const plan = plans.find((p) => p.id === Number(plan_id));
      if (!plan) {
        toast.error("Selected plan not found.");
        return;
      }

      const today = new Date();
      const expiryDate = new Date(today);
      expiryDate.setDate(today.getDate() + plan.duration_days);

      const membershipPayload = {
        user_id: Number(userId),   // must be number
        plan_id: Number(plan_id),  // must be number
        join_date: today.toISOString().split("T")[0],
        expiry_date: expiryDate.toISOString().split("T")[0],
      };

      await api.post("/membership", membershipPayload);
      toast.success("Member and Membership created successfully!");
    } else {
      toast.success("Member created successfully!");
    }

    setNewMember({
      full_name: "",
      email: "",
      phone: "",
      password: "",
      plan_id: "",
    });
    setDialogOpen(false);
    fetchUsers();
  } catch (error) {
    console.error("Error creating user/membership:", error.response?.data);
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
      // Update user info
      const updatePayload = {
        full_name: editMember.full_name,
        email: editMember.email,
        phone: editMember.phone,
      };

      if (editMember.password) updatePayload.password = editMember.password;

      await api.put(`/user/${editMember.id}`, updatePayload);

      let successMessage = "Member details updated successfully!";

      // Check plan change
      const planChanged = editMember.plan_id !== editMember.current_plan_id;
      if (planChanged && editMember.plan_id) {
        const membershipPayload = { plan_id: editMember.plan_id };
        await api.put(`/membership/${editMember.id}/plan`, membershipPayload);
        successMessage =
          "Member details and membership plan updated successfully!";
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

  // --- Sidebar/Nav definitions ---
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
          <BicepsFlexed className="w-5 h-5 mr-3" />
          Trainers
        </Link>

        <Link
          to="/admin/members"
          className={getLinkClass("/admin/members", currentPath)}
        >
          <Users
            className={`w-5 h-5 mr-3 ${
              currentPath === "/admin/members" ? "text-white" : "text-gray-600"
            }`}
          />
          Members
        </Link>

        <Link
          to="/admin/classes"
          className={getLinkClass("/admin/classes", currentPath)}
        >
          <Building2Icon className="w-5 h-5 mr-3" />
          Classes
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
        {/* Header and Controls (Neobrutalist Style) */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-black">
            Member Roster ({filteredMembers.length})
          </h1>

          <div className="flex gap-4 items-center">
            {/* Search Input (Neobrutalist Style) */}
            <div
              className="relative hidden md:block"
              style={{
                border: `2px solid ${ACCENT_COLOR_B}`,
                boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
                backgroundColor: "white",
              }}
            >
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search members..."
                className="pl-8 border-0 focus:ring-0 focus:border-0 appearance-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: "none" }}
              />
            </div>

            {/* ADD MEMBER DIALOG */}
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-white font-bold uppercase transition-all duration-200"
                  style={{
                    backgroundColor: BRAND_COLOR,
                    border: `2px solid ${ACCENT_COLOR_B}`,
                    boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Add Member
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent
                className="border-4 border-black bg-white"
                style={{ boxShadow: `8px 8px 0 0 ${BRAND_COLOR}` }}
              >
                <AlertDialogHeader className="border-b-2 border-black pb-3 mb-2">
                  <AlertDialogTitle className="text-2xl font-extrabold text-black">
                    Add a New Member
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill in the details below to register a new member.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="grid gap-3 py-3">
                  <NeobrutalistInput
                    placeholder="Full Name (Required)"
                    value={newMember.full_name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, full_name: e.target.value })
                    }
                  />
                  <NeobrutalistInput
                    type="email"
                    placeholder="Email (Required)"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                  />
                  <NeobrutalistInput
                    placeholder="Phone"
                    value={newMember.phone}
                    onChange={(e) =>
                      setNewMember({ ...newMember, phone: e.target.value })
                    }
                  />
                  <NeobrutalistInput
                    type="password"
                    placeholder="Password (Required)"
                    value={newMember.password}
                    onChange={(e) =>
                      setNewMember({ ...newMember, password: e.target.value })
                    }
                  />
                  {/* Neobrutalist Plan Dropdown for Add Member */}
                  <div
                    className="relative"
                    style={{
                      border: `2px solid ${ACCENT_COLOR_B}`,
                      boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
                      backgroundColor: "white",
                    }}
                  >
                    <select
                      value={newMember.plan_id}
                      onChange={(e) =>
                        setNewMember({ ...newMember, plan_id: e.target.value })
                      }
                      className="
                                h-10 w-full px-3 py-2 
                                bg-white text-gray-700 
                                border-0 
                                focus:ring-0 focus:border-0 
                                appearance-none 
                                cursor-pointer
                            "
                      style={{ border: "none" }}
                    >
                      <option value="">Select Plan (Optional)</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} - {plan.duration_days} days - ₹
                          {plan.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <AlertDialogFooter className="pt-4 border-t-2 border-black">
                  <AlertDialogCancel
                    className="border-2 border-black font-bold"
                    style={{ boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}` }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={createUser}
                    className="text-white font-bold uppercase"
                    style={{
                      backgroundColor: BRAND_COLOR,
                      border: `2px solid ${ACCENT_COLOR_B}`,
                      boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                    }}
                  >
                    Create Member
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* EDIT MEMBER DIALOG */}
        <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <AlertDialogContent
            className="border-4 border-black bg-white"
            style={{ boxShadow: `8px 8px 0 0 ${BRAND_COLOR}` }}
          >
            <AlertDialogHeader className="border-b-2 border-black pb-3 mb-2">
              <AlertDialogTitle className="text-2xl font-extrabold text-black">
                Edit Member Details
              </AlertDialogTitle>
              <AlertDialogDescription>
                Update the details of the selected member.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid gap-3 py-3">
              <NeobrutalistInput
                placeholder="Full Name"
                value={editMember.full_name}
                onChange={(e) =>
                  setEditMember({ ...editMember, full_name: e.target.value })
                }
              />
              <NeobrutalistInput
                type="email"
                placeholder="Email"
                value={editMember.email}
                onChange={(e) =>
                  setEditMember({ ...editMember, email: e.target.value })
                }
              />
              <NeobrutalistInput
                placeholder="Phone"
                value={editMember.phone}
                onChange={(e) =>
                  setEditMember({ ...editMember, phone: e.target.value })
                }
              />
              <NeobrutalistInput
                type="password"
                placeholder="New Password (optional)"
                value={editMember.password}
                onChange={(e) =>
                  setEditMember({ ...editMember, password: e.target.value })
                }
              />
              {/* Neobrutalist Plan Dropdown for Edit */}
              <div
                className="relative"
                style={{
                  border: `2px solid ${ACCENT_COLOR_B}`,
                  boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
                  backgroundColor: "white",
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
                  style={{ border: "none" }}
                >
                  <option value="">Select Plan</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {plan.duration_days} days - ₹{plan.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <AlertDialogFooter className="pt-4 border-t-2 border-black">
              <AlertDialogCancel
                className="border-2 border-black font-bold"
                style={{ boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}` }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={updateUser}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase"
                style={{
                  border: `2px solid ${ACCENT_COLOR_B}`,
                  boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                }}
              >
                Update Member
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Members Table */}
        {loading ? (
          <div
            className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg border-4 border-black"
            style={{ boxShadow: `8px 8px 0 0 ${BRAND_COLOR}` }}
          >
            <Loader2 className={`w-8 h-8 text-[${BRAND_COLOR}] animate-spin`} />
            <p className="mt-4 text-gray-600">
              Loading all registered members...
            </p>
          </div>
        ) : (
          <Card
            className={`w-full border-4 border-black bg-white overflow-hidden`}
            style={{ boxShadow: `8px 8px 0 0 ${ACCENT_COLOR_B}` }}
          >
            <CardHeader className="bg-gray-100 border-b-2 border-black py-3">
              <CardTitle className="text-xl md:text-2xl font-bold uppercase text-black">
                Member Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  {filteredMembers.length === 0 && (
                    <TableCaption className="text-lg py-4 border-t-2 border-black">
                      No members found matching your search.
                    </TableCaption>
                  )}

                  <TableHeader className="bg-gray-200 border-b-2 border-black">
                    <TableRow>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase">
                        Full Name
                      </TableHead>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase">
                        Email
                      </TableHead>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase min-w-[100px]">
                        Plan
                      </TableHead>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase min-w-[100px]">
                        Phone
                      </TableHead>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase min-w-[100px]">
                        Expiry
                      </TableHead>
                      <TableHead className="p-3 text-left text-sm font-extrabold text-black uppercase min-w-[120px] hidden md:table-cell">
                        Joined On
                      </TableHead>
                      <TableHead className="p-3 text-center text-sm font-extrabold text-black uppercase min-w-[150px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredMembers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-b border-gray-200 hover:bg-yellow-50/50 transition-colors"
                      >
                        <TableCell className="font-semibold text-black min-w-[150px] flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          {user.full_name}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700 min-w-[200px]">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black`}
                            style={{
                              boxShadow: `1px 1px 0 0 ${ACCENT_COLOR_B}`,
                              backgroundColor: user.plan_name
                                ? "#D1FAE5"
                                : "#F3F4F6",
                            }} // Light green/gray background
                          >
                            {user.plan_name || "None"}
                          </span>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {user.expiry_date
                            ? formatDate(user.expiry_date)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700 hidden md:table-cell">
                          {formatDate(user.created_at)}
                        </TableCell>
                        <TableCell className="text-center flex justify-center gap-2">
                          <Button
                            onClick={() => openEditDialog(user)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-auto font-bold uppercase border-2 border-black"
                            style={{
                              boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}`,
                            }}
                          >
                            Edit
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 h-auto border-2 border-black"
                                style={{
                                  boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}`,
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent
                              className="border-4 border-black bg-white"
                              style={{
                                boxShadow: `8px 8px 0 0 ${BRAND_COLOR}`,
                              }}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-extrabold text-red-600">
                                  Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the member **
                                  {user.full_name}**? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="pt-4 border-t-2 border-black">
                                <AlertDialogCancel className="border-2 border-black font-bold">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase"
                                  style={{
                                    border: `2px solid ${ACCENT_COLOR_B}`,
                                    boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                                  }}
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
