import NotificationItem from "./NotificationItem";

export default function NotificationList({
    notifications,
    onRead,
}) {
    if (notifications.length === 0) {
        return (
            <p className="text-slate-500">
                No notifications yet.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                    onRead={onRead}
                />
            ))}
        </div>
    );
}