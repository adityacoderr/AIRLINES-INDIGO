import { Router } from "express";

import {
    subscribeToFlight,
    getSubscriptions,
    unsubscribe,
} from "../controllers/subscriptionController.js";

const router = Router();

router.post("/", subscribeToFlight);

router.get("/:userId", getSubscriptions);

router.delete("/:flightId", unsubscribe);

export default router;