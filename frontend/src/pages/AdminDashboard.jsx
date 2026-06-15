import axios from "axios";


import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [flights, setFlights] = useState([]);
    const statuses = [
  "On Time",
  "Delayed",
  "Cancelled",
  "Boarding",
  "Departed",
];

    const fetchFlights = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/flights"
            );

            setFlights(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const changeStatus = async (flightId, status) => {
    try {
        await axios.post(
            `http://localhost:5000/api/flights/${flightId}/status`,
            {
                status,
            }
        );

        // Refresh admin dashboard
        fetchFlights();
    } catch (err) {
        console.error("Failed to update status:", err);

        alert(
            err?.response?.data?.message ||
            "Failed to update status"
        );
    }
};
  return (
    <div
        style={{
            minHeight: "100vh",
            background: "#f4f7fb",
            padding: "30px",
            fontFamily: "Arial, sans-serif",
        }}
    >
        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
            }}
        >
            <h1
                style={{
                    marginBottom: "30px",
                    color: "#1f2937",
                }}
            >
                ✈️ Airline Admin Dashboard
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                }}
            >
                {flights.map((flight) => (
                    <div
                        key={flight._id}
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "20px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.08)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    color: "#111827",
                                }}
                            >
                                {flight.flightNumber}
                            </h2>

                            <span
                                style={{
                                    padding:
                                        "6px 12px",
                                    borderRadius:
                                        "999px",
                                    background:
                                        flight.status ===
                                        "Delayed"
                                            ? "#fef3c7"
                                            : flight.status ===
                                              "Cancelled"
                                            ? "#fee2e2"
                                            : flight.status ===
                                              "Boarding"
                                            ? "#dbeafe"
                                            : flight.status ===
                                              "Departed"
                                            ? "#dcfce7"
                                            : "#e5e7eb",
                                }}
                            >
                                {flight.status}
                            </span>
                        </div>

                        <p>
                            <strong>
                                Route:
                            </strong>{" "}
                            {flight.origin} →
                            {flight.destination}
                        </p>

                        <p>
                            <strong>
                                Gate:
                            </strong>{" "}
                            {flight.gate}
                        </p>

                        <p>
                            <strong>
                                Departure:
                            </strong>{" "}
                            {
                                flight.departureTime
                            }
                        </p>

                        <div
                            style={{
                                marginTop: "20px",
                            }}
                        >
                            <label
                                style={{
                                    display:
                                        "block",
                                    marginBottom:
                                        "8px",
                                    fontWeight:
                                        "bold",
                                }}
                            >
                                Change Status
                            </label>

                            <select
                                value={
                                    flight.status
                                }
                                onChange={(e) =>
                                    changeStatus(
                                        flight._id,
                                        e.target
                                            .value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding:
                                        "12px",
                                    borderRadius:
                                        "10px",
                                    border:
                                        "1px solid #d1d5db",
                                    fontSize:
                                        "15px",
                                    cursor:
                                        "pointer",
                                }}
                            >
                                <option>
                                    On Time
                                </option>
                                <option>
                                    Delayed
                                </option>
                                <option>
                                    Cancelled
                                </option>
                                <option>
                                    Boarding
                                </option>
                                <option>
                                    Departed
                                </option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}