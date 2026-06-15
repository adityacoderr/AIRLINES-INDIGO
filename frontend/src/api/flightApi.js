import api from "./axios";

export const getFlights = async () => {
    const response = await api.get("/flights");

    console.log("API Response:", response.data);

    return response.data.data;
};

// src/api/flightApi.js

export const getFlightById = async (id) => {
    const response = await api.get(`/flights/${id}`);

    return response.data.data;
};