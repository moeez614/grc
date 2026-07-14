import express from "express";
import multer from "multer";

import {
  getSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../Controllers/sponsorController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

router.get("/", getSponsors);

router.post(
  "/",
  upload.single("logo"),
  createSponsor
);

router.put(
  "/:id",
  upload.single("logo"),
  updateSponsor
);

router.delete("/:id", deleteSponsor);

export default router;