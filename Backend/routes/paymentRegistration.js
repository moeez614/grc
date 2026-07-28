import express from "express";
import upload from "../middleware/upload.js";

import registerLimiter from "../middleware/photolimiter.js";
import { registerAnnualEvent } from "../Controllers/paymentController.js"

const router = express.Router();

router.post(

    "/register",

    registerLimiter,

    upload.single("payment"),

    registerAnnualEvent

);

export default router;