import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Home() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 text-center">
                <section className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
                    <Link
                        href="/"
                        preserveScroll
                        className="text-6xl font-mono font-bold text-gray-900 
                               bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent
                               drop-shadow-md hover:drop-shadow-xl transition-shadow duration-300"
                    >
                        {currentTime.toLocaleTimeString()}
                    </Link>
                    <span className="mt-2 text-gray-600">Current Local Time</span>
                </section>
            </h1>

            {/* <section className="p-6 bg-gray-50 rounded-lg shadow">
                <p className="text-gray-700">Here you could show a progress spinner or loading indicator.</p>
                <div className="mt-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            </section> */}
        </div>
    );
}
