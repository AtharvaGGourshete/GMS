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
import { Search, UserPlus, Trash2, BicepsFlexed, Users, Building2Icon, Calendar, Home, Loader2, Mail, Phone, Briefcase } from "lucide-react";

// --- CONSTANTS AND HELPER FUNCTIONS ---
const BRAND_COLOR = "#F24423";
const ACCENT_COLOR_B = "#000000"; // Black for Neobrutalist borders/shadows

// Helper for mobile/desktop navigation
const getLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex items-center p-3 text-base font-medium transition-colors duration-150 group border-2 border-transparent 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md border-black`
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
          }`;
};

const getMobileLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex flex-col items-center justify-center p-2 text-xs transition-colors duration-150 
          ${
            isActive
              ? `text-[${BRAND_COLOR}]`
              : "text-gray-500 hover:text-gray-700"
          }`;
};

// Check window width (needed for responsiveness)
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
    });
    useEffect(() => {
        const handleResize = () => setWindowDimensions({ width: window.innerWidth });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
};

// --- AdminTrainers Component ---
const AdminTrainers = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

  // Fetch all trainers
  const fetchTrainers = async () => {
    try {
      const res = await api.get("/admin/trainers");
      setTrainers(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch trainers");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Create trainer
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
        // Default values for neobrutalist presentation
        image_url: `https://placehold.co/150x150?text=${full_name.split(' ')[0]}`,
        rating: 5.0,
        bio: `${specialization} expert dedicated to helping clients achieve peak performance.`,
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
      console.error("Trainer creation error:", err);
      toast.error(err.response?.data?.message || "Error adding trainer");
    }
  };

  // Delete trainer
  const deleteTrainer = async (id) => {
    try {
      await api.delete(`/admin/trainers/${id}`);
      toast.success("Trainer deleted successfully!");
      fetchTrainers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete trainer");
    }
  };

  // Filter trainers
  const filteredTrainers = trainers.filter(
    (t) =>
      t.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Sidebar Components ---
  const DesktopSidebar = (
    <aside className="hidden md:block w-64 text-gray-800 shadow-2xl p-4 bg-white border-r sticky top-0 h-screen"> 
        <div className="flex items-center justify-center h-16 border-b mb-6">
            <Link to="/admin" className={`text-2xl font-extrabold text-[${BRAND_COLOR}]`}>
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
            <Link to="/admin/members" className={getLinkClass("/admin/members", currentPath)}>
                <Users className="w-5 h-5 mr-3 group-hover:text-white" />
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
  );

  const MobileBottomNav = (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-50 md:hidden shadow-lg">
      <div className="flex justify-around h-full">
        <Link to="/admin" className={getMobileLinkClass("/admin", currentPath)}>
            <Home className="w-5 h-5" />
            <span className="mt-1">Dashboard</span>
        </Link>
        <Link to="/admin/trainers" className={getMobileLinkClass("/admin/trainers", currentPath)}>
          <BicepsFlexed className="w-5 h-5" />
          <span className="mt-1">Trainers</span>
        </Link>
        <Link to="/admin/members" className={getMobileLinkClass("/admin/members", currentPath)}>
          <Users className="w-5 h-5" />
          <span className="mt-1">Members</span>
        </Link>
        <Link to="/admin/classes" className={getMobileLinkClass("/admin/classes", currentPath)}>
          <Building2Icon className="w-5 h-5" />
          <span className="mt-1">Classes</span>
        </Link>
        <Link to="/admin/attendance" className={getMobileLinkClass("/admin/attendance", currentPath)}>
          <Calendar className="w-5 h-5" />
          <span className="mt-1">Attendance</span>
        </Link>
      </div>
    </nav>
  );

  // --- Neobrutalist Input Component (used inside AlertDialog) ---
  const NeobrutalistInput = ({ placeholder, ...props }) => (
    <div 
      className="relative w-full"
      style={{
        border: `2px solid ${ACCENT_COLOR_B}`,
        boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
        backgroundColor: 'white',
      }}
    >
      <Input
        placeholder={placeholder}
        className="w-full h-10 px-3 py-2 border-0 focus:ring-0 focus:border-0 appearance-none bg-transparent"
        style={{ border: 'none' }}
        {...props}
      />
    </div>
  );

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50">
        {DesktopSidebar}
        <main className="flex-1 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <Loader2 className={`w-8 h-8 text-[${BRAND_COLOR}] animate-spin`} />
                <p className="mt-4 text-lg text-gray-700">Loading trainers list...</p>
            </div>
        </main>
    </div>
  );
  
  return (
    <div className={`flex min-h-screen bg-gray-50 ${isMobile ? "pb-16" : ""}`}>
      {DesktopSidebar}
      
      <main className="flex-1 p-4 md:p-8">
        
        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-black">
            Trainer ({filteredTrainers.length})
          </h1>

          <div className="flex gap-4 items-center">
            
            {/* Search Input (Neobrutalist Style) */}
            <div 
                className="relative hidden md:block"
                style={{
                    border: `2px solid ${ACCENT_COLOR_B}`,
                    boxShadow: `3px 3px 0 0 ${BRAND_COLOR}`,
                    backgroundColor: 'white',
                }}
            >
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search trainers..."
                  className="pl-8 border-0 focus:ring-0 focus:border-0 appearance-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none' }}
                />
            </div>

            {/* Add Trainer Dialog */}
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
                  <UserPlus className="w-4 h-4 mr-2" /> Add Trainer
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent 
                className="border-4 border-black bg-white" 
                style={{ boxShadow: `8px 8px 0 0 ${BRAND_COLOR}` }}
              >
                <AlertDialogHeader className="border-b-2 border-black pb-3 mb-2">
                  <AlertDialogTitle className="text-2xl font-extrabold text-black">Add a New Trainer</AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill in the necessary details for the new trainer.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="grid gap-3 py-3">
                    <NeobrutalistInput
                        placeholder="Full Name (Required)"
                        value={newTrainer.full_name}
                        onChange={(e) =>
                            setNewTrainer({ ...newTrainer, full_name: e.target.value })
                        }
                    />
                    <NeobrutalistInput
                        placeholder="Email (Required)"
                        type="email"
                        value={newTrainer.email}
                        onChange={(e) =>
                            setNewTrainer({ ...newTrainer, email: e.target.value })
                        }
                    />
                    <NeobrutalistInput
                        placeholder="Phone (Required)"
                        value={newTrainer.phone}
                        onChange={(e) =>
                            setNewTrainer({ ...newTrainer, phone: e.target.value })
                        }
                    />
                    <NeobrutalistInput
                        placeholder="Specialization (Required)"
                        value={newTrainer.specialization}
                        onChange={(e) =>
                            setNewTrainer({
                                ...newTrainer,
                                specialization: e.target.value,
                            })
                        }
                    />
                    <NeobrutalistInput
                        placeholder="Certifications (Optional)"
                        value={newTrainer.certifications}
                        onChange={(e) =>
                            setNewTrainer({
                                ...newTrainer,
                                certifications: e.target.value,
                            })
                        }
                    />
                </div>

                <AlertDialogFooter className="pt-4 border-t-2 border-black">
                  <AlertDialogCancel 
                    className="border-2 border-black font-bold"
                    style={{ boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}` }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={createTrainer}
                    className="text-white font-bold uppercase"
                    style={{
                        backgroundColor: BRAND_COLOR,
                        border: `2px solid ${ACCENT_COLOR_B}`,
                        boxShadow: `4px 4px 0 0 ${ACCENT_COLOR_B}`,
                    }}
                  >
                    Create Trainer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Trainers Table/Card List */}
        <Card 
            className="w-full border-4 border-black bg-white overflow-hidden"
            style={{ boxShadow: `8px 8px 0 0 ${ACCENT_COLOR_B}` }}
        >
          <CardHeader className="bg-gray-100 border-b-2 border-black py-3">
            <CardTitle className="text-xl font-bold uppercase text-black">
              Trainer Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200 border-b-2 border-black">
                  <tr>
                    <th className="p-3 text-left text-sm font-extrabold text-black uppercase">Name</th>
                    <th className="p-3 text-left text-sm font-extrabold text-black uppercase hidden md:table-cell">Email</th>
                    <th className="p-3 text-left text-sm font-extrabold text-black uppercase hidden lg:table-cell">Phone</th>
                    <th className="p-3 text-left text-sm font-extrabold text-black uppercase">Specialization</th>
                    <th className="p-3 text-left text-sm font-extrabold text-black uppercase hidden lg:table-cell">Certifications</th>
                    <th className="p-3 text-center text-sm font-extrabold text-black uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrainers.length > 0 ? (
                    filteredTrainers.map((trainer) => (
                      <tr key={trainer.trainer_id} className="border-b border-gray-200 hover:bg-yellow-50/50 transition-colors">
                        <td className="p-3 font-semibold text-black flex items-center gap-3">
                          <img
                            src={trainer.image_url || `https://placehold.co/150x150?text=T`}
                            alt={trainer.full_name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-black"
                          />
                          {trainer.full_name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 hidden md:table-cell">{trainer.email}</td>
                        <td className="p-3 text-sm text-gray-700 hidden lg:table-cell">{trainer.phone || "N/A"}</td>
                        <td className="p-3">
                            <span 
                                className="inline-block px-3 py-1 text-xs font-bold uppercase bg-yellow-300 text-black border-2 border-black"
                                style={{ boxShadow: `1px 1px 0 0 ${ACCENT_COLOR_B}` }}
                            >
                                {trainer.specialization || "General"}
                            </span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 hidden lg:table-cell">{trainer.certifications || "N/A"}</td>
                        <td className="p-3 text-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="border-2 border-black"
                                style={{ boxShadow: `2px 2px 0 0 ${ACCENT_COLOR_B}` }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent 
                                className="border-4 border-black bg-white" 
                                style={{ boxShadow: `8px 8px 0 0 ${BRAND_COLOR}` }}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-extrabold text-red-600">Confirm Deletion</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to permanently delete **{trainer.full_name}**? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="pt-4 border-t-2 border-black">
                                <AlertDialogCancel className="border-2 border-black font-bold">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteTrainer(trainer.trainer_id)}
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500 font-medium border-t">
                        No trainers found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {isMobile && MobileBottomNav}
    </div>
  );
};

export default AdminTrainers;