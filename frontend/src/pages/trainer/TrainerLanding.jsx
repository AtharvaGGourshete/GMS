import React from 'react';
import { Dumbbell, Users, Calendar, TrendingUp, MessageCircle, Award, Heart, Target, Shield, Zap } from 'lucide-react';

const BRAND_COLOR = "#F24423";
const ACCENT_COLOR = "#FF8800";
const BG_COL = "#fffaf1";
const SHADOW = "8px 8px 0 0 #000";

const TrainerLanding = () => {
  const responsibilities = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Fitness Assessments",
      description: "Evaluate clients' fitness levels, health conditions, and physical capabilities to create personalized action plans.",
      color: "#e7ffc2"
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Program Design",
      description: "Build individualized exercise programs tailored to each client's goals, needs, and physical limitations.",
      color: "#ffa7e5"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Training Sessions",
      description: "Lead one-on-one and group training sessions, demonstrating proper form and ensuring safe exercise execution.",
      color: "#fff6d5"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Monitor clients' fitness progress, track attendance, and adjust programs based on improvements and challenges.",
      color: "#d1eafd"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Class Management",
      description: "Create, schedule, and manage fitness classes with complete control over timing, capacity, and bookings.",
      color: "#ffd1dc"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Client Communication",
      description: "Provide motivation, answer questions, and maintain regular communication to support clients' fitness journeys.",
      color: "#d4f1f4"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Nutrition Guidance",
      description: "Offer dietary advice, recommend healthy eating habits, and educate clients on nutrition fundamentals.",
      color: "#ffe4b5"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety & First Aid",
      description: "Ensure gym safety protocols, demonstrate proper equipment use, and provide CPR/first aid when needed.",
      color: "#e0e0ff"
    }
  ];

  const benefits = [
    { icon: <Award className="h-6 w-6" />, text: "Professional Growth" },
    { icon: <Users className="h-6 w-6" />, text: "Build Community" },
    { icon: <Zap className="h-6 w-6" />, text: "Flexible Scheduling" },
    { icon: <TrendingUp className="h-6 w-6" />, text: "Track Impact" }
  ];

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{ background: BG_COL }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div
          className="w-full p-10 border-[6px] border-black mb-12"
          style={{ background: "#fff", boxShadow: SHADOW }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-[#F24423] border-4 border-black" style={{ boxShadow: "6px 6px 0 0 #000" }}>
              <Dumbbell className="h-12 w-12 text-white" />
            </div>
            <h1
              className="text-5xl md:text-6xl font-black uppercase tracking-tight"
              style={{
                color: ACCENT_COLOR,
                textShadow: "5px 5px 0 #000",
              }}
            >
              Empower.<br/>Train.<br/>Transform.
            </h1>
          </div>
          
          <div className="w-24 h-2 bg-[#F24423] border-2 border-black mb-6"></div>
          
          <p className="text-2xl font-bold text-black mb-6 uppercase tracking-wide">
            You're not just a trainer—you're a life-changer.
          </p>
          
          <p className="text-lg font-semibold text-gray-800 leading-relaxed mb-8">
            As a trainer, you inspire, motivate, and guide members toward their fitness goals. 
            Your expertise shapes experiences, builds communities, and transforms lives. 
            This platform gives you the tools to do what you do best—without the administrative chaos.
          </p>

          {/* Benefits Pills */}
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-5 py-3 bg-yellow-300 border-4 border-black font-black text-sm uppercase tracking-wide"
                style={{ boxShadow: "4px 4px 0 0 #000" }}
              >
                {benefit.icon}
                {benefit.text}
              </div>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-black uppercase inline-block px-6 py-3 bg-[#F24423] text-white border-4 border-black -rotate-1"
            style={{ boxShadow: SHADOW }}
          >
            Your Responsibilities
          </h2>
          <p className="mt-6 text-xl font-bold text-black uppercase tracking-wide">
            What makes you essential to every fitness journey
          </p>
        </div>

        {/* Responsibilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {responsibilities.map((item, index) => (
            <div
              key={index}
              className="border-4 border-black p-6 hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer relative"
              style={{ 
                background: item.color, 
                boxShadow: SHADOW 
              }}
            >
              {/* Icon Container */}
              <div 
                className="inline-flex p-3 bg-white border-4 border-black mb-4"
                style={{ boxShadow: "4px 4px 0 0 #000" }}
              >
                {item.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-black uppercase mb-3 text-black tracking-tight">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm font-bold text-gray-900 leading-relaxed">
                {item.description}
              </p>

              {/* Corner Accent */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-black border-2 border-black"></div>
            </div>
          ))}
        </div>

        {/* Platform Features Section */}
        <div
          className="w-full p-10 border-[6px] border-black mb-12"
          style={{ background: "#fff", boxShadow: SHADOW }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase text-center mb-8 tracking-tight">
            What You Can Do on{" "}
            <span className="text-[#F24423] bg-yellow-300 px-3 py-1 border-4 border-black inline-block" style={{ boxShadow: "4px 4px 0 0 #000" }}>
              Our Platform
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div 
              className="border-4 border-black bg-[#e7ffc2] p-6"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Calendar className="h-8 w-8 text-[#F24423] flex-shrink-0" />
                <h3 className="text-xl font-black uppercase text-black">Manage Your Schedule</h3>
              </div>
              <p className="font-bold text-gray-900">
                Create, edit, and schedule classes with complete autonomy. Set capacity limits, 
                manage waitlists, and communicate changes instantly to members.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div 
              className="border-4 border-black bg-[#ffa7e5] p-6"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <TrendingUp className="h-8 w-8 text-[#F24423] flex-shrink-0" />
                <h3 className="text-xl font-black uppercase text-black">Track Member Progress</h3>
              </div>
              <p className="font-bold text-gray-900">
                View attendance records, monitor membership status, and help clients set 
                realistic, trackable goals for consistent improvement.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div 
              className="border-4 border-black bg-[#d1eafd] p-6"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <MessageCircle className="h-8 w-8 text-[#F24423] flex-shrink-0" />
                <h3 className="text-xl font-black uppercase text-black">Direct Communication</h3>
              </div>
              <p className="font-bold text-gray-900">
                Use integrated messaging to encourage members, answer questions, provide feedback, 
                and build lasting relationships that drive retention.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div 
              className="border-4 border-black bg-[#fff6d5] p-6"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Users className="h-8 w-8 text-[#F24423] flex-shrink-0" />
                <h3 className="text-xl font-black uppercase text-black">Build Community</h3>
              </div>
              <p className="font-bold text-gray-900">
                Lead group sessions, create specialty programs, and foster a supportive 
                environment where members motivate each other.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        <div
          className="border-6 border-black bg-[#F24423] p-10 text-center mb-12"
          style={{ boxShadow: SHADOW }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 tracking-tight">
              Your Impact Goes Beyond Reps & Sets
            </h3>
            <p className="text-xl font-bold text-white leading-relaxed mb-6">
              Every session you lead, every program you design, and every word of encouragement 
              you give transforms lives. You build confidence, create healthy habits, and foster 
              communities that last far beyond the gym floor.
            </p>
            <div 
              className="inline-block bg-yellow-300 border-4 border-black px-8 py-4"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <p className="text-2xl font-black uppercase text-black tracking-wide">
                You Make Goals Achievable.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="border-[6px] border-black bg-white p-10 text-center"
          style={{ boxShadow: SHADOW }}
        >
          <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-tight">
            Ready to Elevate Your Training?
          </h3>
          <p className="text-lg font-bold text-gray-800 mb-8 max-w-2xl mx-auto">
            Join a platform designed to empower trainers like you. Focus on what you do best—
            transforming lives—while we handle the rest.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="px-10 py-4 bg-[#F24423] text-white font-black text-lg uppercase tracking-wider border-4 border-black hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              style={{ boxShadow: "8px 8px 0 0 #000" }}
            >
              Get Started Today
            </button>
            <button
              className="px-10 py-4 bg-yellow-300 text-black font-black text-lg uppercase tracking-wider border-4 border-black hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              style={{ boxShadow: "8px 8px 0 0 #000" }}
            >
              Learn More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainerLanding;
