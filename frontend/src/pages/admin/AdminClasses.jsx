import api from "@/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "react-router-dom";
import { BicepsFlexed, Users, Building2Icon, Calendar, X, Edit2, Trash2, GitGraph } from 'lucide-react'; 
// NOTE: Removed the unused import: import { Input } from "@/components/ui/input";

const BRAND_COLOR = "#F24423"; 
// Link Class Helpers (retained as provided)
const getLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex items-center p-3 text-base font-medium transition-colors duration-150 group border-2 border-transparent 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md border-black`
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
          }`;
};

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

  // --- UI Render Functions (UNCHANGED) ---

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (classes.length === 0) {
      return (
        <div className="border-4 border-black p-6 bg-yellow-100 shadow-[4px_4px_0_0_#000]">
          <p className="font-bold text-lg">No classes found in the database.</p>
          <p className="text-sm mt-1">Please ensure the database contains class data linked to users with role_id = 2.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="border-4 border-black p-5 bg-white shadow-[8px_8px_0_0_#000] transition-all duration-100 hover:shadow-[10px_10px_0_0_#000]"
          >
            <div className="flex justify-between items-start">
                <h2 className="font-extrabold text-xl text-black mb-3 border-b-2 border-black pb-1 pr-4">
                  {cls.name}
                </h2>
                <button 
                    onClick={() => openEditModal(cls)}
                    className={`p-1 bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_#000] hover:bg-yellow-500 transition-colors duration-100 flex-shrink-0`}
                >
                    <Edit2 className="w-4 h-4 text-black" />
                </button>
            </div>
            
            <div className="space-y-2 text-sm pt-2">
                <p>
                    <strong className="font-bold text-gray-800">Trainer:</strong> {cls.trainer_name || "Unassigned"}
                </p>
                <p>
                    <strong className="font-bold text-gray-800">Time:</strong>{" "}
                    {new Date(cls.schedule_time).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
                <p>
                    <strong className="font-bold text-gray-800">Capacity:</strong> {cls.capacity} people
                </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // --- Class Form Dialog (Custom Modal for Data Entry) ---
  const ClassFormDialog = ({ isEditing }) => {
    if (!isAddModalOpen && !editingClass) return null;
    
    const title = isEditing ? "Edit Class" : "Add New Class";
    const submitHandler = isEditing ? handleEditSubmit : handleAddSubmit;
    const buttonText = isEditing ? "SAVE CHANGES" : "CREATE CLASS";

    // 💡 Using 'inputClass' for the HTML input element's className
    const inputClass = "w-full p-3 border-2 border-black bg-white shadow-[2px_2px_0_0_#000] focus:shadow-[4px_4px_0_0_#000] transition-all duration-100 mb-4";
    const labelClass = "block text-sm font-bold text-black mb-1";
    
    // Key ensures React treats the form as a new instance, preventing stale state/focus issues
    const dialogKey = isEditing ? `edit-${editingClass.id}` : 'add-new';

    return (
      <div 
        key={dialogKey} 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      >
        <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] w-full max-w-lg p-6 relative">
          
          <button
            onClick={closeModals}
            className="absolute top-3 right-3 p-2 bg-red-500 border-2 border-black text-white hover:bg-red-600 shadow-[2px_2px_0_0_#000]"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-extrabold mb-6 border-b-4 border-black pb-2">{title}</h2>
          
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className={labelClass}>Class Name</label>
              {/* 🔄 Replaced <Input> with native <input> */}
              <input type="text" name="name" id="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-4">
              <label htmlFor="trainer_user_id" className={labelClass}>Trainer User ID (Role 2)</label>
              {/* 🔄 Replaced <Input> with native <input> */}
              <input type="number" name="trainer_user_id" id="trainer_user_id" value={form.trainer_user_id} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-4">
              <label htmlFor="schedule_time" className={labelClass}>Schedule Time</label>
              {/* 🔄 Replaced <Input> with native <input> */}
              <input type="datetime-local" name="schedule_time" id="schedule_time" value={form.schedule_time} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="mb-6">
              <label htmlFor="capacity" className={labelClass}>Capacity</label>
              {/* 🔄 Replaced <Input> with native <input> */}
              <input type="number" name="capacity" id="capacity" value={form.capacity} onChange={handleChange} className={inputClass} min="1" required />
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setClassToDelete(editingClass); // Set class for deletion
                            closeModals(); // Close the edit form
                        }}
                        className={`bg-red-500 text-white border-4 border-black px-4 py-2 font-bold shadow-[4px_4px_0_0_#000] transition-all duration-100 hover:shadow-[6px_6px_0_0_#000] flex items-center text-sm`}
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> DELETE
                    </button>
                )}
                <button
                    type="submit"
                    className={`bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold shadow-[4px_4px_0_0_#000] transition-all duration-100 hover:shadow-[6px_6px_0_0_#000] hover:bg-blue-600 ${isEditing ? 'ml-auto' : 'w-full'}`}
                >
                    {buttonText}
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // --- AlertDialog for Deletion Confirmation (UNCHANGED) ---
  const DeleteClassAlertDialog = () => {
    if (!classToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
        <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] w-full max-w-sm p-6 relative text-center">
            <h3 className="text-xl font-extrabold text-red-600 mb-4 border-b-4 border-black pb-2">
                CONFIRM DELETION
            </h3>
            <p className="mb-6 text-gray-700">
                Are you sure you want to delete the class **{classToDelete.name}**? This action cannot be undone.
            </p>
            <div className="flex justify-between space-x-4">
                <button
                    onClick={() => setClassToDelete(null)}
                    className="flex-1 bg-gray-300 text-black border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0_0_#000] hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0_0_#000] hover:bg-red-700"
                >
                    Yes, Delete
                </button>
            </div>
        </div>
      </div>
    );
  };


  // --- Main Component Structure (UNCHANGED) ---
  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* 1. SIDEBAR */}
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
          to="/admin/dashboard"
          className={getLinkClass("/admin/dashboard", currentPath)}
        >
          <GitGraph className="w-5 h-5 mr-3 " />
          Analytics
        </Link>
          <Link to="/admin/trainers" className={getLinkClass("/admin/trainers", currentPath)}>
            <BicepsFlexed className="w-5 h-5 mr-3" />
            Trainers
          </Link>
          <Link to="/admin/members" className={getLinkClass("/admin/members", currentPath)}>
            <Users
              className={`w-5 h-5 mr-3 ${currentPath === "/admin/members" ? "text-white" : "text-gray-600 "}`}
            />
            Members
          </Link>
          <Link to="/admin/classes" className={getLinkClass("/admin/classes", currentPath)}>
            <Building2Icon className="w-5 h-5 mr-3" />
            Classes
          </Link>
          
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12">
        <div className="flex justify-between items-center mb-10 pb-4 border-b-4 border-black">
            <h1 className="text-4xl font-extrabold text-black">
                Class Schedule
            </h1>
            <button
                onClick={openAddModal}
                className={`bg-green-400 text-black border-4 border-black px-6 py-2 font-bold shadow-[4px_4px_0_0_#000] transition-all duration-100 hover:shadow-[6px_6px_0_0_#000]`}
            >
                + ADD NEW CLASS
            </button>
        </div>

        {renderContent()}

      </main>
      
      {/* 3. MODALS/DIALOGS */}
      <ClassFormDialog isEditing={!!editingClass} />
      <DeleteClassAlertDialog />
    </div>
  );
};

export default AdminClasses;