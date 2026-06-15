import { useMemo, useState } from "react";
import useFlights from "../hooks/useFlights";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import socket from "../socket/socket";
import NotificationBell from "../components/notifications/NotificationBell";
import NotificationList from "../components/notifications/NotificationList";
import FlightTable from "../components/flights/FlightTable";
import FlightSearch from "../components/flights/FlightSearch";
import FlightFilters from "../components/flights/FlightFilters";
import {
    fetchNotifications,
    markAsRead,
} from "../services/notificationService";

import { io } from "socket.io-client";



export default function Dashboard() {
    const { flights, loading, error } = useFlights();

    const [search, setSearch] = useState("");
    const [notifications, setNotifications] =
    useState([]);

    const socket = io("http://localhost:5000");
    useEffect(() => {
        socket.on("flightUpdated", (updatedFlight) => {
    setFlights((prev) =>
        prev.map((flight) =>
            flight._id === updatedFlight._id
                ? updatedFlight
                : flight
        )
    );
});

return () => {
    socket.off("flightUpdated");
};
    fetchNotifications("user1")
    .then((data) => {
        setNotifications(data || []);
    })
    .catch((error) => {
        console.error(error);
        setNotifications([]);
    });
}, []);

const [showNotifications,
    setShowNotifications] =
    useState(false);
    const [status, setStatus] = useState("All");

    const filteredFlights = useMemo(() => {
        return flights.filter((flight) => {
            const query = search.toLowerCase();

            const matchesSearch =
                flight.flightNumber?.toLowerCase().includes(query) ||
                flight.origin?.toLowerCase().includes(query) ||
                flight.destination?.toLowerCase().includes(query);

            const matchesStatus =
                status === "All" || flight.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [flights, search, status]);

    useEffect(() => {
    socket.emit("join", "user1");

    socket.on("notification", (data) => {
        const notification =
            data.notification;

        setNotifications((prev) => [
            notification,
            ...prev,
        ]);

        toast(notification.title, {
            icon: "✈️",
        });
    });

    return () => {
        socket.off("notification");
    };
}, []);

const handleMarkRead = async (id) => {
    try {
        await markAsRead(id);

        setNotifications((prev) =>
            prev.map((n) =>
                n._id === id
                    ? {
                          ...n,
                          isRead: true,
                      }
                    : n
            )
        );
    } catch (error) {
        console.error(error);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <p className="mt-4 text-slate-600">
                        Loading flights...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    <p className="text-red-600 font-medium">
                        {error}
                    </p>
                </div>
            </div>
        );
    }
console.log("Notifications:", notifications);
    return (
        
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Hero */}
                <div className="mb-8">
                    <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                            <div>
                                <p className="text-blue-100 uppercase tracking-widest text-sm">
                                    Flight Operations
                                </p>

                                <h1 className="mt-2 text-4xl font-bold">
                                    Flight Status Dashboard
                                </h1>

                                <p className="mt-3 text-blue-100">
                                    Track departures, arrivals and real-time updates.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">

    <NotificationBell
        count={
    (notifications || []).filter(
        (n) => !n.isRead
    ).length
}
        onClick={() =>
            setShowNotifications(
                !showNotifications
            )
        }
    />

    <div className="rounded-2xl bg-white/15 backdrop-blur px-6 py-4">

        <p className="text-sm text-blue-100">
            Flights Available
        </p>

        <p className="text-3xl font-bold">
            {filteredFlights.length}
        </p>

    </div>

</div>

                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm border border-slate-200">

                    <div className="flex flex-col gap-4 lg:flex-row">

                        <div className="flex-1">
                            <FlightSearch
                                value={search}
                                onChange={setSearch}
                            />
                        </div>

                        <div className="lg:w-64">
                            <FlightFilters
                                value={status}
                                onChange={setStatus}
                            />
                        </div>

                    </div>

                </div>

                {showNotifications && (
    <div
        className="
            mb-8 rounded-3xl
            bg-slate-50 p-5
            border border-slate-200
        "
    >
        <h2 className="mb-4 text-xl font-bold">
            Notifications
        </h2>

        <NotificationList
    notifications={notifications || []}
    onRead={handleMarkRead}
/>
    </div>
)}


                {/* Results */}
                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Active Flights
                        </h2>

                        <p className="text-slate-500 text-sm">
                            Showing {filteredFlights.length} flights
                        </p>
                    </div>

                </div>

                <FlightTable flights={filteredFlights} />
            <Toaster position="top-right" />
            </div>
            
        </div>
    );
}