import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "@/axios";
import { toast } from "sonner";

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

import {
  Search,
  UserPlus,
  Trash2,
  GitGraph,
  BicepsFlexed,
  Users,
  Building2Icon,
  Calendar,
  Home,
  Loader2,
} from "lucide-react";

// Pure minimal Apple-style sidebar link classes
const sidebarLink = (current, path) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl text-[15px] transition 
   ${
     current === path
       ? "bg-slate-900 text-white"
       : "text-slate-600 hover:bg-slate-100"
   }`;

// Mobile bottom navigation (minimal)
const mobileLink = (current, path) =>
  `flex flex-col items-center justify-center text-xs ${
    current === path ? "text-slate-900 font-semibold" : "text-slate-500"
  }`;

export default function AdminTrainers() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    certifications: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Fetch trainers (UNCHANGED)
  // ------------------------------
  const fetchTrainers = async () => {
    try {
      const res = await api.get("/admin/trainers");
      setTrainers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // ------------------------------
  // Create trainer (UNCHANGED)
  // ------------------------------
  const createTrainer = async () => {
    const { full_name, email, phone, specialization } = newTrainer;

    if (!full_name || !email || !phone || !specialization) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await api.post("/admin/trainers", {
        full_name,
        email,
        phone,
        specialization,
        certifications: newTrainer.certifications || "None",
        image_url: `https://placehold.co/150x150?text=${full_name[0]}`,
        rating: 5.0,
        bio: `${specialization} expert dedicated to helping clients.`,
      });

      toast.success("Trainer added successfully");
      setDialogOpen(false);

      setNewTrainer({
        full_name: "",
        email: "",
        phone: "",
        specialization: "",
        certifications: "",
      });

      fetchTrainers();
    } catch (err) {
      toast.error("Error adding trainer");
    }
  };

  // ------------------------------
  // Delete trainer (UNCHANGED)
  // ------------------------------
  const deleteTrainer = async (id) => {
    try {
      await api.delete(`/admin/trainers/${id}`);
      toast.success("Trainer deleted");
      fetchTrainers();
    } catch (err) {
      toast.error("Failed to delete trainer");
    }
  };

  // Search (UNCHANGED)
  const filteredTrainers = trainers.filter(
    (t) =>
      t.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Detect mobile
  const isMobile = window.innerWidth < 768;

  if (loading)
    return (
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
        </main>
      </div>
    );

  return (
    <div className={`flex min-h-screen bg-white ${isMobile ? "pb-16" : ""}`}>
      {/* ---------------- Sidebar (Apple Minimal) --------------- */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white px-6 mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Admin Panel
        </h2>

        <nav className="mt-8 space-y-2">
          <Link to="/admin/dashboard" className={sidebarLink(currentPath, "/admin/dashboard")}>
            <GitGraph className="h-5 w-5" />
            Analytics
          </Link>

          <Link to="/admin/trainers" className={sidebarLink(currentPath, "/admin/trainers")}>
            <BicepsFlexed className="h-5 w-5" />
            Trainers
          </Link>

          <Link to="/admin/members" className={sidebarLink(currentPath, "/admin/members")}>
            <Users className="h-5 w-5" />
            Members
          </Link>

          <Link to="/admin/classes" className={sidebarLink(currentPath, "/admin/classes")}>
            <Building2Icon className="h-5 w-5" />
            Classes
          </Link>
        </nav>
      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">Trainers</h1>
            <p className="text-slate-600 mt-1">
              Manage all trainers in your gym.
            </p>
          </div>

          <Button onClick={() => setDialogOpen(true)} className="rounded-xl">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Trainer
          </Button>
        </div>

        {/* Search */}
        <div className="max-w-sm mb-6 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search trainers..."
            className="pl-10 rounded-xl bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Trainer Table */}
        <Card className="rounded-3xl border bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Trainer List
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Specialization</th>
                  <th className="p-4 font-medium text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTrainers.map((t) => (
                  <tr key={t.trainer_id} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800 flex items-center gap-3">
                      <img
                        src={t.image_url || "https://placehold.co/100x100"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {t.full_name}
                    </td>

                    <td className="p-4 text-slate-600">{t.email}</td>
                    <td className="p-4 text-slate-600">{t.phone || "—"}</td>
                    <td className="p-4 text-slate-600">{t.specialization}</td>

                    <td className="p-4 text-center">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-xl"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Trainer?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => deleteTrainer(t.trainer_id)}
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
      </main>

      {/* ---------------- Mobile Bottom Nav ---------------- */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center md:hidden shadow-lg">
          <Link to="/admin" className={mobileLink(currentPath, "/admin")}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/trainers"
            className={mobileLink(currentPath, "/admin/trainers")}
          >
            <BicepsFlexed className="w-5 h-5" />
            <span>Trainers</span>
          </Link>

          <Link
            to="/admin/members"
            className={mobileLink(currentPath, "/admin/members")}
          >
            <Users className="w-5 h-5" />
            <span>Members</span>
          </Link>

          <Link
            to="/admin/classes"
            className={mobileLink(currentPath, "/admin/classes")}
          >
            <Building2Icon className="w-5 h-5" />
            <span>Classes</span>
          </Link>

          <Link
            to="/admin/attendance"
            className={mobileLink(currentPath, "/admin/attendance")}
          >
            <Calendar className="w-5 h-5" />
            <span>Attendance</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
