// src/routes/AppRoutes.jsx

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AdminDashboard from "../pages/AdminDashboard";
import Dashboard from "../pages/Dashboard";
import FlightDetails from "../pages/FlightDetails";
import Notifications from "../pages/Notifications";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (
        <BrowserRouter>
           <Routes>
    <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
    />

    <Route
        path="/dashboard"
        element={<Dashboard />}
    />

    <Route
        path="/flights/:id"
        element={<FlightDetails />}
    />

    <Route
        path="/notifications"
        element={<Notifications />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/admin"
        element={<AdminDashboard />}
    />

    <Route
        path="*"
        element={<h2>404 - Page Not Found</h2>}
    />
</Routes>
        </BrowserRouter>
    );
}