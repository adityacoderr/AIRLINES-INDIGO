import * as subscriptionService from "./subscriptionService.js";
import * as notificationService from "./notificationService.js";

import { getIO } from "../config/socket.js";

export const processFlightEvent = async (
    flight
) => {
    const subscribers =
        await subscriptionService.getFlightSubscribers(
            flight._id
        );

    const notifications = [];

    const eventType =
        flight.status.toUpperCase();

    for (const subscriber of subscribers) {
        const notification =
            await notificationService.createNotification({
                userId: subscriber.userId,

                flightId: flight._id,

                type: eventType,

                title: `Flight ${flight.flightNumber} Update`,

                message: `Flight ${flight.flightNumber} status changed to ${flight.status}`,
            });

        notifications.push(notification);

        const io = getIO();

        io.to(
            `user:${subscriber.userId}`
        ).emit("notification", {
            type: "FLIGHT_UPDATE",
            notification,
        });
    }

    return notifications;
};