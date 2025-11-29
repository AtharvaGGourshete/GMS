import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Zap, User, ReceiptText, ChartColumnBig, CalendarCheck, ScanFace, IndianRupee } from "lucide-react";

const features = [
  {
    title: "Memberships & billing",
    description: "Create plans, automate renewals, handle freezes, prorations, and send invoices with retries.",
    icon: <ReceiptText className="h-6 w-6" />,
  },
  {
    title: "Analytics dashboard",
    description: "KPIs for revenue, attendance, churn and plan performance with CSV export.",
    icon: <ChartColumnBig className="h-6 w-6" />,
  },
  {
    title: "Class scheduling",
    description: "Recurring classes, waitlists, capacity limits and member self-booking.",
    icon: <CalendarCheck className="h-6 w-6" />,
  },
  {
    title: "Check-ins & access",
    description: "QR/RFID/NFC entry, guest passes and real-time occupancy.",
    icon: <ScanFace className="h-6 w-6" />,
  },
  {
    title: "Payments & POS",
    description: "Collect online and in-person payments, sell merch, track inventory and refunds.",
    icon: <IndianRupee className="h-6 w-6" />,
  },
  {
    title: "Member portal",
    description: "Self-service signup, plan management, bookings and notifications.",
    icon: <User className="h-6 w-6" />,
  },
];

const partners = [
  "/hrx.jpg",
  "/cult.png",
  "/AnytimeFitness_Logo.jpg",
  "/snap.png",
  "/fitness-first.png",
  "/golds.png",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white/95 to-slate-50">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 bg-white/60 text-slate-700 border border-slate-200">Trusted by 500+ gyms</Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mt-6">
                Run your gym <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">end-to-end</span> <br />
                without the chaos
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Automate sign-ups, schedules, billing and team workflows. A single clean dashboard your staff will actually use.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button variant="default" size="lg" className="rounded-full px-6 py-3 shadow-md backdrop-blur-sm">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>

                <Button variant="ghost" size="lg" className="rounded-full px-6 py-3">
                  Book Live Demo
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-3 justify-center lg:justify-start text-sm text-slate-500">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>No credit card • 14 day trial • Cancel anytime</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="mx-auto max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-100">
                <img src="/hero.png" alt="dashboard" className="w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">Our partners</h2>
          <div className="mt-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-6 items-center justify-center px-4">
              {partners.map((src, idx) => (
                <div key={idx} className="flex-shrink-0 bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-100">
                  <img src={src} alt={`partner-${idx}`} className="h-10 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900">Everything you need to scale</h3>
            <p className="mt-4 text-slate-600">Complete tools for gym operations — billing, scheduling, check-ins, members and analytics.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="rounded-2xl border border-slate-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 rounded-lg p-3">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{f.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{f.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-3xl bg-white/70 backdrop-blur-md p-10 shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-extrabold text-slate-900">Ready to transform your gym?</h3>
            <p className="mt-4 text-slate-600">Join 500+ fitness centers running their operations on a single platform.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 py-3 shadow-md">
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>

              <Button variant="ghost" size="lg" className="rounded-full px-8 py-3">
                Contact Sales
              </Button>
            </div>

            <div className="mt-6 text-sm text-slate-500">No credit card • 14 day trial • Cancel anytime</div>
          </div>
        </div>
      </section>
    </main>
  );
}
