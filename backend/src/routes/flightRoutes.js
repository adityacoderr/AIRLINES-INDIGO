import { Router } from "express";

import {
    getFlights,
    getFlight,
    updateStatus,
} from "../controllers/flightController.js";

const router = Router();

router.get("/", getFlights);

router.get("/:id", getFlight);

router.post("/:id/status", updateStatus);

export default router;