import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Shield,
  ClipboardList,
  UserCog,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bell,
  FileText
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminLandingPage() {
  const responsibilities = [
    {
      title: "Member Management",
      description:
        "Handle registrations, renewals, plans, and member lifecycle.",
      icon: Users,
      link: "/admin/members",
    },
    {
      title: "Trainer Oversight",
      description:
        "Recruit, assign, and monitor trainers and staff performance.",
      icon: UserCog,
      link: "/admin/trainers",
    },
    {
      title: "Financial Management",
      description: "Track payments, revenue, invoices, and financial analytics.",
      icon: DollarSign,
      link: "/admin/finances",
    },
    {
      title: "Analytics & Reporting",
      description:
        "Monitor key metrics, attendance, churn, and performance trends.",
      icon: BarChart3,
      link: "/admin/analytics",
    },
    {
      title: "Class Scheduling",
      description:
        "Create classes, manage schedules, waitlists, and instructors.",
      icon: Calendar,
      link: "/admin/classes",
    },
    {
      title: "Facility Operations",
      description:
        "Ensure smooth day-to-day operations and equipment maintenance.",
      icon: ClipboardList,
      link: "/admin/facility",
    },
    {
      title: "System Settings",
      description:
        "Control roles, permissions, notifications, and integrations.",
      icon: Settings,
      link: "/admin/settings",
    },
    {
      title: "Security & Compliance",
      description: "Manage access control, audits, and security policies.",
      icon: Shield,
      link: "/admin/security",
    },
  ];

  const stats = [
    {
      label: "Active Members",
      value: "1,247",
      icon: Users,
    },
    {
      label: "Monthly Revenue",
      value: "$47.5K",
      icon: TrendingUp,
    },
    {
      label: "Pending Tasks",
      value: "23",
      icon: Bell,
    },
    {
      label: "Staff Members",
      value: "18",
      icon: UserCog,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Admin Control Center
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            Manage Your{" "}
            <span className="text-black font-bold">Gym Operations</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A clean, unified dashboard to manage members, trainers, classes, revenue, and analytics.
          </p>

          <div className="mt-10">
            <Link to="/admin/dashboard">
              <Button size="lg" className="rounded-xl px-8">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className="rounded-2xl shadow-sm border bg-white py-6 text-center"
              >
                <CardContent>
                  <Icon className="h-6 w-6 mb-3 text-slate-600 mx-auto" />
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase mt-1">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Responsibilities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-semibold tracking-tight">
              Admin Responsibilities
            </h2>
            <p className="text-slate-600 mt-3">
              All essential operations organized cleanly in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {responsibilities.map((item, idx) => {
              const Icon = item.icon;

              return (
                <Link key={idx} to={item.link}>
                  <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all border bg-white">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Icon className="h-7 w-7 text-slate-700" />
                      </div>

                      <CardTitle className="text-lg font-semibold mb-2">
                        {item.title}
                      </CardTitle>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 text-sm font-medium text-slate-800 flex items-center">
                        Manage <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4">Take Control Today</h2>
          <p className="text-slate-600 mb-8">
            Manage everything from one clean and powerful admin interface.
          </p>

          <Link to="/admin/dashboard">
            <Button size="lg" className="rounded-xl px-10">
              Open Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
