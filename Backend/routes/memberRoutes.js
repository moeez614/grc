import express from "express";
import multer from "multer";
import Member from "../models/Member.js";


const router = express.Router();



// Image Storage

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },


    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});


const upload = multer({
    storage
});

// GET ALL MEMBERS

router.get("/", async (req, res) => {


    try {


        const members = await Member.find()
            .sort({
                createdAt: -1
            });


        res.json(members);


    }
    catch (error) {

        res.status(500)
            .json({
                message: error.message
            });

    }


});

// ADD MEMBER

router.post(
    "/",
    upload.single("photo"),
    async (req, res) => {


        try {


            const member = await Member.create({

                name: req.body.name,

                title: req.body.title,

                isActive:
                    req.body.isActive === "true",


                photo:
                    req.file
                        ?
                        req.file.path
                        :
                        ""

            });



            res.status(201)
                .json(member);



        }
        catch (error) {


            res.status(500)
                .json({
                    message: error.message
                });


        }



    });
// UPDATE MEMBER

router.put(
    "/:id",
    upload.single("photo"),
    async (req, res) => {

        try {

            const member = await Member.findById(req.params.id);

            if (!member)
                return res.status(404).json({ message: "Member not found" });

            member.name = req.body.name;
            member.title = req.body.title;
            member.isActive = req.body.isActive === "true";

            if (req.file) {
                member.photo = req.file.path;
            }

            await member.save();

            res.json(member);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
);

// DELETE MEMBER

router.delete(
    "/:id",
    async (req, res) => {


        try {


            await Member.findByIdAndDelete(
                req.params.id
            );


            res.json({

                message: "Member deleted"

            });


        }
        catch (error) {


            res.status(500)
                .json({
                    message: error.message
                });


        }


    });



export default router;