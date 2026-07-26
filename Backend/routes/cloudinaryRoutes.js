import express from "express";
import upload from "../Config/Cloudinarymulter.js";
import cloudinary from "../Config/cloudinary.js";
import {
    uploadGallery,
    deleteGallery,
} from "../Controllers/galleryControllers.js";

const router = express.Router();

router.post(
    "/",
    upload.array("images", 50),
    uploadGallery
);
// router.post(
//     "/",
//     (req,res,next)=>{

//         console.log("Before multer");

//         next();

//     },
//     upload.array("images"),
//     (req,res,next)=>{

//         console.log("After multer");
//         console.log(req.files);
//         console.log(req.body);

//         next();

//     },
//     uploadGallery
// );

router.delete("/:id", deleteGallery);
router.get("/cloudinary-test", async (req, res) => {
    try {

        const result = await cloudinary.api.ping();

        console.log("Cloudinary result:", result);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.log("Cloudinary error:");
        console.log(error);
        console.log(error.message);

        res.status(500).json({
            success:false,
            message:error.message,
            name:error.name
        });

    }
});
router.get("/simple-upload-test", async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            {
                folder: "grc-gallery"
            }
        );

        console.log("UPLOAD SUCCESS:");
        console.log(result);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.log("UPLOAD FAILED:");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
            code: error.http_code
        });

    }
});
export default router;