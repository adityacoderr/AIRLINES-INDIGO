import { Router } from "express";

import flightRoutes from "./flightRoutes.js";
import subscriptionRoutes from "./subscriptionRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Flight Status API is running",
    });
});


router.use("/flights", flightRoutes);
router.use(
    "/subscriptions",
    subscriptionRoutes
);
router.use(
    "/notifications",
    notificationRoutes
);

export default router;