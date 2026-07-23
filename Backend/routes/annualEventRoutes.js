import express from "express";
import uploadAnnualEvent from "../middleware/uploadAnnualEvent.js";

import {
    createAnnualEvent,
    getAnnualEvents,
    getAnnualEvent,
    updateAnnualEvent,
    deleteAnnualEvent,
    toggleRegistrationStatus,
} from "../Controllers/annualEventController.js";

const router = express.Router();

// Create
router.post(
    "/",
    uploadAnnualEvent,
    createAnnualEvent
);

// Get All
router.get(
    "/",
    getAnnualEvents
);

// Get Single
router.get(
    "/:id",
    getAnnualEvent
);

// Update
router.put(
    "/:id",
    uploadAnnualEvent,
    updateAnnualEvent
);

// Delete
router.delete(
    "/:id",
    deleteAnnualEvent
);

// Toggle Registration Status
router.patch(
    "/:id/status",
    toggleRegistrationStatus
);

export default router;