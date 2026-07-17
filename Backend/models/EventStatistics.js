import mongoose from "mongoose";
import dbTwo from "../Config/dbTwo.js";

const eventStatisticsSchema = new mongoose.Schema(
{

    completedEvents:{
        type:Number,
        default:0
    }

});


export default dbTwo.model(
    "EventStatistics",
    eventStatisticsSchema
);