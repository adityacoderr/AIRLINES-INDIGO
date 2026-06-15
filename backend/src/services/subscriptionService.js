import Subscription from "../models/Subscription.js";

export const subscribe = async (
    userId,
    flightId
) => {
    return await Subscription.create({
        userId,
        flightId,
    });
};

export const getSubscriptions = async (
    userId
) => {
    return await Subscription.find({
        userId,
    }).populate("flightId");
};

export const removeSubscription = async (
    userId,
    flightId
) => {
    return await Subscription.findOneAndDelete({
        userId,
        flightId,
    });
};

export const getFlightSubscribers = async (
    flightId
) => {
    return await Subscription.find({
        flightId,
    });
};