"use client"

import {useEffect, useState} from "react";

type UniqueVisitor = {
    ipAddress: string;
    _count: {
        ipAddress: number;
    };
};

export default function Home() {
    const [quote, setQuote] = useState("");
    const refreshQuote = async () => {
        const data = await fetch("https://api.chucknorris.io/jokes/random?category=dev");
        const newQuote = await data.json();
        setQuote(newQuote.value);
    }

    const [message, setMessage] = useState<string>("Your visit has been recorded");
    const trackVisitor = async () => {
        try {
            await fetch("/api/track-visitor", {method: "POST"});
        } catch (error) {
            console.error("Error tracking visitor:", error);
        }
    };

    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const [uniqueVisitors, setUniqueVisitors] = useState<UniqueVisitor[]>([]);

    const fetchVisitorData = async () => {
        try {
            const response = await fetch("/api/get-visitors");
            if (!response.ok) {
                console.error('Failed to fetch visitor data');
                return;
            }
            const data = await response.json();

            // Set the total visitor count and unique visitors data to state
            setTotalVisitors(data.totalVisitors);
            setUniqueVisitors(data.uniqueVisitors);
        } catch (error) {
            console.error("Error fetching visitor data:", error);
        }
    };

    useEffect(() => {
        refreshQuote();

        trackVisitor();

        fetchVisitorData();

        // Hide the message after 5 seconds
        const timer = setTimeout(() => {
            setMessage(""); // Clear the message after 3 seconds
        }, 3000);

        // Cleanup timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="font-mono">
            <header className="flex items-center p-7 gap-x-19">
                <a href="https://www.wus.de/">
                    <img className="size-20" src="/logo.svg" alt="W&S logo"/>
                </a>
                <div>
                    {message && <p>{message}</p>}
                </div>
            </header>

            <main className="flex items-center gap-x-9 p-9">
                <div className="relative size-90 rounded-xl overflow-hidden group min-w-90">
                    <img src="/statham.jpg" alt="Jason"
                         className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110"/>

                    <img src="/jason.jpg" alt="Statham"
                         className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"/>
                </div>

                <div className="text-xl">
                    {quote}
                </div>
            </main>

            <footer className="p-9">
                <button
                    className="mx-auto flex rounded-xl p-6 border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"
                    onClick={refreshQuote}>
                    <h3>
                        Generate a new quote!
                    </h3>
                </button>
                <div className="font-bold text-gray-400">
                    <div className="flex">Visitors: {totalVisitors > 0 && <p>{totalVisitors}</p>}</div>
                    <div className="flex">Unique visitors: {uniqueVisitors.length > 0 && <p>{uniqueVisitors.length}</p>}</div>
                </div>
            </footer>
        </div>
    );
}
