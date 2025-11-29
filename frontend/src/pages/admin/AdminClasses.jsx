import api from "@/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "react-router-dom";
import { BicepsFlexed, Users, Building2Icon, Calendar, X, Edit2, Trash2, GitGraph, Home } from 'lucide-react'; 
// NOTE: Removed the unused import: import { Input } from "@/components/ui/input";

// --- Minimal UI helpers (pure visual changes only) ---
const sidebarLink = (path, currentPath) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition 
   ${
     currentPath === path
       ? "bg-slate-900 text-white"
       : "text-slate-600 hover:bg-slate-50"
   }`;

const mobileLink = (path, currentPath) =>
  `flex flex-col items-center justify-center text-xs ${
    currentPath === path ? "text-slate-900 font-semibold" : "text-slate-500"
  }`;

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null); 
  // New State for Deletion Confirmation
  const [classToDelete, setClassToDelete] = useState(null);

  const [form, setForm] = useState({
    name: '',
    trainer_user_id: '',
    schedule_time: '',
    capacity: 20
  });

  const location = useLocation();
  const currentPath = location.pathname;

  // --- Data Fetching Logic (UNCHANGED) ---
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/classes"); 
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error(error.response?.data?.message || "Failed to load classes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // --- Modal Control (UNCHANGED) ---

  const openEditModal = (cls) => {
    const scheduleTimeFormatted = cls.schedule_time 
      ? new Date(cls.schedule_time).toISOString().substring(0, 16) 
      : '';
      
    setEditingClass(cls);
    setForm({
        id: cls.id,
        name: cls.name,
        trainer_user_id: cls.trainer_user_id || '', 
        schedule_time: scheduleTimeFormatted,
        capacity: cls.capacity
    });
    setIsAddModalOpen(true);
  };

  const openAddModal = () => {
    setEditingClass(null);
    setForm({ name: '', trainer_user_id: '', schedule_time: '', capacity: 20 });
    setIsAddModalOpen(true);
  }

  const closeModals = () => {
    setIsAddModalOpen(false);
    setEditingClass(null);
    setClassToDelete(null); // Clear deletion state
    setForm({ name: '', trainer_user_id: '', schedule_time: '', capacity: 20 });
  };


  // --- Form Handlers (UNCHANGED) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure capacity and trainer_user_id are handled as numbers
    const finalValue = (name === 'capacity' || name === 'trainer_user_id') ? parseInt(value) || '' : value;
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/classes", form);
      toast.success("✅ Class added successfully!");
      closeModals();
      fetchClasses();
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error(error.response?.data?.message || "Failed to add class.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const classId = editingClass.id;
    try {
      await api.put(`/admin/classes/${classId}`, form);
      toast.success("💾 Class updated successfully!");
      closeModals();
      fetchClasses();
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error(error.response?.data?.message || "Failed to update class.");
    }
  };
  
  // --- DELETE Functionality (UNCHANGED) ---
  const handleDelete = async () => {
    const classId = classToDelete.id;
    try {
        await api.delete(`/admin/classes/${classId}`);
        toast.success(`🗑️ Class '${classToDelete.name}' deleted.`);
        closeModals();
        fetchClasses();
    } catch (error) {
        console.error("Error deleting class:", error);
        toast.error(error.response?.data?.message || "Failed to delete class.");
    }
  };

  // --- UI Render Functions (UNCHANGED content, only styling changed) ---

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 rounded-full border-slate-200 border-t-slate-400 animate-spin"></div>
        </div>
      );
    }

    if (classes.length === 0) {
      return (
        <div className="rounded-lg border border-slate-200 p-6 bg-slate-50 shadow-sm">
          <p className="font-semibold text-lg text-slate-900">No classes found in the database.</p>
          <p className="text-sm mt-1 text-slate-600">Please ensure the database contains class data linked to users with role_id = 2.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg text-slate-900 mb-2">
                  {cls.name}
                </h2>
                <button 
                    onClick={() => openEditModal(cls)}
                    className="p-1 bg-slate-100 rounded-md hover:bg-slate-200 transition"
                    title="Edit class"
                >
                    <Edit2 className="w-4 h-4 text-slate-700" />
                </button>
            </div>
            
            <div className="space-y-2 text-sm pt-2 text-slate-700">
                <p>
                    <strong className="font-medium text-slate-900">Trainer:</strong> {cls.trainer_name || "Unassigned"}
                </p>
                <p>
                    <strong className="font-medium text-slate-900">Time:</strong>{" "}
                    {cls.schedule_time ? new Date(cls.schedule_time).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'TBD'}
                </p>
                <p>
                    <strong className="font-medium text-slate-900">Capacity:</strong> {cls.capacity} people
                </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // --- Class Form Dialog (UI only changed) ---
  const ClassFormDialog = ({ isEditing }) => {
    if (!isAddModalOpen && !editingClass) return null;
    
    const title = isEditing ? "Edit Class" : "Add New Class";
    const submitHandler = isEditing ? handleEditSubmit : handleAddSubmit;
    const buttonText = isEditing ? "Save Changes" : "Create Class";

    // Gentle input styling for minimal UI
    const inputClass = "w-full p-3 border rounded-lg bg-white border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300 mb-4";
    const labelClass = "block text-sm font-medium text-slate-800 mb-1";
    
    // Key ensures React treats the form as a new instance, preventing stale state/focus issues
    const dialogKey = isEditing ? `edit-${editingClass.id}` : 'add-new';

    return (
      <div 
        key={dialogKey} 
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4"
      >
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative">
          
          <button
            onClick={closeModals}
            className="absolute top-4 right-4 p-2 rounded-md bg-slate-100 hover:bg-slate-200"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>

          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className={labelClass}>Class Name</label>
              <input type="text" name="name" id="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-3">
              <label htmlFor="trainer_user_id" className={labelClass}>Trainer User ID (Role 2)</label>
              <input type="number" name="trainer_user_id" id="trainer_user_id" value={form.trainer_user_id} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-3">
              <label htmlFor="schedule_time" className={labelClass}>Schedule Time</label>
              <input type="datetime-local" name="schedule_time" id="schedule_time" value={form.schedule_time} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-4">
              <label htmlFor="capacity" className={labelClass}>Capacity</label>
              <input type="number" name="capacity" id="capacity" value={form.capacity} onChange={handleChange} className={inputClass} min="1" required />
            </div>
            
            <div className="flex items-center gap-3 mt-4">
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setClassToDelete(editingClass); // Set class for deletion
                            closeModals(); // Close the edit form
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                    >
                        <Trash2 className="inline-block w-4 h-4 mr-2 align-middle" /> Delete
                    </button>
                )}
                <button
                    type="submit"
                    className={`ml-auto bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800`}
                >
                    {buttonText}
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // --- Delete confirmation dialog (UI only) ---
  const DeleteClassAlertDialog = () => {
    if (!classToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-3">Confirm deletion</h3>
            <p className="mb-6 text-slate-700">
                Are you sure you want to delete the class <strong>{classToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => setClassToDelete(null)}
                    className="flex-1 bg-slate-100 text-slate-800 px-4 py-2 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Yes, Delete
                </button>
            </div>
        </div>
      </div>
    );
  };


  // --- Main Component Structure (UNCHANGED behavior, UI only) ---
  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex bg-white min-h-screen">
      
      {/* 1. SIDEBAR (pure white minimal) */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white px-6 mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-2 mt-6">
          <Link to="/admin/dashboard" className={sidebarLink("/admin/dashboard", currentPath)}>
            <GitGraph className="w-5 h-5" />
            Analytics
          </Link>

          <Link to="/admin/trainers" className={sidebarLink("/admin/trainers", currentPath)}>
            <BicepsFlexed className="w-5 h-5" />
            Trainers
          </Link>

          <Link to="/admin/members" className={sidebarLink("/admin/members", currentPath)}>
            <Users className="w-5 h-5" />
            Members
          </Link>

          <Link to="/admin/classes" className={sidebarLink("/admin/classes", currentPath)}>
            <Building2Icon className="w-5 h-5" />
            Classes
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Class Schedule</h1>
              <p className="text-slate-600 mt-1">Create, edit and schedule classes for your trainers.</p>
            </div>

            <button
                onClick={openAddModal}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800"
            >
                + Add Class
            </button>
        </div>

        {renderContent()}

      </main>
      
      {/* 3. MODALS/DIALOGS */}
      <ClassFormDialog isEditing={!!editingClass} />
      <DeleteClassAlertDialog />

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center md:hidden shadow-sm">
          <Link to="/admin" className={mobileLink("/admin", currentPath)}>
            <Home className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>

          <Link to="/admin/trainers" className={mobileLink("/admin/trainers", currentPath)}>
            <BicepsFlexed className="w-5 h-5" />
            <span className="text-xs">Trainers</span>
          </Link>

          <Link to="/admin/members" className={mobileLink("/admin/members", currentPath)}>
            <Users className="w-5 h-5" />
            <span className="text-xs">Members</span>
          </Link>

          <Link to="/admin/classes" className={mobileLink("/admin/classes", currentPath)}>
            <Building2Icon className="w-5 h-5" />
            <span className="text-xs">Classes</span>
          </Link>

          <Link to="/admin/attendance" className={mobileLink("/admin/attendance", currentPath)}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Attendance</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default AdminClasses;
