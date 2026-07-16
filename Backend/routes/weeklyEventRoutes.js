import express from "express";
import upload from "../Config/multer.js"

import {

    createWeeklyEvent,
    getWeeklyEvents,
    updateWeeklyEvent,
    deleteWeeklyEvent,
    getEventStats

}
    from "../Controllers/weeklyEventController.js";


const router = express.Router();



router.post(
    "/",
    upload.single("banner"),
    createWeeklyEvent
);


router.get(
    "/",
    getWeeklyEvents
);


router.put(
    "/:id",
    upload.single("banner"),
    updateWeeklyEvent
);



router.delete(
    "/:id",
    deleteWeeklyEvent
);



router.get(
    "/stats",
    getEventStats
);



export default router;