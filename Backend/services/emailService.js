import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }

});
transporter.verify((error, success) => {

    if (error) {
        console.log("🔥🔥Email server error:", error);
    }
    else {
        console.log("😅😅Email server ready");
    }

});
export const sendReminderEmail = async (emails, event) => {
    try {

        const info = await transporter.sendMail({

            from: process.env.EMAIL,

            to: emails,

            subject: `Reminder: ${event.name}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Race Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:30px auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">

    <tr>
        <td style="background:#1B2F51;padding:30px;text-align:center;color:white;">
            <h1 style="margin:0;"> GOJRA RUNNING CLUB</h1>
            <p style="margin-top:10px;color:#2BC4DA;">
                Event Reminder • 24 Hours Remaining
            </p>
        </td>
        ${event.banner
                    ? `
            <img
                src="${process.env.BASE_URL}/uploads/${event.banner}"
                alt="${event.name}"
                style="width:100%;height:200px;object-fit:cover;border-radius:10px;"
            />
          `
                    : ""
                }
    </tr>

    <tr>
        <td style="padding:35px;">
            <h2 style="color:#1B2F51;">
                Hello Runner,
            </h2>

            <p style="font-size:16px;color:#555;line-height:1.7;">
            ${event.description
                    ? event.description
                    : "Your race is almost here! We're excited to see you tomorrow at our upcoming event."
                }
            </p>

            <table width="100%" style="background:#f7fbfc;border-left:5px solid #2BC4DA;margin:25px 0;padding:20px;border-radius:8px;">
                <tr>
                    <td>
                        <h3 style="margin:0;color:#ED2974;">
                            ${event.name}
                        </h3>

                        <p>
                            📅 <strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}
                        </p>

                        <p>
                            🕒 <strong>Time:</strong> ${event.time}
                        </p>

                        <p>
                            📍 <strong>Location:</strong> ${event.location}
                        </p>

                        <p>
                            🏃 <strong>Distance:</strong> ${event.distance}
                        </p>
                    </td>
                </tr>
            </table>

            <div style="background:#1B2F51;color:white;padding:20px;border-radius:10px;margin-top:20px;">
                <h3 style="margin-top:0;color:#2BC4DA;">
                    Remember to bring:
                </h3>

                <ul style="line-height:2;">
                    <li>Running shoes</li>
                    <li>Water bottle</li>
                    <li>Race bib / Registration ID</li>
                    <li>Sportswear</li>
                    <li>Positive energy!</li>
                </ul>
            </div>

            <div style="text-align:center;margin-top:35px;">
                <a href="${process.env.BASE_URL}/events/regular" style="background:#ED2974;color:white;padding:15px 35px;text-decoration:none;border-radius:50px;font-weight:bold;display:inline-block;">
                    View Event Details
                </a>
            </div>
        </td>
    </tr>

    <tr>
        <td style="background:#1B2F51;color:white;text-align:center;padding:25px;">
            <p><strong>Gojra Running Club</strong></p>

            <p style="color:#2BC4DA;">
                Run Together • Grow Together
            </p>

            <small>
                This email was sent automatically 24 hours before the event.
            </small>
        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`

        });

        console.log("Email sent:", info.response);

    } catch (err) {

        console.log("Email failed:", err);

    }

};