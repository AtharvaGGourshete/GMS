import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <main className="min-h-screen">
      <section id="sidebar">
        <aside className="absolute left-0 w-64 h-screen text-black shadow-lg p-4 border ">
          {/* Header/Title */}
          <div className="text-xl font-bold mb-6 text-center text-[#F24423]">
            Dashboard Menu
          </div>
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="block p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150"
            >
              Home
            </Link>

            <Link
              to="/users"
              className="block p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150"
            >
              Users
            </Link>

            <Link
              to="/settings"
              className="block p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150"
            >
              Settings
            </Link>
          </nav>
        </aside>
      </section>
    </main>
  );
};

export default AdminDashboard;
