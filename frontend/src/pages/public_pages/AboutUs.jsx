import React from 'react'
import { Award, Zap, Heart } from 'lucide-react';

// Define the neobrutalism palette
const NEO_COLORS = {
    BG: 'bg-yellow-50', // Light background
    ACCENT: 'bg-red-500', // Primary action color
    HIGHLIGHT: 'bg-yellow-400', // Secondary feature color
    TEXT: 'text-black',
    BORDER: 'border-black',
    SHADOW: 'shadow-[8px_8px_0_0_#000]',
    SHADOW_SM: 'shadow-[4px_4px_0_0_#000]',
};

const AboutUs = () => {
  return (
    <div className={`min-h-screen ${NEO_COLORS.BG} p-8 md:p-16 font-sans`}>
      
      {/* 1. Header Block */}
      <div className={`w-full max-w-4xl mx-auto mb-12 p-6 border-4 ${NEO_COLORS.BORDER} ${NEO_COLORS.SHADOW} ${NEO_COLORS.HIGHLIGHT}`}>
        <h1 className={`text-5xl md:text-6xl font-extrabold ${NEO_COLORS.TEXT} uppercase border-b-8 ${NEO_COLORS.BORDER} pb-3 mb-4`}>
          The Mission: Beyond Fitness
        </h1>
        <p className={`text-xl md:text-2xl font-medium ${NEO_COLORS.TEXT}`}>
          We're not just a gym; we're a **bold statement**. We tear down conventional fitness barriers with high-intensity training, no-nonsense gear, and a **community forged in steel**.
        </p>
      </div>
      
      ---
      
      {/* 2. Core Value Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* Card 1: Power */}
        <div className={`p-6 border-4 ${NEO_COLORS.BORDER} ${NEO_COLORS.SHADOW_SM} transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[7px_7px_0_0_#000] bg-white`}>
          <Zap className={`w-10 h-10 ${NEO_COLORS.TEXT} mb-3`} />
          <h3 className={`text-2xl font-black ${NEO_COLORS.TEXT} mb-2`}>
            Raw Power
          </h3>
          <p className="text-gray-700">
            No fancy spa water, just heavy iron, brutal conditioning, and results you can't ignore. We celebrate the **effort**, not the aesthetics.
          </p>
          <div className={`mt-4 w-12 h-2 ${NEO_COLORS.ACCENT} border-2 ${NEO_COLORS.BORDER}`}></div>
        </div>

        {/* Card 2: Excellence */}
        <div className={`p-6 border-4 ${NEO_COLORS.BORDER} ${NEO_COLORS.SHADOW_SM} transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[7px_7px_0_0_#000] ${NEO_COLORS.HIGHLIGHT}`}>
          <Award className={`w-10 h-10 ${NEO_COLORS.TEXT} mb-3`} />
          <h3 className={`text-2xl font-black ${NEO_COLORS.TEXT} mb-2`}>
            Hard-Wired Excellence
          </h3>
          <p className="text-gray-700">
            Our certified trainers are top-tier engineers of human performance. They deliver uncompromising guidance tailored to your absolute limits.
          </p>
          <div className={`mt-4 w-12 h-2 ${NEO_COLORS.ACCENT} border-2 ${NEO_COLORS.BORDER}`}></div>
        </div>

        {/* Card 3: Community */}
        <div className={`p-6 border-4 ${NEO_COLORS.BORDER} ${NEO_COLORS.SHADOW_SM} transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[7px_7px_0_0_#000] bg-white`}>
          <Heart className={`w-10 h-10 ${NEO_COLORS.ACCENT} mb-3`} />
          <h3 className={`text-2xl font-black ${NEO_COLORS.TEXT} mb-2`}>
            Unbreakable Crew
          </h3>
          <p className="text-gray-700">
            Find your tribe. We are a collective of driven individuals pushing past the noise and forging **real connection** in the pursuit of strength.
          </p>
          <div className={`mt-4 w-12 h-2 ${NEO_COLORS.ACCENT} border-2 ${NEO_COLORS.BORDER}`}></div>
        </div>
      </div>

      ---

      {/* 3. Call to Action Block */}
      <div className={`max-w-4xl mx-auto mt-12 p-8 border-4 ${NEO_COLORS.BORDER} bg-white ${NEO_COLORS.SHADOW}`}>
        <h2 className={`text-3xl font-extrabold ${NEO_COLORS.TEXT} mb-4`}>
          READY TO INTERFACE?
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          Stop scrolling. Start lifting. Click the button below to claim your trial session and see the blueprint for your strongest self.
        </p>
        <button 
          className={`px-8 py-3 text-lg font-bold uppercase border-4 ${NEO_COLORS.BORDER} ${NEO_COLORS.ACCENT} text-white ${NEO_COLORS.SHADOW_SM} 
                      transition-all duration-150 hover:shadow-[6px_6px_0_0_#000] hover:bg-red-600`}
        >
          JOIN THE REVOLUTION &rarr;
        </button>
      </div>

    </div>
  );
}

export default AboutUs;