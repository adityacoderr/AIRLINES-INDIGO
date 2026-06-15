export default function FlightSearch({
    value,
    onChange,
}) {
    return (
        <div className="relative">

            <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>

            <input
                type="text"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Search flight number, origin or destination..."
                className="
                    w-full rounded-2xl border border-slate-300
                    bg-slate-50 py-3 pl-12 pr-4
                    text-slate-800
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                "
            />

        </div>
    );
}