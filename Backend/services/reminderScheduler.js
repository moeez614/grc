import cron from "node-cron";
import WeeklyEvent from "../models/WeeklyEvent.js";
import Member from "../models/Member.js";
import { sendReminderEmail } from "./emailService.js";


cron.schedule("*/5 * * * *", async () => {

    try {

        const now = new Date();

        const events = await WeeklyEvent.find({
            reminderSent: false,
            status: "Upcoming"
        });


        for (const event of events) {


            const eventDateTime = new Date(
                `${event.date.toISOString().split("T")[0]}T${event.time}:00`
            );


            const hoursLeft =
                (eventDateTime - now)
                /
                (1000 * 60 * 60);



            if (hoursLeft > 0 && hoursLeft <= 24) {


                const members =
                    await Member.find({}, "email");


                const emails =
                    members.map(m => m.email);

                await sendReminderEmail(emails, event);

                event.reminderSent = true;

                await event.save();

                console.log(
                    "Reminder sent:",
                    event.name
                );


            }

        }


    }
    catch (error) {

        console.log(
            "Cron error:",
            error.message
        );

    }

});