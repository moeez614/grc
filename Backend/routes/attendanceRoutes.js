import express from "express";
import {
    saveAttendance
} from "../Controllers/attendanceController.js";


const router = express.Router();


router.post(
    "/",
    saveAttendance
);


export default router;