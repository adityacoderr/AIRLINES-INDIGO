export default function FlightStatusBadge({ status }) {
    const styles = {
        "On Time":
            "bg-emerald-100 text-emerald-700 ring-emerald-200",

        Delayed:
            "bg-amber-100 text-amber-700 ring-amber-200",

        Boarding:
            "bg-blue-100 text-blue-700 ring-blue-200",

        Cancelled:
            "bg-red-100 text-red-700 ring-red-200",

        Departed:
            "bg-slate-200 text-slate-700 ring-slate-300",
    };

    return (
        <span
            className={`
                inline-flex items-center rounded-full
                px-3 py-1 text-xs font-semibold
                ring-1 ring-inset
                ${styles[status] || styles["Departed"]}
            `}
        >
            {status}
        </span>
    );
}