import Sponsor from "../models/Sponsor.js";

export const getSponsors = async(req,res)=>{

    try{

        const sponsors = await Sponsor.find()
        .sort({createdAt:-1});

        res.status(200).json(sponsors);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

export const createSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.create({
      ...req.body,
      logo: req.file ? req.file.filename : "",
    });

    res.status(201).json(sponsor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSponsor = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = req.file.filename;
    }

    const sponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSponsor = async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Sponsor deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};