export default function NotificationBell({
    count,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="
                relative rounded-2xl
                bg-white p-3 shadow-sm
                border border-slate-200
                hover:shadow-md
                transition
            "
        >
            🔔

            {count > 0 && (
                <span
                    className="
                        absolute -right-1 -top-1
                        flex h-6 w-6 items-center justify-center
                        rounded-full bg-red-500
                        text-xs font-bold text-white
                    "
                >
                    {count}
                </span>
            )}
        </button>
    );
}