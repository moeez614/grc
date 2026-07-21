import mongoose from "mongoose";


const memberSchema = new mongoose.Schema(
    {
        memberId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },


        name: {
            type: String,
            required: true,
            trim: true
        },


        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },


        title: {
            type: String,
            required: true,
            trim: true
        },


        photo: {
            type: String,
            default: ""
        },


        isActive: {
            type: Boolean,
            default: true
        },
        runningStats: {
            totalDistance: {
                type: Number,
                default: 0
            },

            totalEvents: {
                type: Number,
                default: 0
            }
        }

    },
    {
        timestamps: true
    }
);

const Member = mongoose.model(
    "Member",
    memberSchema
);


export default Member;