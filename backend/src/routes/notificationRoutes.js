import { Router } from "express";

import {
    getNotifications,
    markNotificationAsRead,
} from "../controllers/notificationController.js";

const router = Router();

router.get("/:userId", getNotifications);

router.patch(
    "/:id/read",
    markNotificationAsRead
);

export default router;