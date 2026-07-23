import multer from "multer";
import fs from "fs";
import path from "path";

const bannerDir = "uploads/annual-events/banners";
const qrDir = "uploads/annual-events/qr";

if (!fs.existsSync(bannerDir)) {
    fs.mkdirSync(bannerDir, { recursive: true });
}

if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {

        if (file.fieldname === "banner") {
            cb(null, bannerDir);
        }
        else if (file.fieldname === "qrImage") {
            cb(null, qrDir);
        }
        else {
            cb(new Error("Invalid field"));
        }

    },

    filename(req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    },
});

const fileFilter = (req, file, cb) => {

    if (!file.mimetype.startsWith("image/")) {

        return cb(
            new Error("Only image files are allowed."),
            false
        );

    }

    cb(null, true);

};

const uploadAnnualEvent = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

}).fields([
    {
        name: "banner",
        maxCount: 1,
    },
    {
        name: "qrImage",
        maxCount: 1,
    },
]);

export default uploadAnnualEvent;