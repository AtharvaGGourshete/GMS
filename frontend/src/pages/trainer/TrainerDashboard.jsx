import React from 'react'
import { Link } from 'react-router-dom';
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

const TrainerDashboard = () => {
const currentPath = location.pathname;
  const DesktopSidebar = (
    <aside className="hidden md:block w-64 text-gray-800 shadow-2xl p-4 bg-white border-r sticky top-0 h-screen">
      <div className="flex items-center justify-center h-16 border-b mb-6">
        <Link
          to="/admin"
          className={`text-2xl font-extrabold text-[${BRAND_COLOR}]`}
        >
          Trainer Panel
        </Link>
      </div>
      <nav className="flex flex-col space-y-1">
        <Link
          to="/trainer/members"
          className={getLinkClass("/trainer/members", currentPath)}
        >
          <Users
            className={`w-5 h-5 mr-3 ${
              currentPath === "/trainer/members" ? "text-white" : "text-gray-600"
            }`}
          />
          Members
        </Link>

        <Link
          to="/trainer/classes"
          className={getLinkClass("/trainer/classes", currentPath)}
        >
          <Building2Icon className="w-5 h-5 mr-3" />
          Classes
        </Link>
      </nav>
    </aside>
  );
  return (
    <div>
      {DesktopSidebar}
    </div>
  )
}

export default TrainerDashboard
