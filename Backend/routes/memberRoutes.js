import express from "express";
import multer from "multer";
import Member from "../models/Member.js";
import fs from "fs";
import path from "path";

const router = express.Router();



// Image Storage

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },


    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});


const upload = multer({
    storage
});

// GET ALL MEMBERS

// router.get("/", async (req, res) => {
//     // try {


//     //     const members = await Member.find()
//     //         .sort({
//     //             createdAt: -1
//     //         });


//     //     res.json(members);


//     // }
//     // catch (error) {

//     //     res.status(500)
//     //         .json({
//     //             message: error.message
//     //         });

//     // }

//     try {
//     const {
//       page = 1,
//       limit = 12,
//       search = "",
//       role = "All",
//     } = req.query;

//     const query = {};

//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//         { memberId: { $regex: search, $options: "i" } },
//       ];
//     }

//     if (role !== "All") {
//       query.title = role;
//     }

//     const roleOrder = {
//       Founder: 1,
//       Admin: 2,
//       Coach: 3,
//       Member: 4,
//     };

//     const members = await Member.aggregate([
//       { $match: query },

//       {
//         $addFields: {
//           rolePriority: {
//             $switch: {
//               branches: [
//                 { case: { $eq: ["$title", "Founder"] }, then: 1 },
//                 { case: { $eq: ["$title", "Admin"] }, then: 2 },
//                 { case: { $eq: ["$title", "Coach"] }, then: 3 },
//                 { case: { $eq: ["$title", "Member"] }, then: 4 },
//               ],
//               default: 5,
//             },
//           },
//         },
//       },

//       {
//         $sort: {
//           isActive: -1,
//           rolePriority: 1,
//           name: 1,
//         },
//       },

//       { $skip: (page - 1) * Number(limit) },
//       { $limit: Number(limit) },
//     ]);

//     const total = await Member.countDocuments(query);

//     res.json({
//       members,
//       total,
//       currentPage: Number(page),
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
//         //   const members = await Member.find()
//         //     .sort({
//         //         createdAt: -1
//         //     });


//         // res.json(members);
// });
router.get("/", async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      search = "",
      role = "All",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // Search
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
        { memberId: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Role Filter
    if (role !== "All") {
      query.title = role;
    }

    const result = await Member.aggregate([
      { $match: query },

      {
        $addFields: {
          rolePriority: {
            $switch: {
              branches: [
                { case: { $eq: ["$title", "Founder"] }, then: 1 },
                { case: { $eq: ["$title", "Admin"] }, then: 2 },
                { case: { $eq: ["$title", "Coach"] }, then: 3 },
                { case: { $eq: ["$title", "Member"] }, then: 4 },
              ],
              default: 5,
            },
          },
        },
      },

      {
        $sort: {
          isActive: -1,
          rolePriority: 1,
          name: 1,
        },
      },

      {
        $facet: {
          members: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
          totalCount: [
            { $count: "count" },
          ],
        },
      },
    ]);

    const members = result[0].members;
    const total = result[0].totalCount.length
      ? result[0].totalCount[0].count
      : 0;

    res.json({
      members,
      totalMembers: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ADD MEMBER

router.post(
    "/",
    upload.single("photo"),
    async (req, res) => {


        try {


            const member = await Member.create({
                memberId: req.body.memberId,
                name: req.body.name,
                email: req.body.email,
                title: req.body.title,

                isActive:
                    req.body.isActive === "true",


                photo:
                    req.file
                        ?
                        req.file.path
                        :
                        ""

            });



            res.status(201)
                .json(member);



        }
        catch (error) {
            if (error.code === 11000) {

                return res.status(400).json({
                    message: "Member ID or Email already exists"
                });

            }


            res.status(500).json({
                message: error.message
            });


        }



    });
// UPDATE MEMBER

router.put(
    "/:id",
    upload.single("photo"),
    async (req, res) => {

        try {

            const member = await Member.findById(req.params.id);

            if (!member)
                return res.status(404).json({ message: "Member not found" });

            member.name = req.body.name;
            member.email = req.body.email;
            member.title = req.body.title;
            member.isActive = req.body.isActive === "true";

            if (req.file) {

                // Delete old image
                if (member.photo) {

                    const oldImagePath = path.join(process.cwd(), member.photo);

                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }

                }

                // Save new image path
                member.photo = req.file.path;
            }

            await member.save();

            res.json(member);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
);

// DELETE MEMBER

router.delete(
    "/:id",
    async (req, res) => {
        try {

            const member = await Member.findById(req.params.id);

            if (!member) {

                return res.status(404).json({
                    message: "Member not found"
                });

            }

            // Delete image
            if (member.photo) {

                const imagePath = path.join(process.cwd(), member.photo);

                if (fs.existsSync(imagePath)) {

                    fs.unlinkSync(imagePath);

                }

            }

            await Member.findByIdAndDelete(req.params.id);

            res.json({
                message: "Member deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    });



export default router;