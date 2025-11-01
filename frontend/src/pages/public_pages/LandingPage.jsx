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
} from "@/components/ui/card"; // Removed unused CardAction, CardFooter, CardHeader
import Autoplay from "embla-carousel-autoplay";
import { CalendarCheck, ChartColumnBig, IndianRupee, ReceiptText, ScanFace, User } from "lucide-react";

// The features array is correct and remains unchanged.
const features = [
  {
    title: "Memberships and billing",
    description:
      "Create plans, automate renewals, handle freezes, prorations, and send invoices/receipts with failed-payment retries.",
      icon: <ReceiptText className="h-6 w-6 text-[#F24423]" /> // Added sizing and color to icons for consistency
  },
  {
    title: "Analytics dashboard",
    description:
      "KPIs for revenue, attendance, churn, no-shows, and plan performance with CSV export for deeper analysis.",
      icon: <ChartColumnBig className="h-6 w-6 text-[#F24423]" />
  },
  {
    title: "Class scheduling and bookings",
    description:
      "Manage recurring classes, waitlists, capacity limits, instructor assignments, and member self-booking.",
      icon: <CalendarCheck className="h-6 w-6 text-[#F24423]" />
  },
  {
    title: "Check-ins and access control",
    description:
      "QR/RFID/NFC entry, guest passes, real‑time occupancy, and rules based on membership status.",
      icon: <ScanFace className="h-6 w-6 text-[#F24423]" />
  },
  {
    title: "Payments and POS",
    description:
      "Collect online and in-person payments, sell merch/supplements, track inventory, and issue refunds.",
      icon: <IndianRupee className="h-6 w-6 text-[#F24423]" />
  },
  {
    title: "Member app/portal",
    description:
      "Self-service sign-up, bookings, cancellations, plan management, payment methods, and notifications.",
      icon: <User className="h-6 w-6 text-[#F24423]" />
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen">
      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center justify-center pt-20 h-auto bg-[#FFFFFF]">
        <h1 className="mx-auto container px-4 text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0C0C0C] mb-4 text-center ">
          Run your gym, <span className="text-[#F24423]">end-to-end</span>,
          without <span className="block text-center mt-2">the chaos</span>
        </h1>
        <h2 className="px-4 tracking-wider text-center text-base sm:text-lg text-gray-700 max-w-2xl">
          Automate sign-ups, schedules, and billing with a modern dashboard your
          staff will love
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-28 mt-6 sm:mt-8">
          <Button className="h-12 w-48 sm:w-40 cursor-pointer bg-[#F24423] text-white hover:bg-red-700">
            Start free trial
          </Button>
          <Button variant="outline" className="h-12 w-48 sm:w-40 cursor-pointer border-[#F24423] text-[#F24423] hover:bg-red-50">
            Book live demo
          </Button>
        </div>
      </section>

      {/* --- Hero Image --- */}
      <div className="flex justify-center -mt-10 sm:-mt-16 pb-10">
        <img
          src="/hero.png" // Assuming this path is correct
          alt="Dashboard screenshot"
          className="rounded-lg shadow-2xl max-w-xs sm:max-w-md lg:max-w-lg w-full h-auto"
        />
      </div>

      {/* --- Userbase (Partners) --- */}
      <div className="py-20 sm:py-24">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider mb-12">
          Partners
        </h1>
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
          className="w-full"
        >
          <CarouselContent className="flex items-center">
            {/* Added a map for cleaner logo rendering, assuming similar structure */}
            {["/hrx.jpg", "/cult.png", "/AnytimeFitness_Logo.jpg", "/snap.png", "/fitness-first.png", "/golds.png"].map((src, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center">
                {/* Added 'object-contain' and responsive widths for logos */}
                <img 
                  src={src} 
                  alt={`Partner logo ${index + 1}`} 
                  className="w-24 sm:w-32 lg:w-40 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain" 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* --- Features --- */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <h1 className="text-center px-4 mb-12 text-4xl sm:text-5xl lg:text-6xl text-[#F24423] font-extrabold">
          Features
        </h1>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                  {feature.icon}
                  <CardTitle className="text-xl text-[#0C0C0C] hover:text-[#F24423] transition-colors duration-300">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-4 text-base leading-relaxed text-gray-600">
                    {feature.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;