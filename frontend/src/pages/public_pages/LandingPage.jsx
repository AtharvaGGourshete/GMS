import { Button } from "@/components/ui/button";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { 
  CalendarCheck, 
  ChartColumnBig, 
  IndianRupee, 
  ReceiptText, 
  ScanFace, 
  User,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react";

const features = [
  {
    title: "Memberships and billing",
    description:
      "Create plans, automate renewals, handle freezes, prorations, and send invoices/receipts with failed-payment retries.",
    icon: <ReceiptText className="h-7 w-7" />,
    color: "bg-yellow-300"
  },
  {
    title: "Analytics dashboard",
    description:
      "KPIs for revenue, attendance, churn, no-shows, and plan performance with CSV export for deeper analysis.",
    icon: <ChartColumnBig className="h-7 w-7" />,
    color: "bg-cyan-300"
  },
  {
    title: "Class scheduling and bookings",
    description:
      "Manage recurring classes, waitlists, capacity limits, instructor assignments, and member self-booking.",
    icon: <CalendarCheck className="h-7 w-7" />,
    color: "bg-pink-300"
  },
  {
    title: "Check-ins and access control",
    description:
      "QR/RFID/NFC entry, guest passes, real‑time occupancy, and rules based on membership status.",
    icon: <ScanFace className="h-7 w-7" />,
    color: "bg-green-300"
  },
  {
    title: "Payments and POS",
    description:
      "Collect online and in-person payments, sell merch/supplements, track inventory, and issue refunds.",
    icon: <IndianRupee className="h-7 w-7" />,
    color: "bg-purple-300"
  },
  {
    title: "Member app/portal",
    description:
      "Self-service sign-up, bookings, cancellations, plan management, payment methods, and notifications.",
    icon: <User className="h-7 w-7" />,
    color: "bg-orange-300"
  },
];

const benefits = [
  "14-day free trial",
  "No credit card needed",
  "Cancel anytime"
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      {/* --- Hero Section - Neobrutalism Style --- */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-20">
          {/* Trust Badge - Brutal Style */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#F24423] text-white border-4 border-black font-bold text-sm uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <Zap className="h-5 w-5" />
              500+ Gyms Worldwide
            </div>
          </div>

          {/* Main Headline - Bold & Geometric */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-black mb-6 text-center leading-none uppercase tracking-tight">
            Run your gym,{" "}
            <span className="relative inline-block">
              <span className="bg-[#F24423] text-white px-4 py-2 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                END-TO-END
              </span>
            </span>
            ,<br className="hidden sm:block" /> 
            <span className="block mt-4">WITHOUT THE CHAOS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl font-bold text-black max-w-3xl mx-auto text-center mb-8 leading-tight">
            Automate sign-ups, schedules, and billing with a dashboard your staff will actually love
          </p>

          {/* Benefits List - Brutal Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-5 py-2 bg-yellow-300 border-3 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="uppercase tracking-wide">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Neobrutalism */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Button 
              size="lg"
              className="h-16 px-10 text-lg font-black uppercase tracking-wider bg-[#F24423] text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              size="lg"
              className="h-16 px-10 text-lg font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
            >
              Book Live Demo
            </Button>
          </div>
        </div>

        {/* Hero Image - Brutal Frame */}
        <div className="container mx-auto px-4 pb-20">
          <div className="relative max-w-5xl mx-auto">
            <div className="border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
              <img
                src="/hero.png"
                alt="Gym management dashboard"
                className="w-full h-auto border-4 border-black"
              />
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#F24423] border-4 border-black"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-300 border-4 border-black"></div>
          </div>
        </div>
      </section>

      {/* --- Partners Section - Geometric Grid --- */}
      <section className="py-16 sm:py-20 bg-cyan-100 border-y-8 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black mb-4">
              Our Partners
            </h2>
            <div className="w-32 h-2 bg-[#F24423] border-2 border-black mx-auto"></div>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="flex items-center">
              {[
                "/hrx.jpg", 
                "/cult.png", 
                "/AnytimeFitness_Logo.jpg", 
                "/snap.png", 
                "/fitness-first.png", 
                "/golds.png"
              ].map((src, index) => (
                <CarouselItem 
                  key={index} 
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center p-2"
                >
                  <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                    <img 
                      src={src} 
                      alt={`Partner ${index + 1}`} 
                      className="w-28 h-16 object-contain" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* --- Features Section - Bold Cards --- */}
      <section className="py-20 sm:py-28 bg-white relative">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, black, black 2px, transparent 2px, transparent 40px),
                           repeating-linear-gradient(90deg, black, black 2px, transparent 2px, transparent 40px)`
        }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-none">
              Everything You Need to{" "}
              <span className="bg-[#F24423] text-white px-3 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                SCALE
              </span>
            </h2>
            <p className="text-xl font-bold text-black leading-tight uppercase tracking-wide">
              Complete tools for gym operations
            </p>
          </div>

          {/* Feature Cards Grid - Neobrutalism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-visible bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
              >
                <div className="p-8">
                  {/* Icon with colored background */}
                  <div className={`mb-6 inline-flex p-4 ${feature.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                    {feature.icon}
                  </div>
                  
                  <CardTitle className="text-2xl font-black uppercase mb-4 text-black leading-tight tracking-tight">
                    {feature.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base font-semibold leading-relaxed text-gray-800">
                    {feature.description}
                  </CardDescription>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 ${feature.color} border-4 border-black`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA Section - High Contrast --- */}
      <section className="py-20 sm:py-28 bg-[#F24423] border-y-8 border-black relative overflow-hidden">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-black"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-black"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-300 border-4 border-black"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase mb-6 leading-none text-white tracking-tight">
            Ready to Transform<br className="hidden sm:block" /> Your Gym?
          </h2>
          
          <p className="text-2xl sm:text-3xl font-black uppercase text-white mb-12 tracking-wider border-4 border-black bg-black inline-block px-6 py-3 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            Join 500+ Fitness Centers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
            <Button 
              size="lg"
              className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-yellow-300 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              size="lg"
              className="h-16 px-12 text-lg font-black uppercase tracking-wider bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none"
            >
              Contact Sales
            </Button>
          </div>

          <div className="inline-block bg-black border-4 border-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <p className="text-sm font-bold text-white uppercase tracking-widest">
              No Credit Card • 14 Days Free • Cancel Anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
