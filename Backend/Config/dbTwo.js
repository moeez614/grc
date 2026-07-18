import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const secondDB = mongoose.createConnection(
    process.env.SECOND_MONGO_URI
);

secondDB.on("connected", () => {
    console.log("2️⃣ Second MongoDB Connected");
});

secondDB.on("error", (error) => {
    console.log("Second MongoDB Error:", error);
});

export default secondDB;