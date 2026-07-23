import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        raceDistance: {
            type: String,
            required: true,
            trim: true,
        },

        ageLimit: {
            type: String,
            required: true,
            trim: true,
        },

        registrationFee: {
            type: Number,
            required: true,
            min: 0,
        },

        allowances: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { _id: false }
);

const annualEventSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },

        eventName: {
            type: String,
            required: true,
            trim: true,
        },

        eventDate: {
            type: Date,
            required: true,
        },

        reportingTime: {
            type: String,
            required: true,
        },

        raceStartTime: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        eventType: {
            type: String,
            enum: [
                "Run",
                "Walk",
                "Marathon",
                "Trail Run",
                "Cycling",
            ],
            default: "Run",
        },

        registrationDeadline: {
            type: Date,
            required: true,
        },

        categories: {
            type: [categorySchema],
            required: true,
            validate: {
                validator: (v) => v.length > 0,
                message: "At least one category is required.",
            },
        },

        coordinates: [
            {
                type: String,
                required: true,
            },
        ],

        paymentMethod: {
            type: String,
            enum: [
                "JazzCash",
                "EasyPaisa",
                "Bank Transfer",
                "Cash",
            ],
            required: true,
        },

        accountTitle: {
            type: String,
            required: true,
            trim: true,
        },

        accountNumber: {
            type: String,
            required: true,
            trim: true,
        },

        qrImage: {
            type: String,
            required: true,
        },

        registrationStatus: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "AnnualEvent",
    annualEventSchema
);