import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the Neobrutalist brand colors and styling properties
const BRAND_COLOR = "#F24423"; // Your brand primary color
const ACCENT_COLOR_A = "#388E3C"; // Green for success/check
const ACCENT_COLOR_B = "#000000"; // Black for deep shadow

const plans = [
    {
        name: "Basic",
        price: "₹1,000/mo",
        description: "Start your fitness journey with essential gym access.",
        features: [
            "Unlimited Gym Access (Off-Peak)",
            "Locker Rental Included",
            "Access to Basic Equipment",
        ],
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

const MembershipDisplay = () => {
  
  // Custom Card component for Neobrutalism styling
  const NeobrutalistCard = ({ plan, index }) => {
    
    // Determine card specific styling
    const isPopular = plan.isPopular;
    const shadowColor = isPopular ? BRAND_COLOR : ACCENT_COLOR_B;
    const borderColor = isPopular ? BRAND_COLOR : ACCENT_COLOR_B;

    return (
        <Link to="/admin/members">
      <Card 
        key={index}
        className={`
          w-full max-w-sm p-4 border-4 
          transition-transform hover:scale-[1.01] duration-200 
          bg-white 
          ${isPopular ? 'border-4 border-black' : 'border-2 border-black'}
        `}
        style={{
          boxShadow: `8px 8px 0 0 ${shadowColor}`,
          borderColor: borderColor,
        }}
      >
        <CardHeader className="p-0 pb-3 border-b-2 border-black mb-4">
          {isPopular && (
            <div 
              className="absolute -top-3 -right-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-full"
              style={{ backgroundColor: BRAND_COLOR, border: `2px solid ${ACCENT_COLOR_B}` }}
            >
              Most Popular
            </div>
          )}
          <CardTitle 
            className={`text-3xl font-extrabold tracking-tighter pt-2 
              ${isPopular ? `text-[${BRAND_COLOR}]` : 'text-black'}`}
          >
            {plan.name}
          </CardTitle>
          <CardDescription className="text-xl font-bold mt-1 text-black">
            {plan.price}
          </CardDescription>
          <p className="text-sm text-gray-700 mt-2">{plan.description}</p>
        </CardHeader>

        <CardContent className="p-0">
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm font-medium">
                <Check className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: ACCENT_COLOR_A }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="p-0 pt-6">
          <Button
            className="w-full text-base font-bold uppercase transition-all duration-200"
            style={{
              backgroundColor: isPopular ? BRAND_COLOR : ACCENT_COLOR_B,
              color: 'white',
              border: `2px solid ${ACCENT_COLOR_B}`,
              boxShadow: isPopular ? `4px 4px 0 0 ${ACCENT_COLOR_B}` : `4px 4px 0 0 ${BRAND_COLOR}`,
            }}
          >
            {plan.buttonText}
          </Button>
        </CardFooter>
      </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-12 border-b-4 border-black pb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-black mb-2">
            Choose Your Fit
          </h1>
          <p className="text-lg text-gray-700">
            Select the membership plan that powers your goals.
          </p>
        </header>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch">
          {plans.map((plan, index) => (
            <NeobrutalistCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipDisplay;