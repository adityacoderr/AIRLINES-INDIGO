import Flight from "../models/Flight.js";

const flights = [
    {
        flightNumber: "AI202",
        origin: "Delhi",
        destination: "Mumbai",
        departureTime: new Date("2026-06-20T08:00:00"),
        arrivalTime: new Date("2026-06-20T10:00:00"),
        status: "On Time",
        gate: "A12",
    },

    {
        flightNumber: "6E305",
        origin: "Bengaluru",
        destination: "Kolkata",
        departureTime: new Date("2026-06-20T09:15:00"),
        arrivalTime: new Date("2026-06-20T11:45:00"),
        status: "Boarding",
        gate: "B04",
    },

    {
        flightNumber: "UK811",
        origin: "Mumbai",
        destination: "Delhi",
        departureTime: new Date("2026-06-20T12:00:00"),
        arrivalTime: new Date("2026-06-20T14:10:00"),
        status: "Delayed",
        gate: "C08",
        delayReason: "Bad Weather",
    },

    {
        flightNumber: "SG412",
        origin: "Chennai",
        destination: "Hyderabad",
        departureTime: new Date("2026-06-20T13:00:00"),
        arrivalTime: new Date("2026-06-20T14:20:00"),
        status: "On Time",
        gate: "D02",
    },

    {
        flightNumber: "AI505",
        origin: "Pune",
        destination: "Goa",
        departureTime: new Date("2026-06-20T15:30:00"),
        arrivalTime: new Date("2026-06-20T16:45:00"),
        status: "Cancelled",
        gate: "E01",
    },

    {
        flightNumber: "6E777",
        origin: "Delhi",
        destination: "Jaipur",
        departureTime: new Date("2026-06-20T17:00:00"),
        arrivalTime: new Date("2026-06-20T18:00:00"),
        status: "On Time",
        gate: "A03",
    },

    {
        flightNumber: "QP908",
        origin: "Lucknow",
        destination: "Delhi",
        departureTime: new Date("2026-06-20T18:10:00"),
        arrivalTime: new Date("2026-06-20T19:20:00"),
        status: "Departed",
        gate: "F05",
    },

    {
        flightNumber: "IX123",
        origin: "Kochi",
        destination: "Bengaluru",
        departureTime: new Date("2026-06-20T19:30:00"),
        arrivalTime: new Date("2026-06-20T20:40:00"),
        status: "On Time",
        gate: "G02",
    },

    {
        flightNumber: "AI890",
        origin: "Ahmedabad",
        destination: "Delhi",
        departureTime: new Date("2026-06-20T20:15:00"),
        arrivalTime: new Date("2026-06-20T21:50:00"),
        status: "Boarding",
        gate: "B09",
    },

    {
        flightNumber: "6E210",
        origin: "Patna",
        destination: "Mumbai",
        departureTime: new Date("2026-06-20T22:00:00"),
        arrivalTime: new Date("2026-06-21T00:20:00"),
        status: "On Time",
        gate: "C03",
    },
];

export default flights;

import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        await Flight.deleteMany();

        await Flight.insertMany(flights);

        console.log("Flights seeded successfully");

        process.exit();
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

seed();