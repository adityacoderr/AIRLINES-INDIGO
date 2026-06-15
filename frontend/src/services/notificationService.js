// src/services/notificationService.js

import {
    getNotifications,
    markNotificationRead,
} from "../api/notificationApi";

export const fetchNotifications =
    getNotifications;

export const markAsRead =
    markNotificationRead;