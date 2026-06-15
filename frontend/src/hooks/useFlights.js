import { useEffect, useState } from "react";
import { fetchFlights } from "../services/flightService";

export default function useFlights() {
    console.log("useFlights called");

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadFlights = async () => {
            console.log("Loading flights...");

            try {
                const data = await fetchFlights();

                console.log("Fetched:", data);

                setFlights(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);

                setError("Failed to load flights");
            } finally {
                setLoading(false);
            }
        };

        loadFlights();
    }, []);

    return {
        flights,
        loading,
        error,
    };
}