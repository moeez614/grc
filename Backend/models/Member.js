import mongoose from "mongoose";


const memberSchema = new mongoose.Schema(

{
    name:{
        type:String,
        required:true,
        trim:true
    },


    title:{
        type:String,
        required:true
    },


    isActive:{
        type:Boolean,
        default:true
    },


    photo:{
        type:String,
        default:""
    }

},

{
    timestamps:true
}

);
const Member = mongoose.model(
    "Member",
    memberSchema
);


export default Member;