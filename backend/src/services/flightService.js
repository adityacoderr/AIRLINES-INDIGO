import Flight from "../models/Flight.js";

export const getAllFlights = async () => {
    return await Flight.find().sort({ departureTime: 1 });
};

export const getFlightById = async (id) => {
    return await Flight.findById(id);
};

export const updateFlightStatus = async (
    id,
    status,
    reason,
    gate
) => {
    const flight = await Flight.findById(id);

    if (!flight) {
        return null;
    }

    flight.status = status;

    if (reason) {
        flight.delayReason = reason;
    }

    if (gate) {
        flight.gate = gate;
    }

    await flight.save();

    return flight;
};