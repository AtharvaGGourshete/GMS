import { useEffect, useState } from "react";
import { getAllTrainers } from "../../api/trainerApi";

function Trainers() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await getAllTrainers();
                setTrainers(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Error fetching trainers");
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading trainers...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
      <main className="min-h-screen">
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Trainers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold">{trainer.full_name}</h3>
                        <p className="text-gray-600">{trainer.email}</p>
                        {trainer.specialization && (
                            <p className="text-sm text-gray-500">{trainer.specialization}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
      </main>
    );
}

export default Trainers;
