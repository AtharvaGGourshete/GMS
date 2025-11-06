import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Shield,
  ClipboardCheck,
  UserCog,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bell,
  FileText
} from 'lucide-react';

const AdminLandingPage = () => {
  // Admin responsibilities with neobrutalism colors
  const responsibilities = [
    {
      title: "Member Management",
      description: "Oversee member registrations, renewals, plan assignments, profile management, and track attendance patterns.",
      icon: <Users className="h-7 w-7" />,
      color: "bg-cyan-300",
      link: "/admin/members"
    },
    {
      title: "Staff & Trainer Oversight",
      description: "Hire, train, schedule staff and trainers. Evaluate performance, resolve conflicts, and ensure smooth operations.",
      icon: <UserCog className="h-7 w-7" />,
      color: "bg-pink-300",
      link: "/admin/trainers"
    },
    {
      title: "Financial Management",
      description: "Process payments, manage billing cycles, generate invoices, track revenue, handle refunds and payment failures.",
      icon: <DollarSign className="h-7 w-7" />,
      color: "bg-green-300",
      link: "/admin/finances"
    },
    {
      title: "Analytics & Reporting",
      description: "Monitor KPIs, revenue trends, attendance, churn rates, no-shows, and export detailed reports for analysis.",
      icon: <BarChart3 className="h-7 w-7" />,
      color: "bg-yellow-300",
      link: "/admin/analytics"
    },
    {
      title: "Class & Schedule Control",
      description: "Create recurring classes, assign instructors, manage waitlists, capacity limits, and booking systems.",
      icon: <Calendar className="h-7 w-7" />,
      color: "bg-purple-300",
      link: "/admin/classes"
    },
    {
      title: "Facility Operations",
      description: "Ensure equipment maintenance, safety compliance, access control systems, and facility cleanliness standards.",
      icon: <ClipboardCheck className="h-7 w-7" />,
      color: "bg-orange-300",
      link: "/admin/facility"
    },
    {
      title: "System Configuration",
      description: "Configure membership plans, payment gateways, notification systems, roles, permissions, and integrations.",
      icon: <Settings className="h-7 w-7" />,
      color: "bg-rose-300",
      link: "/admin/settings"
    },
    {
      title: "Security & Compliance",
      description: "Manage user access, enforce data protection policies, audit logs, and ensure regulatory compliance.",
      icon: <Shield className="h-7 w-7" />,
      color: "bg-emerald-300",
      link: "/admin/security"
    }
  ];

  const stats = [
    { label: "Active Members", value: "1,247", icon: <Users className="h-6 w-6" />, color: "bg-cyan-300" },
    { label: "Revenue (Month)", value: "$47.5K", icon: <TrendingUp className="h-6 w-6" />, color: "bg-green-300" },
    { label: "Pending Tasks", value: "23", icon: <Bell className="h-6 w-6" />, color: "bg-yellow-300" },
    { label: "Staff Members", value: "18", icon: <UserCog className="h-6 w-6" />, color: "bg-pink-300" }
  ];

  const quickActions = [
    { label: "Add New Member", icon: <Users className="h-5 w-5" />, link: "/admin/members/new" },
    { label: "Create Class", icon: <Calendar className="h-5 w-5" />, link: "/admin/classes/new" },
    { label: "Generate Report", icon: <FileText className="h-5 w-5" />, link: "/admin/reports" },
    { label: "View Analytics", icon: <BarChart3 className="h-5 w-5" />, link: "/admin/analytics" }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section - Admin Focus */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-white border-b-8 border-black">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, black, black 2px, transparent 2px, transparent 40px),
                           repeating-linear-gradient(90deg, black, black 2px, transparent 2px, transparent 40px)`
        }}></div>

        <div className="container mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 relative">
          {/* Admin Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-300 text-black border-4 border-black font-black text-sm uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="h-6 w-6" />
              Admin Control Center
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-black mb-6 text-center leading-none uppercase tracking-tight">
            Master Your{" "}
            <span className="relative inline-block">
              <span className="bg-[#F24423] text-white px-4 py-2 inline-block border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                GYM EMPIRE
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black max-w-4xl mx-auto text-center mb-8 leading-tight">
            Complete control over members, staff, finances, and operations from one powerful dashboard
          </p>

          {/* Stats Grid - Neobrutalism */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all`}
              >
                <div className="flex items-center justify-center mb-2">
                  {stat.icon}
                </div>
                <p className="text-3xl font-black text-black text-center mb-1">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-black text-center">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Button
                  className="bg-white hover:bg-yellow-300 text-black font-bold uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none px-6 py-5 text-sm"
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="flex justify-center">
            <Link to="/admin/dashboard">
              <Button
                size="lg"
                className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-[#F24423] text-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[5px] hover:translate-y-[5px] transition-all rounded-none"
              >
                Access Admin Dashboard
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Responsibilities Section */}
      <section className="py-20 sm:py-28 bg-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, black, black 2px, transparent 2px, transparent 20px)`
        }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-none">
              Your{" "}
              <span className="bg-yellow-300 px-3 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                COMMAND
              </span>
              {" "}Center
            </h2>
            <p className="text-xl font-bold text-black leading-tight uppercase tracking-wide">
              8 Core Responsibilities At Your Fingertips
            </p>
          </div>

          {/* Responsibilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {responsibilities.map((item, index) => (
              <Link key={index} to={item.link}>
                <Card
                  className="group relative overflow-visible bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none h-full cursor-pointer"
                >
                  <div className="p-6">
                    {/* Icon with colored background */}
                    <div className={`mb-6 inline-flex p-4 ${item.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                      {item.icon}
                    </div>

                    <CardTitle className="text-xl font-black uppercase mb-4 text-black leading-tight tracking-tight">
                      {item.title}
                    </CardTitle>

                    <CardDescription className="text-sm font-semibold leading-relaxed text-gray-800">
                      {item.description}
                    </CardDescription>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center font-black text-xs uppercase tracking-wider text-black group-hover:text-[#F24423] transition-colors">
                      Manage <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 ${item.color} border-4 border-black`}></div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features Highlight */}
      <section className="py-20 sm:py-28 bg-cyan-100 border-y-8 border-black relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black opacity-10 rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 border-8 border-black opacity-20"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black mb-8 leading-none">
            Why Admins Love{" "}
            <span className="bg-[#F24423] text-white px-3 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              GYMIE
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { title: "Real-Time Insights", desc: "Live dashboard with instant metrics" },
              { title: "Automated Workflows", desc: "Set it and forget it billing & renewals" },
              { title: "Complete Control", desc: "Every setting at your fingertips" }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-black uppercase mb-2 text-black">{feature.title}</h3>
                <p className="font-bold text-sm text-gray-700 uppercase tracking-wide">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/admin/dashboard">
            <Button
              size="lg"
              className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-black text-white border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
            >
              Launch Dashboard Now
              <Zap className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28 bg-[#F24423] border-y-8 border-black relative overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-black"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-black"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-300 border-4 border-black"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase mb-6 leading-none text-white tracking-tight">
            Take Full Control
            <br className="hidden sm:block" /> Of Your Gym Today
          </h2>

          <p className="text-2xl sm:text-3xl font-black uppercase text-white mb-12 tracking-wider">
            Everything you need in one powerful platform
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
            <Link to="/admin/dashboard">
              <Button
                size="lg"
                className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-yellow-300 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
              >
                Access Dashboard
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button
                size="lg"
                className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
              >
                Configure Settings
              </Button>
            </Link>
          </div>

          <div className="inline-block bg-black border-4 border-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <p className="text-sm font-bold text-white uppercase tracking-widest">
              Secure • Scalable • Simple
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLandingPage;
