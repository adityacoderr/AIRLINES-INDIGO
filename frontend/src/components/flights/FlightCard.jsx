import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import FlightStatusBadge from "./FlightStatusBadge";
import {
    subscribeToFlight,
    getUserSubscriptions,
} from "../../api/subscriptionApi";

export default function FlightCard({ flight }) {

    const USER_ID = "user1";
        const [subscribed, setSubscribed] = useState(false);

useEffect(() => {
    const checkSubscription = async () => {
        try {
            const subscriptions =
                await getUserSubscriptions(USER_ID);

            const isSubscribed =
                subscriptions.some((sub) => {
                    const subscribedId =
                        typeof sub.flightId === "object"
                            ? sub.flightId._id
                            : sub.flightId;

                    return (
                        subscribedId ===
                        flight._id
                    );
                });

            setSubscribed(isSubscribed);
        } catch (err) {
            console.error(err);
        }
    };

    checkSubscription();
}, [flight._id]);

   const handleSubscribe = async () => {
    try {
        const response =
            await subscribeToFlight(
                USER_ID,
                flight._id
            );

        if (response.alreadySubscribed) {
            setSubscribed(true);
            return;
        }

        setSubscribed(true);
    } catch (err) {
        console.error(err);
    }
};
    return (
        <div
            className="
                rounded-3xl border border-slate-200
                bg-white p-5 shadow-sm
                transition duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm text-slate-500">
                        Flight
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900">
                        {flight.flightNumber}
                    </h3>
                </div>

                <FlightStatusBadge
                    status={flight.status}
                />
            </div>

            <div className="mt-6 flex items-center justify-between">

                <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Origin
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                        {flight.origin}
                    </p>
                </div>

                <div className="text-slate-400">
                    ✈
                </div>

                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Destination
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                        {flight.destination}
                    </p>
                </div>

            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">

                <div className="rounded-2xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">
                        Departure
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {new Date(
                            flight.departureTime
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">
                        Arrival
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {new Date(
                            flight.arrivalTime
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">
                        Gate
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {flight.gate}
                    </p>

                </div>

            </div>

            <Link
                to={`/flights/${flight._id}`}
                className="
                    mt-6 flex items-center justify-center
                    rounded-2xl bg-blue-600 px-4 py-3
                    font-medium text-white
                    transition
                    hover:bg-blue-700
                "
            >
                View Details →
            </Link>
            <button
    onClick={handleSubscribe}
    disabled={subscribed}
    className={`
        rounded-xl px-4 py-2 text-sm font-medium
        ${
            subscribed
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
        }
    `}
>
    {subscribed
        ? "✓ Subscribed"
        : "Subscribe"}
</button>
        </div>
    );
}