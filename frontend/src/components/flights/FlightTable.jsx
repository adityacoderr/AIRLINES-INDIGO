import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import FlightCard from "./FlightCard";
import FlightStatusBadge from "./FlightStatusBadge";

import {
    subscribeToFlight,
    getUserSubscriptions,
} from "../../api/subscriptionApi";

const USER_ID = "user1";

export default function FlightTable({
    flights,
}) {
    const [
        subscribedFlights,
        setSubscribedFlights,
    ] = useState([]);

    useEffect(() => {
        const loadSubscriptions =
            async () => {
                try {
                    const subscriptions =
                        await getUserSubscriptions(
                            USER_ID
                        );

                    setSubscribedFlights(
                        subscriptions.map(
                            (sub) =>
                                typeof sub.flightId ===
                                "object"
                                    ? sub.flightId
                                          ._id
                                    : sub.flightId
                        )
                    );
                } catch (err) {
                    console.error(err);
                }
            };

        loadSubscriptions();
    }, []);

    const handleSubscribe =
        async (flightId) => {
            try {
                const response =
                    await subscribeToFlight(
                        USER_ID,
                        flightId
                    );

                if (
                    response.alreadySubscribed
                ) {
                    toast(
                        "Already subscribed ✈️"
                    );

                    return;
                }

                toast.success(
                    "Subscribed successfully!"
                );

                setSubscribedFlights(
                    (prev) => [
                        ...prev,
                        flightId,
                    ]
                );
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <>
            {/* Desktop */}

            <div className="hidden lg:block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-sm text-slate-500">
                            <th className="px-6 py-4">
                                Flight
                            </th>

                            <th className="px-6 py-4">
                                Route
                            </th>

                            <th className="px-6 py-4">
                                Departure
                            </th>

                            <th className="px-6 py-4">
                                Arrival
                            </th>

                            <th className="px-6 py-4">
                                Status
                            </th>

                            <th className="px-6 py-4">
                                Gate
                            </th>

                            <th className="px-6 py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {flights.map(
                            (flight) => (
                                <tr
                                    key={
                                        flight._id
                                    }
                                    className="
                                        border-t border-slate-100
                                        transition
                                        hover:bg-slate-50
                                    "
                                >
                                    <td className="px-6 py-5 font-semibold text-slate-900">
                                        {
                                            flight.flightNumber
                                        }
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="font-medium">
                                            {
                                                flight.origin
                                            }
                                        </span>

                                        <span className="mx-2 text-slate-400">
                                            →
                                        </span>

                                        <span className="font-medium">
                                            {
                                                flight.destination
                                            }
                                        </span>
                                    </td>

                                    <td className="px-6 py-5 text-slate-600">
                                        {new Date(
                                            flight.departureTime
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute:
                                                    "2-digit",
                                            }
                                        )}
                                    </td>

                                    <td className="px-6 py-5 text-slate-600">
                                        {new Date(
                                            flight.arrivalTime
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute:
                                                    "2-digit",
                                            }
                                        )}
                                    </td>

                                    <td className="px-6 py-5">
                                        <FlightStatusBadge
                                            status={
                                                flight.status
                                            }
                                        />
                                    </td>

                                    <td className="px-6 py-5 font-medium">
                                        {
                                            flight.gate
                                        }
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex gap-2">
                                            {subscribedFlights.includes(
                                                flight._id
                                            ) ? (
                                                <button
                                                    disabled
                                                    className="
                                                        rounded-xl
                                                        bg-emerald-100
                                                        px-4 py-2
                                                        text-sm font-medium
                                                        text-emerald-700
                                                        cursor-not-allowed
                                                    "
                                                >
                                                    ✓
                                                    Subscribed
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleSubscribe(
                                                            flight._id
                                                        )
                                                    }
                                                    className="
                                                        rounded-xl
                                                        bg-emerald-600
                                                        px-4 py-2
                                                        text-sm font-medium
                                                        text-white
                                                        hover:bg-emerald-700
                                                        transition
                                                    "
                                                >
                                                    Subscribe
                                                </button>
                                            )}

                                            <Link
                                                to={`/flights/${flight._id}`}
                                                className="
                                                    rounded-xl
                                                    bg-blue-50
                                                    px-4 py-2
                                                    text-sm font-medium
                                                    text-blue-600
                                                    hover:bg-blue-100
                                                    transition
                                                "
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}

            <div className="space-y-5 lg:hidden">
                {flights.map(
                    (flight) => (
                        <FlightCard
                            key={flight._id}
                            flight={flight}
                        />
                    )
                )}
            </div>
        </>
    );
}