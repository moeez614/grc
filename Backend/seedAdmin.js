import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


    const hashPassword = await bcrypt.hash(
        "Admin@12345",
        10
    );


    await Admin.create({

        email:"admin@gmail.com",

        password:hashPassword,

        role:"admin"

    });


    console.log("Admin Created");

    process.exit();

})
.catch(err=>console.log(err));