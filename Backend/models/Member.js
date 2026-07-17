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
    }

},
{
    timestamps:true
}
);


// Prevent duplicate index warning
memberSchema.index(
    { memberId:1 },
    { unique:true }
);


memberSchema.index(
    { email:1 },
    { unique:true }
);



const Member = mongoose.model(
    "Member",
    memberSchema
);


export default Member;