// src/pages/FlightDetails.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchFlightDetails } from "../services/flightService";

import FlightStatusBadge from "../components/flights/FlightStatusBadge";
import FlightTimeline from "../components/flights/FlightTimeline";

export default function FlightDetails() {
    const { id } = useParams();

    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadFlight = async () => {
            try {
                const data = await fetchFlightDetails(id);
                setFlight(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load flight details");
            } finally {
                setLoading(false);
            }
        };

        loadFlight();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    <p className="mt-4 text-slate-600">
                        Loading flight details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="rounded-3xl bg-white p-8 shadow-xl">
                    <p className="text-red-600 font-medium">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!flight) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="rounded-3xl bg-white p-8 shadow-xl">
                    Flight not found.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Back */}
                <Link
                    to="/dashboard"
                    className="
                        inline-flex items-center gap-2
                        text-slate-500
                        hover:text-blue-600
                        transition
                    "
                >
                    ← Back to Dashboard
                </Link>

                {/* Hero */}
                <div
                    className="
                        mt-6 overflow-hidden rounded-[32px]
                        bg-gradient-to-r
                        from-slate-900
                        via-slate-800
                        to-blue-900
                        text-white shadow-2xl
                    "
                >
                    <div className="p-8 md:p-10">

                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                            <div>
                                <p className="text-blue-200 uppercase tracking-[0.25em] text-sm">
                                    Flight Details
                                </p>

                                <h1 className="mt-3 text-5xl font-bold">
                                    {flight.flightNumber}
                                </h1>

                                <div className="mt-6 flex items-center gap-4 text-xl md:text-2xl">

                                    <div className="text-center">
                                        <p className="font-semibold">
                                            {flight.origin}
                                        </p>
                                    </div>

                                    <div className="text-blue-300">
                                        ✈
                                    </div>

                                    <div className="text-center">
                                        <p className="font-semibold">
                                            {flight.destination}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <FlightStatusBadge
                                status={flight.status}
                            />

                        </div>

                    </div>
                </div>

                {/* Info Cards */}
                <div className="mt-8 grid gap-5 md:grid-cols-3">

                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

                        <p className="text-sm uppercase tracking-wider text-slate-400">
                            Departure
                        </p>

                        <p className="mt-3 text-3xl font-bold text-slate-900">
                            {new Date(
                                flight.departureTime
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>

                        <p className="mt-2 text-slate-500">
                            {new Date(
                                flight.departureTime
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

                        <p className="text-sm uppercase tracking-wider text-slate-400">
                            Arrival
                        </p>

                        <p className="mt-3 text-3xl font-bold text-slate-900">
                            {new Date(
                                flight.arrivalTime
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>

                        <p className="mt-2 text-slate-500">
                            {new Date(
                                flight.arrivalTime
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

                        <p className="text-sm uppercase tracking-wider text-slate-400">
                            Gate
                        </p>

                        <p className="mt-3 text-3xl font-bold text-slate-900">
                            {flight.gate}
                        </p>

                        <p className="mt-2 text-slate-500">
                            Boarding Gate
                        </p>

                    </div>

                </div>

                {/* Delay Reason */}
                {flight.delayReason && (
                    <div
                        className="
                            mt-8 rounded-3xl
                            border border-amber-200
                            bg-amber-50 p-6
                        "
                    >
                        <h3 className="font-semibold text-amber-800">
                            Delay Information
                        </h3>

                        <p className="mt-2 text-amber-700">
                            {flight.delayReason}
                        </p>
                    </div>
                )}

                {/* Timeline */}
                <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Flight Journey
                    </h2>

                    <div className="mt-6">
                        <FlightTimeline
                            status={flight.status}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}