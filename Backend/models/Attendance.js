import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({

    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WeeklyEvent",
        required:true
    },


    members:[
        {
            member:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Member",
                required:true
            },

            distance:{
                type:Number,
                required:true
            },

            attended:{
                type:Boolean,
                default:true
            }
        }
    ],


    createdAt:{
        type:Date,
        default:Date.now
    }

});


export default mongoose.model(
    "Attendance",
    attendanceSchema
);