import mongoose from "mongoose";


const eventStatisticsSchema = new mongoose.Schema(
{

    completedEvents:{
        type:Number,
        default:0
    }

});


export default mongoose.model(
    "EventStatistics",
    eventStatisticsSchema
);