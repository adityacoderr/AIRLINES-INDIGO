import {
    getFlights,
    getFlightById,
} from "../api/flightApi";

export const fetchFlights = async () => {
    return await getFlights();
};

// src/services/flightService.js

export const fetchFlightDetails = async (id) => {
    return await getFlightById(id);
};