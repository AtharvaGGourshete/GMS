import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <Badge className="mx-auto mb-4 bg-white/60 text-slate-700 border border-slate-100">
            Our mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            The Mission: Beyond Fitness
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We’re not just a gym — we’re a community and platform built for sustainable progress.
            Training, coaching and tools designed so members and teams can focus on results.
          </p>
        </header>

        {/* Core values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Raw Power",
              text:
                "No shortcuts — focused work, consistent programming, and measurable progress.",
              icon: <Check className="h-5 w-5 text-slate-700" />,
            },
            {
              title: "Hard-Wired Excellence",
              text:
                "Certified coaches, data-driven plans and accountability built into every program.",
              icon: <Check className="h-5 w-5 text-slate-700" />,
            },
            {
              title: "Unbreakable Crew",
              text:
                "A supportive community where members push each other toward shared goals.",
              icon: <Check className="h-5 w-5 text-slate-700" />,
            },
          ].map((item, idx) => (
            <Card key={idx} className="rounded-2xl border border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-lg bg-slate-100 p-2">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-3xl border border-slate-100 shadow-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Ready to get started?
              </h2>
              <p className="text-slate-600 mb-6">
                Claim a trial session and experience our coaching and community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button className="rounded-full px-6 py-3 shadow-sm" size="lg">
                    Claim Trial
                  </Button>
                </Link>

                <Link to="/membership-plans" className="w-full sm:w-auto">
                  <Button variant="ghost" className="rounded-full px-6 py-3" size="lg">
                    View Plans
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-slate-500 mt-6">No credit card • 14 day trial</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
