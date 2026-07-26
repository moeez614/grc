// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "grc-gallery",
//         allowed_formats: ["jpg", "jpeg", "png", "webp"],
//         resource_type: "image",
//     },
// });

// export default multer({ storage });
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits:{
        fileSize: 10 * 1024 * 1024
    }
});

export default upload;