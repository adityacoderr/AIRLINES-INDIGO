import * as notificationService from "../services/notificationService.js";

export const getNotifications = async (
    req,
    res,
    next
) => {
    try {
        const notifications =
            await notificationService.getUserNotifications(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        next(error);
    }
};

export const markNotificationAsRead = async (
    req,
    res,
    next
) => {
    try {
        const notification =
            await notificationService.markAsRead(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};