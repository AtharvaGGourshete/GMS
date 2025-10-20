import { Button } from "@/components/ui/button";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { CalendarCheck, ChartColumnBig, IndianRupee, ReceiptText, ScanFace, User } from "lucide-react";

const features = [
  {
    title: "Memberships and billing",
    description:
      "Create plans, automate renewals, handle freezes, prorations, and send invoices/receipts with failed-payment retries.",
      icon: <ReceiptText />
  },
  {
    title: "Analytics dashboard",
    description:
      "KPIs for revenue, attendance, churn, no-shows, and plan performance with CSV export for deeper analysis.",
      icon: <ChartColumnBig />
  },
  {
    title: "Class scheduling and bookings",
    description:
      "Manage recurring classes, waitlists, capacity limits, instructor assignments, and member self-booking.",
      icon: <CalendarCheck />
  },
  {
    title: "Check-ins and access control",
    description:
      "QR/RFID/NFC entry, guest passes, real‑time occupancy, and rules based on membership status.",
      icon: <ScanFace />
  },
  {
    title: "Payments and POS",
    description:
      "Collect online and in-person payments, sell merch/supplements, track inventory, and issue refunds.",
      icon: <IndianRupee />
  },
  {
    title: "Member app/portal",
    description:
      "Self-service sign-up, bookings, cancellations, plan management, payment methods, and notifications.",
      icon: <User />
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-96 bg-[#FFFFFF] text-white">
        <h1 className="mx-auto container text-7xl font-bold text-[#0C0C0C] mb-4 text-center ">
          Run your gym, <span className="text-[#F24423]">end-to-end</span>,
          without <span className="block text-center mt-2">the chaos</span>
        </h1>
        <h2 className="tracking-wider text-gray-700 ">
          Automate sign-ups, schedules, and billing with a modern dashboard your
          staff will love
        </h2>
        <div className="flex gap-2 mb-7 mt-2">
          <Button className="h-12 w-40 cursor-pointer hover:bg-[#F24423] hover:text-white">
            Start free trial
          </Button>
          <Button className="h-12 w-40 cursor-pointer hover:bg-[#F24423] hover:text-white">
            Book live demo
          </Button>
        </div>
      </section>
      <img
        src="/hero.png"
        alt="Hero"
        width={400}
        height={100}
        className="-mt-16 rounded-lg mx-auto"
      />
      {/* Userbase */}
      <div className="my-40">
        <h1 className="text-center text-6xl font-bold tracking-wider zalando-sans-expanded tracking-in-contract-bck ">
          Partners
        </h1>
        <Carousel
          plugins={[
            Autoplay({
              delay: 1000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center justify-center">
            <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/hrx.jpg" width={200} height={200} className="ml-20" />
            </CarouselItem>
            {/* <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/golds.png" width={200} height={200} />
            </CarouselItem> */}
            <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/cult.png" width={200} height={200} />
            </CarouselItem>
            <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/AnytimeFitness_Logo.jpg" width={200} height={200} />
            </CarouselItem>
            <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/snap.png" width={200} height={200} />
            </CarouselItem>
            <CarouselItem className="basis-1/3 lg:basis-1/6 ">
              <img src="/fitness-first.png" width={200} height={200} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Features */}
      <section className="min-h-screen">
        <h1 className="ml-32 text-6xl mb-5 text-[#F24423] font-extrabold">Features</h1>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <div className="p-6">
                  <div className="flex gap-5">
                  {feature.icon}
                  <CardTitle className="text-xl hover:text-[#F24423]">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2 text-base leading-relaxed">
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
