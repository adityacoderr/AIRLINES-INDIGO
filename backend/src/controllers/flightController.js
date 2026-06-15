import mongoose from "mongoose";

import * as flightService from "../services/flightService.js";
import * as subscriptionService from "../services/subscriptionService.js";
import * as notificationService from "../services/notificationService.js";

import { getIO } from "../config/socket.js";

export const getFlights = async (req, res, next) => {
    try {
        const flights = await flightService.getAllFlights();

        res.status(200).json({
            success: true,
            count: flights.length,
            data: flights,
        });
    } catch (error) {
        next(error);
    }
};

export const getFlight = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid flight ID",
            });
        }

        const flight = await flightService.getFlightById(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found",
            });
        }

        res.status(200).json({
            success: true,
            data: flight,
        });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req, res, next) => {
    try {
        const { status, reason, gate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid flight ID",
            });
        }

        const existingFlight = await flightService.getFlightById(
            req.params.id
        );

        if (!existingFlight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found",
            });
        }

        /*
         * Prevent duplicate notifications
         * if nothing actually changed.
         */
        if (
            existingFlight.status === status &&
            (!gate || existingFlight.gate === gate)
        ) {
            return res.status(400).json({
                success: false,
                message: "No changes detected",
            });
        }

        const flight = await flightService.updateFlightStatus(
            req.params.id,
            status,
            reason,
            gate
        );

        const subscribers =
            await subscriptionService.getFlightSubscribers(
                flight._id
            );

        /*
         * Socket failures should not
         * break the API.
         */
        let io = null;

        try {
            io = getIO();
        } catch {
            console.warn(
                "Socket.IO not initialized. Skipping real-time notifications."
            );
        }

        const notifications = await Promise.all(
            subscribers.map(async (subscriber) => {
                const notification =
                    await notificationService.createNotification({
                        userId: subscriber.userId,

                        flightId: flight._id,

                        type: flight.status
                            .toUpperCase()
                            .replace(/\s+/g, "_"),

                        title: `Flight ${flight.flightNumber} Update`,

                        message: `Flight ${flight.flightNumber} status changed to ${flight.status}`,
                    });

                if (io) {
                    io.to(
                        `user:${subscriber.userId}`
                    ).emit("notification", {
                        type: "FLIGHT_UPDATE",

                        notification,
                    });
                }

                return notification;
            })
        );

        res.status(200).json({
            success: true,
            message: "Flight status updated successfully",
            data: flight,
            notificationsCreated: notifications.length,
        });
    } catch (error) {
        next(error);
    }
};