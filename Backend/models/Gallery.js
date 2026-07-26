import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        images: [
            {
                url: String,
                publicId: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Gallery", gallerySchema);