import AnnualEvent from "../models/AnnualEvent.js";
import Payment from "../models/Payment.js";
import sharp from "sharp";

export const registerAnnualEvent = async (req, res) => {
  try {

    // ==========================
    // Check Event
    // ==========================
    const event = await AnnualEvent.findById(req.body.eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    // ==========================
    // Registration Status
    // ==========================
    if (event.registrationStatus !== "Open") {
      return res.status(400).json({
        success: false,
        message: "Registration is closed."
      });
    }

    // ==========================
    // Deadline
    // ==========================
    if (new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline has passed."
      });
    }

    // ==========================
    // Category
    // ==========================
    const category = event.categories.find(
      item => item.raceDistance === req.body.category
    );

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid race category."
      });
    }

    // ==========================
    // Age Validation
    // ==========================
    if (Number(req.body.age) < Number(category.ageLimit)) {
      return res.status(400).json({
        success: false,
        message: `Minimum age is ${category.ageLimit}`
      });
    }

    // ==========================
    // Duplicate Registration
    // ==========================
    const exists = await Payment.findOne({
      event: event._id,
      email: req.body.email
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "You have already registered."
      });
    }

    // ==========================
    // Uploaded Image
    // ==========================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required."
      });
    }

    const metadata = await sharp(req.file.path).metadata();

    if (
      metadata.width > 5000 ||
      metadata.height > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Image resolution is too large."
      });
    }

    // ==========================
    // Save Registration
    // ==========================
    const registration = await Payment.create({

      event: event._id,

      fullName: req.body.fullName,

      email: req.body.email,

      age: req.body.age,

      category: req.body.category,

      registrationFee: category.registrationFee,

      emergency: req.body.emergency,
      transactionId: req.body.transactionId,
      paymentProof: req.file.filename, // Change if using Cloudflare R2

      status: "Pending"

    });

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      registration
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};