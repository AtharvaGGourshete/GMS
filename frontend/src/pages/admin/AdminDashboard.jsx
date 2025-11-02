import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Settings, PanelLeft, Calendar, BicepsFlexed, Building2Icon } from "lucide-react"; // Added icons

const AdminDashboard = () => {
  // State for toggling the sidebar on smaller screens, if desired
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  return (
    // Use 'flex' on the main container to lay out the sidebar and content
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar - Use a consistent width and position/sticky */}
      {/* For simplicity, this is desktop-first. Use conditional classes for mobile slide-out. */}
      <aside className="hidden md:block w-64 text-gray-800 shadow-xl p-4 bg-white border-r"> 
        
        {/* Header/Title */}
        <div className="flex items-center justify-center h-16 border-b mb-6">
          <Link to="/admin" className="text-2xl font-extrabold text-[#F24423]">
            Admin Panel
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col space-y-1">
          <Link
            to="/trainers"
            className="flex items-center p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#F24423] hover:text-white transition-colors duration-150 group"
          >
            <BicepsFlexed className="w-5 h-5 mr-3 group-hover:text-white" />
            Trainers
          </Link>

          <Link
            to="/admin/members" // Changed to admin path for clarity
            className="flex items-center p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#F24423] hover:text-white transition-colors duration-150 group"
          >
            <Users className="w-5 h-5 mr-3 group-hover:text-white" />
            Members
          </Link>

          <Link
            to="/admin/settings" // Changed to admin path for clarity
            className="flex items-center p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#F24423] hover:text-white transition-colors duration-150 group"
          >
            <Building2Icon className="w-5 h-5 mr-3 group-hover:text-white" />
            Class
          </Link>

          <Link
            to="/admin/settings" // Changed to admin path for clarity
            className="flex items-center p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#F24423] hover:text-white transition-colors duration-150 group"
          >
            <Calendar className="w-5 h-5 mr-3 group-hover:text-white" />
            Attendance
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* A place to render the specific admin view (e.g., Users, Settings) */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Dashboard!</h1>
        <p className="text-gray-600">
          This is the main content area where your administrative views will be displayed.
        </p>
        
        {/* Placeholder for content */}
        {/* <Outlet /> */} 
      </main>
    </div>
  );
};

export default AdminDashboard;