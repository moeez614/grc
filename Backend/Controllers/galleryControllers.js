
import Gallery from "../models/Gallery.js";
import cloudinary from "../Config/cloudinary.js";

const uploadToCloudinary = (buffer) => {

    return new Promise((resolve, reject)=>{

        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"grc-gallery",
                resource_type:"image",
                allowed_formats:[
                    "jpg",
                    "jpeg",
                    "png",
                    "webp"
                ]
            },

            (error,result)=>{

                if(error){

                    console.log(
                        "UPLOAD STREAM ERROR:",
                        error
                    );

                    return reject(error);
                }

                resolve(result);
            }
        );


        stream.end(buffer);

    });

};

export const uploadGallery = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images provided for upload.",
            });
        }

        // Parallel processing using Promise.all for faster uploads
        const uploadPromises = req.files.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer);
            return {
                url: result.secure_url,
                publicId: result.public_id,
            };
        });

        const uploadedImages = await Promise.all(uploadPromises);

        const gallery = await Gallery.create({
            category: req.body.category || "General",
            description: req.body.description || "",
            images: uploadedImages,
        });

        return res.status(201).json({
            success: true,
            gallery,
        });
    } catch (error) {

    console.log("========== CLOUDINARY ERROR ==========");

    console.log("MESSAGE:", error.message);
    console.log("HTTP CODE:", error.http_code);
    console.log("NAME:", error.name);

    console.log(
        "FULL ERROR:",
        JSON.stringify(error, null, 2)
    );


    return res.status(500).json({
        success:false,
        message:error.message,
        code:error.http_code
    });
}
};

export const deleteGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery post not found.",
            });
        }

        // Delete all associated images from Cloudinary
        const deletePromises = gallery.images.map((img) =>
            cloudinary.uploader.destroy(img.publicId)
        );
        await Promise.all(deletePromises);

        await gallery.deleteOne();

        return res.json({
            success: true,
            message: "Gallery and associated images deleted successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};