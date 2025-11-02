import { useEffect, useState } from "react";
// Assuming getAllTrainers is correctly defined
import { getAllTrainers } from "../../api/trainerApi"; 
import { Briefcase, Mail, Star } from "lucide-react"; // Importing icons

// Placeholder for dummy data structure (adjust based on your actual API response)
/*
const dummyTrainers = [
    { 
        id: 1, 
        full_name: "Sarah Connor", 
        email: "sarah.c@gymie.com", 
        specialization: "Strength & Conditioning",
        bio: "Certified expert in functional fitness and muscle building.",
        image_url: "trainer-sarah.jpg", // Replace with actual image path
        rating: 4.9
    },
    // ... more trainers
];
*/

function Trainers() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Placeholder for a generic image if the API doesn't provide one
    const defaultImageUrl = "https://via.placeholder.com/150?text=Trainer"; 

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                // *** IMPORTANT: Use real data structure here ***
                const res = await getAllTrainers();
                setTrainers(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not retrieve trainer data.");
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    if (loading) return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-700">
                <svg className="animate-spin h-5 w-5 text-[#F24423]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg">Loading our expert team...</p>
            </div>
        </main>
    );

    if (error) return (
        <main className="min-h-screen flex items-center justify-center">
            <p className="text-xl text-red-600 border p-4 rounded-lg bg-red-50">{error}</p>
        </main>
    );

    return (
      <main className="min-h-screen bg-gray-50">
        
        {/* 1. Hero Section - Professional Header */}
        <header className="bg-white border-b shadow-sm py-16 mb-10">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold text-[#0C0C0C] mb-3">
                    Meet Our <span className="text-[#F24423]">Elite Trainers</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Highly certified and passionate professionals dedicated to achieving your fitness goals. Find your perfect match.
                </p>
            </div>
        </header>

        {/* 2. Trainer Grid Section */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
            
            {/* Conditional message if no trainers are available */}
            {trainers.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600">No trainers are currently listed. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 cursor-pointer">
                    {trainers.map((trainer) => (
                        <div
                            key={trainer.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 border border-gray-100"
                        >
                            {/* Trainer Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={trainer.image_url || defaultImageUrl}
                                    alt={`Portrait of ${trainer.full_name}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    onError={(e) => { e.target.onerror = null; e.target.src = defaultImageUrl; }}
                                />
                            </div>

                            {/* Trainer Details */}
                            <div className="p-5 text-center">
                                <h3 className="text-2xl font-bold text-[#F24423] mb-1">
                                    {trainer.full_name}
                                </h3>
                                
                                {trainer.specialization && (
                                    <div className="flex items-center justify-center text-gray-700 text-sm font-medium mb-3">
                                        <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>{trainer.specialization}</span>
                                    </div>
                                )}
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {trainer.bio || "Dedicated professional ready to help you exceed your limits and achieve peak performance."}
                                </p>

                                {/* Action/Rating Footer (Example) */}
                                <div className="border-t pt-4 flex justify-between items-center mt-3">
                                    <a 
                                        href={`mailto:${trainer.email}`} 
                                        className="text-sm text-gray-500 hover:text-[#F24423] transition duration-150 flex items-center"
                                    >
                                        <Mail className="w-4 h-4 mr-1"/> Contact
                                    </a>
                                    
                                    {/* Dummy Rating for visual appeal */}
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                                        <span className="text-sm font-semibold text-gray-800">{trainer.rating?.toFixed(1) || '4.8'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
      </main>
    );
}

export default Trainers;