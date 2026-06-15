export default function NotificationItem({
    notification,
    onRead,
}) {
    return (
        <div
            className={`
                rounded-2xl border p-4 transition
                ${
                    notification.isRead
                        ? "bg-white border-slate-200"
                        : "bg-blue-50 border-blue-200"
                }
            `}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                        {notification.title}
                    </h4>

                    <p className="mt-1 text-sm text-slate-600">
                        {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                        {new Date(
                            notification.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                {!notification.isRead && (
                    <div className="h-3 w-3 rounded-full bg-blue-500 mt-1" />
                )}
            </div>

            {!notification.isRead && (
                <button
                    onClick={() =>
                        onRead(notification._id)
                    }
                    className="
                        mt-4 rounded-xl
                        bg-blue-600 px-4 py-2
                        text-sm font-medium text-white
                        hover:bg-blue-700
                    "
                >
                    Mark as Read
                </button>
            )}
        </div>
    );
}