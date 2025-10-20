import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";

const trainers = [
  {
    name: "Marcus Johnson",
    expertise: "Strength Training and Powerlifting",
    image: "tr-1.png",
  },
  {
    name: "Sarah Chen",
    expertise: "Endurance Running and HIIT",
    image: "tr2.png",
  },
  {
    name: "David Lee",
    expertise: "Olympic Weightlifting and Kettlebells",
    image: "tr3.png",
  },
  {
    name: "Emily Rodriguez",
    expertise: "Pilates and Core Conditioning",
    image: "tr4.png",
  },
  {
    name: "Kevin Williams",
    expertise: "Functional Fitness and Mobility",
    image: "tr5.png",
  },
  {
    name: "Maria Garcia",
    expertise: "Pre/Postnatal Fitness",
    image: "tr6.png",
  },
  {
    name: "Alex Brown",
    expertise: "Sports Specific Conditioning (Basketball)",
    image: "tr7.png",
  },
  {
    name: "Nicole Davis",
    expertise: "Nutrition Coaching and Weight Management",
    image: "tr8.png",
  },
  {
    name: "Ryan Wilson",
    expertise: "Boxing and Combat Sports Fitness",
    image: "tr9.png",
  },
];

const Trainers = () => {
  return (
    <div className="p-8 pt-12 min-h-screen max-w-7xl mx-auto">
      <div className="flex justify-center">
        <span className="font-extrabold text-5xl text-[#F24423] text-center">
          Trainers
        </span>
      </div>
      <CardHeader className="mt-4 text-center">
        <p className="text-gray-500 max-w-2xl mx-auto">
          Meet our professional trainers who are here to help you achieve your
          fitness goals.
        </p>
      </CardHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center mt-8">
        {trainers.map((trainer, index) => (
          <Card
            key={index}
            className="flex items-center space-x-6 p-6 border border-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={trainer.image}
              className="w-48 h-48 rounded-full object-cover"
            />
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-xl font-semibold text-gray-900">
                {trainer.name}
              </h3>
              <p className="text-gray-600 max-w-xs">{trainer.expertise}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
