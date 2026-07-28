import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success:false,
        message:"Too many registration attempts. Try again later."
    }

});

export default registerLimiter;