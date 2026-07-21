import mongoose from "mongoose";
import dbTwo from "../Config/dbTwo.js";

const weeklyEventSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            default: null
        },

        name: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        distance: {
            type: Number,
            required: true
        },


        status: {
            type: String,
            enum: [
                "Upcoming",
                "Completed",
                "Cancelled"
            ],
            default: "Upcoming"
        },


        description: {
            type: String,
            default: ""
        },

        completedCounted: {
            type: Boolean,
            default: false,
        },
        reminderSent: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });


export default dbTwo.model(
    "WeeklyEvent",
    weeklyEventSchema
);