const statuses = [
    "All",
    "On Time",
    "Delayed",
    "Cancelled",
    "Boarding",
    "Departed",
];

export default function FlightFilters({
    value,
    onChange,
}) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="
                w-full rounded-2xl border border-slate-300
                bg-slate-50 px-4 py-3
                text-slate-800
                focus:border-blue-500
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-blue-100
                transition
            "
        >
            {statuses.map((status) => (
                <option
                    key={status}
                    value={status}
                >
                    {status}
                </option>
            ))}
        </select>
    );
}