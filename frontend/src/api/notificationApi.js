// src/api/notificationApi.js

import api from "./axios";

export const getNotifications = async (userId) => {
    const response = await api.get(
        `/notifications/${userId}`
    );

    return response.data.data;
};

export const markNotificationRead = async (id) => {
    const response = await api.patch(
        `/notifications/${id}/read`
    );

    return response.data.data;
};