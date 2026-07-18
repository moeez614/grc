import WeeklyEvent from "../models/WeeklyEvent.js";
import EventStatistics from "../models/EventStatistics.js";
import fs from "fs";
import path from "path";
import Member from "../models/Member.js";
import { sendReminderEmail } from "../services/emailService.js";

const updateEventStatuses = async () => {

    const now = new Date();

    const events = await WeeklyEvent.find();


    for (const event of events) {

        if (!event.date || !event.time) {
            continue;
        }


        const eventDateTime = new Date(
            `${event.date.toISOString().split("T")[0]}T${event.time}:00`
        );


        if (
            eventDateTime <= now &&
            event.status === "Upcoming"
        ) {


            // Increase completed count
            await EventStatistics.findOneAndUpdate(
                {},
                {
                    $inc: {
                        completedEvents: 1
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            );


            event.status = "Completed";

            await event.save();


            console.log(
                "Completed counter increased for:",
                event.name
            );

        }

    }

};
// CREATE EVENT

export const createWeeklyEvent = async (req, res) => {

    try {
        const banner = req.file
            ? req.file.filename
            : null;

        const event = await WeeklyEvent.create({

            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            distance: req.body.distance,
            status: req.body.status,
            description: req.body.description,
            banner

        });
        const eventDateTime = new Date(
            `${req.body.date}T${req.body.time}`
        );
        const now = new Date();

console.log("Now:", now);
console.log("Event DateTime:", eventDateTime);

const hoursLeft =
    (eventDateTime.getTime() - now.getTime()) /
    (1000 * 60 * 60);

console.log("Hours left:", hoursLeft);


        if (hoursLeft > 0 && hoursLeft <= 24) {

            const members =
                await Member.find({}, "email");

            const emails =
                members.map(m => m.email);

            console.log("Hours left:", hoursLeft);
            console.log("Event:", event.name);
            console.log("Sending immediate reminder...");
            await sendReminderEmail(
                emails,
                event
            );


            event.reminderSent = true;

            await event.save();

        }

        res.status(201).json({
            message: "Event created",
            event
        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET EVENTS

export const getWeeklyEvents = async (req, res) => {

    try {
        const events = await WeeklyEvent
            .find()
            .sort({
                createdAt: -1
            });


        res.json(events);


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

// UPDATE EVENT

export const updateWeeklyEvent = async (req, res) => {

    try {


        const oldEvent =
            await WeeklyEvent.findById(req.params.id);


        const updatedEvent =
            await WeeklyEvent.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(updatedEvent);


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE EVENT

export const deleteWeeklyEvent = async (req, res) => {

    try {

        const event = await WeeklyEvent.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Delete banner image if it exists
        if (event.banner) {

            const imagePath = path.join(
                process.cwd(),
                "uploads",
                event.banner
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await WeeklyEvent.findByIdAndDelete(req.params.id);

        res.json({
            message: "Event deleted successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET DASHBOARD STATS
export const getEventStats = async (req, res) => {

    try {

        await updateEventStatuses();
        const total =
            await WeeklyEvent.countDocuments();


        const upcoming =
            await WeeklyEvent.countDocuments({
                status: "Upcoming"
            });


        const cancelled =
            await WeeklyEvent.countDocuments({
                status: "Cancelled"
            });



        const stats =
            await EventStatistics.findOne();



        res.json({

            total,

            upcoming,

            cancelled,

            completed:
                stats?.completedEvents || 0
        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }


};