import Notification from "../models/Notification.js";

export const createNotification = async (
    data
) => {
    return await Notification.create(data);
};

export const getUserNotifications = async (
    userId
) => {
    Notification.find({ userId })
.populate(
    "flightId",
    "flightNumber origin destination status gate"
)
.sort({ createdAt: -1 })
.populate(
    "flightId",
    "flightNumber origin destination status gate"
)
.sort({
    createdAt: -1,
});
};

export const markAsRead = async (
    notificationId
) => {
    return await Notification.findByIdAndUpdate(
        notificationId,
        {
            isRead: true,
        },
        {
            new: true,
        }
    );
};