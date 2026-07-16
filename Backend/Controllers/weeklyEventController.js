import WeeklyEvent from "../models/WeeklyEvent.js";
import EventStatistics from "../models/EventStatistics.js";

// const updateEventStatuses = async () => {
//     const now = new Date();

//     const events = await WeeklyEvent.find();

//     for (const event of events) {

//         // Combine event date and time
//         if (!event.date || !event.time) continue;

//         const eventDateTime = new Date(
//             `${event.date.toISOString().split("T")[0]}T${event.time}:00`
//         );

//         let newStatus = event.status;

//         if (newStatus !== "Cancelled") {
//             if (eventDateTime <= now) {
//                 newStatus = "Completed";
//             } else {
//                 newStatus = "Upcoming";
//             }
//         }

//         if (newStatus !== event.status) {

//             // Increase completed count only once
//             if (
//                 newStatus === "Completed" &&
//                 !event.completedCounted
//             ) {
//                 await EventStatistics.findOneAndUpdate(
//                     {},
//                     {
//                         $inc: {
//                             completedEvents: 1
//                         }
//                     },
//                     {
//                         upsert: true,
//                         new: true
//                     }
//                 );

//                 event.completedCounted = true;
//             }
//             if (event.status !== newStatus) {
//                 event.status = newStatus;
//             }
//             await event.save();
//         }
//     }
// };
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
                    $inc:{
                        completedEvents:1
                    }
                },
                {
                    upsert:true,
                    new:true
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

        // const event = await WeeklyEvent.create(req.body);
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



        // check status changed

        if (
            oldEvent.status !== "Completed" &&
            updatedEvent.status === "Completed"
        ) {


            let stats =
                await EventStatistics.findOne();


            if (!stats) {

                stats =
                    await EventStatistics.create({
                        completedEvents: 1
                    });

            }
            else {

                stats.completedEvents += 1;

                await stats.save();

            }


        }



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


        await WeeklyEvent.findByIdAndDelete(
            req.params.id
        );


        // DO NOT decrease completed counter


        res.json({
            message: "Event deleted"
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