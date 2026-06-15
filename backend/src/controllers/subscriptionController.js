import * as subscriptionService from "../services/subscriptionService.js";

export const subscribeToFlight = async (
    req,
    res,
    next
) => {
    try {
        const { userId, flightId } = req.body;

        try {
            const subscription =
                await subscriptionService.subscribe(
                    userId,
                    flightId
                );

            return res.status(201).json({
                success: true,
                data: subscription,
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(200).json({
                    success: true,
                    alreadySubscribed: true,
                    message: "Already subscribed",
                });
            }

            throw error;
        }
    } catch (error) {
        next(error);
    }
};

export const getSubscriptions = async (
    req,
    res,
    next
) => {
    try {
        const subscriptions =
            await subscriptionService.getSubscriptions(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

export const unsubscribe = async (
    req,
    res,
    next
) => {
    try {
        await subscriptionService.removeSubscription(
            req.body.userId,
            req.params.flightId
        );

        res.status(200).json({
            success: true,
            message:
                "Subscription removed successfully",
        });
    } catch (error) {
        next(error);
    }
};