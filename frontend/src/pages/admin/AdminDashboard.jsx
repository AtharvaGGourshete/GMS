import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  Calendar,
  BicepsFlexed,
  Building2Icon,
  GitGraph
} from "lucide-react";

const navItems = [
  { label: "Analytics", icon: GitGraph, path: "/admin/dashboard" },
  { label: "Trainers", icon: BicepsFlexed, path: "/admin/trainers" },
  { label: "Members", icon: Users, path: "/admin/members" },
  { label: "Classes", icon: Building2Icon, path: "/admin/classes" },
];

export default function AdminDashboard() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white px-6 mt-10">
        <Link
          to="/admin"
          className="text-2xl font-semibold tracking-tight text-slate-900"
        >
          Admin Panel
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const active = current === item.path;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-3">
          Welcome to the Dashboard
        </h1>
        <p className="text-slate-600 mb-8">
          This clean and minimal interface helps you manage your entire gym efficiently.
        </p>

        {/* Analytics Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-slate-500 text-sm font-medium mb-2">
                Metric {i}
              </p>
              <p className="text-3xl font-semibold text-slate-800">
                Coming Soon
              </p>
            </div>
          ))}
        </div>

        {/* Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            System Overview
          </h2>
          <p className="text-slate-600 max-w-xl">
            The Admin Dashboard will soon include detailed analytics, charts,
            attendance tracking, revenue breakdown, and more — all in a clean,
            minimal Apple-style UI.
          </p>
        </div>
      </main>
    </div>
  );
}
