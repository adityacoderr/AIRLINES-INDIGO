import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flight",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "ON_TIME",
                "DELAYED",
                "CANCELLED",
                "BOARDING",
                "DEPARTED",
                "GATE_CHANGED",
            ],
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Notification",
    notificationSchema
);