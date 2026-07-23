import AnnualEvent from "../models/AnnualEvent.js";
import fs from "fs";
import path from "path";

/* ==========================
   CREATE EVENT
========================== */

export const createAnnualEvent = async (req, res) => {
    try {

        const data = req.body;

        const banner =
            req.files?.banner?.[0]
                ? `/uploads/annual-events/${req.files.banner[0].filename}`
                : "";

        const qrImage =
            req.files?.qrImage?.[0]
                ? `/uploads/annual-events/${req.files.qrImage[0].filename}`
                : "";

        const event = new AnnualEvent({
            ...data,
            banner,
            qrImage,
            categories: JSON.parse(data.categories || "[]"),
            coordinates: JSON.parse(data.coordinates || "[]"),
        });

        await event.save();

        res.status(201).json({
            success: true,
            message: "Annual event created successfully",
            event,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};


/* ==========================
   GET ALL EVENTS
========================== */

export const getAnnualEvents = async (req, res) => {

    try {

        const events = await AnnualEvent.find()
            .sort({ createdAt: -1 });

        res.json(events);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};


/* ==========================
   GET SINGLE EVENT
========================== */

export const getAnnualEvent = async (req, res) => {

    try {

        const event = await AnnualEvent.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found",
            });

        }

        res.json(event);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};


/* ==========================
   UPDATE EVENT
========================== */

export const updateAnnualEvent = async (req, res) => {

    try {

        const event = await AnnualEvent.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found",
            });

        }

        const data = req.body;

        if (req.files?.banner?.[0]) {

            if (event.banner) {

                const oldPath = path.join(
                    process.cwd(),
                    event.banner.replace("/", "")
                );

                if (fs.existsSync(oldPath))
                    fs.unlinkSync(oldPath);

            }

            event.banner =
                `/uploads/annual-events/${req.files.banner[0].filename}`;

        }

        if (req.files?.qrImage?.[0]) {

            if (event.qrImage) {

                const oldPath = path.join(
                    process.cwd(),
                    event.qrImage.replace("/", "")
                );

                if (fs.existsSync(oldPath))
                    fs.unlinkSync(oldPath);

            }

            event.qrImage =
                `/uploads/annual-events/${req.files.qrImage[0].filename}`;

        }

        Object.keys(data).forEach(key => {

            if (key === "categories") {

                event.categories = JSON.parse(data.categories);

            }

            else if (key === "coordinates") {

                event.coordinates = JSON.parse(data.coordinates);

            }

            else {

                event[key] = data[key];

            }

        });

        await event.save();

        res.json({
            success: true,
            message: "Event updated successfully",
            event,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};


/* ==========================
   DELETE EVENT
========================== */

export const deleteAnnualEvent = async (req, res) => {

    try {

        const event = await AnnualEvent.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found",
            });

        }

       if (event.banner) {

            const bannerPath = path.join(
                process.cwd(),
                "uploads",
                "annual-events",
                "banners",
                path.basename(event.banner)
            );


            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }

        }

         // Delete QR Image
        if (event.qrImage) {

            const qrPath = path.join(
                process.cwd(),
                "uploads",
                "annual-events",
                "qr",
                path.basename(event.qrImage)
            );


            if (fs.existsSync(qrPath)) {
                fs.unlinkSync(qrPath);
            }

        }

        await AnnualEvent.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Annual event deleted successfully",
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};


/* ==========================
   TOGGLE REGISTRATION
========================== */

export const toggleRegistrationStatus = async (req, res) => {

    try {

        const event = await AnnualEvent.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found",
            });

        }

        event.registrationStatus =
            event.registrationStatus === "Open"
                ? "Closed"
                : "Open";

        await event.save();

        res.json({
            success: true,
            registrationStatus: event.registrationStatus,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};