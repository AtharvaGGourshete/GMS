import React, { useEffect, useState } from "react";
import api from "@/axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  Users,
  BicepsFlexed,
  Building2Icon,
  GitGraph,
  Calendar,
  Search,
  UserPlus,
  Loader2,
  Trash2,
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sidebarItems = [
  { label: "Analytics", icon: GitGraph, path: "/admin/dashboard" },
  { label: "Trainers", icon: BicepsFlexed, path: "/admin/trainers" },
  { label: "Members", icon: Users, path: "/admin/members" },
  { label: "Classes", icon: Building2Icon, path: "/admin/classes" },
];

const AdminMembers = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // User forms
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    plan_id: "",
  });

  const [editUser, setEditUser] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    plan_id: "",
    current_plan_id: "",
  });

  const fetchMembers = async () => {
    try {
      const res = await api.get("/user");
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to fetch members.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
    } catch (err) {
      toast.error("Failed to fetch plans.");
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  const openEdit = (user) => {
    setEditUser({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      password: "",
      plan_id: user.plan_id || "",
      current_plan_id: user.plan_id,
    });
    setEditOpen(true);
  };

  const createUser = async () => {
    const { full_name, email, password } = newUser;
    if (!full_name || !email || !password) {
      toast.error("Name, Email & Password required");
      return;
    }

    try {
      const res = await api.post("/user", newUser);
      toast.success("Member created");
      setAddOpen(false);
      setNewUser({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        plan_id: "",
      });
      fetchMembers();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const updateUser = async () => {
    if (!editUser.full_name || !editUser.email) {
      toast.error("Name & Email required");
      return;
    }

    try {
      const payload = {
        full_name: editUser.full_name,
        email: editUser.email,
        phone: editUser.phone,
      };
      if (editUser.password) payload.password = editUser.password;

      await api.put(`/user/${editUser.id}`, payload);

      toast.success("Updated");
      setEditOpen(false);
      fetchMembers();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      toast.success("Deleted");
      fetchMembers();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filtered = members.filter((u) =>
    `${u.full_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white px-6 mt-10">
        <p className="text-2xl font-semibold tracking-tight text-slate-900">
          Admin Panel
        </p>

        <nav className="mt-10 flex flex-col gap-1">
          {sidebarItems.map((item, idx) => {
            const Icon = item.icon;
            const active = currentPath === item.path;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
              Members
            </h1>
            <p className="text-slate-600">
              Manage all registered gym members cleanly and efficiently.
            </p>
          </div>

          <Button onClick={() => setAddOpen(true)} className="rounded-xl">
            <UserPlus className="h-5 w-5 mr-2" /> Add Member
          </Button>
        </div>

        {/* Search */}
        <div className="max-w-sm mb-6 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search members..."
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
            <p className="text-slate-600">Loading members…</p>
          </div>
        ) : (
          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Member List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-500">
                    <th className="p-4 font-medium">Full Name</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Plan</th>
                    <th className="p-4 font-medium">Phone</th>
                    <th className="p-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-800">
                        {u.full_name}
                      </td>
                      <td className="p-4 text-slate-700">{u.email}</td>
                      <td className="p-4 text-slate-700">
                        {u.plan_name || "—"}
                      </td>
                      <td className="p-4 text-slate-700">{u.phone || "—"}</td>

                      <td className="p-4 text-center flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(u)}
                          className="rounded-xl"
                        >
                          Edit
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-xl"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Member?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action is permanent.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteUser(u.id)}
                                className="rounded-xl"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>

      {/* ADD MEMBER DIALOG */}
      <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
        <AlertDialogContent className="rounded-3xl max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Add Member</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              placeholder="Full Name"
              className="rounded-xl"
              value={newUser.full_name}
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
            />

            <Input
              placeholder="Email"
              className="rounded-xl"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <Input
              placeholder="Phone"
              className="rounded-xl"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              className="rounded-xl"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <select
              className="border rounded-xl p-2 text-sm"
              value={newUser.plan_id}
              onChange={(e) =>
                setNewUser({ ...newUser, plan_id: e.target.value })
              }
            >
              <option value="">Select Plan (optional)</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={createUser}
              className="rounded-xl"
            >
              Add Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* EDIT MEMBER DIALOG */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent className="rounded-3xl max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Member</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              placeholder="Full Name"
              className="rounded-xl"
              value={editUser.full_name}
              onChange={(e) =>
                setEditUser({ ...editUser, full_name: e.target.value })
              }
            />

            <Input
              placeholder="Email"
              className="rounded-xl"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <Input
              placeholder="Phone"
              className="rounded-xl"
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
            />

            <Input
              placeholder="New Password"
              type="password"
              className="rounded-xl"
              value={editUser.password}
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
            />

            <select
              className="border rounded-xl p-2 text-sm"
              value={editUser.plan_id}
              onChange={(e) =>
                setEditUser({ ...editUser, plan_id: e.target.value })
              }
            >
              <option value="">Select Plan</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={updateUser}
              className="rounded-xl"
            >
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMembers;
