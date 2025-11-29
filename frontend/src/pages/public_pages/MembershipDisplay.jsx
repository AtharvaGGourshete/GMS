import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "₹1,000/mo",
    description: "Start your fitness journey with essential gym access.",
    features: ["Unlimited Gym Access (Off-Peak)", "Locker Rental Included", "Access to Basic Equipment"],
    buttonText: "Join Basic",
  },
  {
    name: "Standard",
    price: "₹2,000/mo",
    description: "The complete package for dedicated fitness enthusiasts.",
    features: [
      "Unlimited 24/7 Gym Access",
      "Two Personal Training Sessions/Month",
      "Access to Premium Classes (Yoga, Spin)",
      "Nutritional Guide eBook",
    ],
    buttonText: "Go Standard Pro",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "₹3,000/mo",
    description: "All-inclusive membership with dedicated support.",
    features: [
      "Unlimited 24/7 Gym Access",
      "Four Personal Training Sessions/Month",
      "Access to All Classes & Workshops",
      "Free Smoothie Bar Access",
      "Dedicated Parking Slot",
    ],
    buttonText: "Get Elite",
  },
];

export default function MembershipDisplay() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600">
            Select the membership that fits your goals and lifestyle.
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <Link to="/admin/members" key={i} className="block">
              <Card
                className={`rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white ${
                  plan.isPopular ? "ring-2 ring-orange-400" : ""
                }`}
              >
                <CardHeader>
                  {plan.isPopular && (
                    <span className="inline-block text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-700 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}

                  <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                  <CardDescription className="text-xl text-slate-700 mt-1">
                    {plan.price}
                  </CardDescription>
                  <p className="text-sm text-slate-500 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-500 mr-2" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full mt-8 rounded-full font-semibold py-3 text-base"
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
