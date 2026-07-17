// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import connectDBOne from "./Config/dbOne.js";
import "./Config/dbTwo.js";

connectDBOne();
// connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

import adminRoutes from "./routes/adminRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import sponsorRoutes from "./routes/sponsorRoute.js";
import weeklyEventRoutes from "./routes/weeklyEventRoutes.js";


app.use("/uploads", express.static("uploads"));
app.use("/api/sponsors", sponsorRoutes);

app.use("/api/admin",adminRoutes);
app.use("/api/members",memberRoutes);
app.use("/api/weekly-events",weeklyEventRoutes);

// test run
app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});