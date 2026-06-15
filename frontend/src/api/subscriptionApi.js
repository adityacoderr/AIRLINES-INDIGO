// src/api/subscriptionApi.js

import api from "./axios";

export const subscribeToFlight = async (
    userId,
    flightId
) => {
    const response = await api.post(
        "/subscriptions",
        {
            userId,
            flightId,
        }
    );

    return response.data;
};

export const unsubscribeFromFlight = async (
    userId,
    flightId
) => {
    const response = await api.delete(
        `/subscriptions/${flightId}`,
        {
            data: { userId },
        }
    );

    return response.data;
};

export const getSubscriptions = async (
    userId
) => {
    const response = await api.get(
        `/subscriptions/${userId}`
    );

    return response.data.data;
};


export const getUserSubscriptions = async (
    userId
) => {
    const response = await api.get(
        `/subscriptions/${userId}`
    );

    return response.data.data;
};