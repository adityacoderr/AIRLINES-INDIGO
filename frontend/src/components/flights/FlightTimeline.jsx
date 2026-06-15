export default function FlightTimeline({ status }) {
    const steps = [
        "On Time",
        "Boarding",
        "Delayed",
        "Departed",
    ];

    return (
        <div className="space-y-6">
            {steps.map((step) => {
                const active = step === status;

                return (
                    <div
                        key={step}
                        className="flex items-center gap-4"
                    >
                        <div
                            className={`
                                flex h-10 w-10 items-center justify-center rounded-full
                                ${
                                    active
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 text-slate-400"
                                }
                            `}
                        >
                            {active ? "✓" : "○"}
                        </div>

                        <span
                            className={`font-medium ${
                                active
                                    ? "text-slate-900"
                                    : "text-slate-500"
                            }`}
                        >
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}