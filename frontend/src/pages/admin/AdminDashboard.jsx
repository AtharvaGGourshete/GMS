import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Settings, PanelLeft, Calendar, BicepsFlexed, Building2Icon, GitGraph } from "lucide-react"; // Added icons

const BRAND_COLOR = "#F24423";
const ACCENT_COLOR_B = "#000000";
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

const AdminDashboard = () => {
  // State for toggling the sidebar on smaller screens, if desired
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const currentPath = location.pathname;

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
          to="/admin/dashboard"
          className={getLinkClass("/admin/dashboard", currentPath)}
        >
          <GitGraph className="w-5 h-5 mr-3 " />
          Analytics
        </Link>
          <Link
            to="/admin/trainers"
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
            to="/admin/classes" // Changed to admin path for clarity
            className="flex items-center p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#F24423] hover:text-white transition-colors duration-150 group"
          >
            <Building2Icon className="w-5 h-5 mr-3 group-hover:text-white" />
            Classes
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