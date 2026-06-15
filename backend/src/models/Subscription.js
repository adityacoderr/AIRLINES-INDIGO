import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

subscriptionSchema.index(
    {
        userId: 1,
        flightId: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model(
    "Subscription",
    subscriptionSchema
);  