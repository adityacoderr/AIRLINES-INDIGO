import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        origin: {
            type: String,
            required: true,
        },

        destination: {
            type: String,
            required: true,
        },

        departureTime: {
            type: Date,
            required: true,
        },

        arrivalTime: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "On Time",
                "Delayed",
                "Cancelled",
                "Boarding",
                "Departed",
            ],
            default: "On Time",
        },

        gate: {
            type: String,
            required: true,
        },

        delayReason: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Flight", flightSchema);