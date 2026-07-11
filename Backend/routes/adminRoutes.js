import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import protect from "../middleware/auth.js";
import {loginLimiter} from "../middleware/rateLimiter.js";

const router = express.Router();


// ================login===================
router.post("/login",loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;



        const admin = await Admin.findOne({ email });


        if (!admin) {

            return res.status(401).json({
                message: "Invalid credentials"
            });

        }



        const match = await bcrypt.compare(
            password,
            admin.password
        );



        if (!match) {

            return res.status(401).json({
                message: "Invalid credentials"
            });

        }




        const token = jwt.sign(

            {
                id: admin._id,
                role: admin.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );



        res.json({

            message: "Login successful",

            token,

            admin: {
                email: admin.email,
                role: admin.role
            }

        });


    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }


});
// =================Change Email ================
router.put(
    "/change-email",
    protect,
    async (req, res) => {


        const { newEmail } = req.body;


        await Admin.findByIdAndUpdate(

            req.admin.id,

            {
                email: newEmail
            }

        );


        res.json({
            message: "Email updated"
        });


    });
// =================Change Password ================
router.put(
    "/change-password",
    protect,
    async (req, res) => {


        const { newPassword } = req.body;


        const hash =
            await bcrypt.hash(newPassword, 10);



        await Admin.findByIdAndUpdate(

            req.admin.id,

            {
                password: hash
            }

        );



        res.json({
            message: "Password changed"
        });


    });


export default router;