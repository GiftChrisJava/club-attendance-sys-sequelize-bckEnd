const { attendance } = require("../model");
const entities = require("../model");

const Club = entities.club;
const Member = entities.member;
const Attendance = entities.attendance;

// create a club
const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    return res.status(201).json({ club });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get all clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    return res.status(200).json({ clubs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get members who attended on a particular data
const getMembersByDate = async (req, res) => {
  try {
    // find all members who attended on this date
    const members = await Member.findAll({
      include: [
        {
          model: Attendance,
          where: { attended: true, attendedOn: req.params.attendedOn },
        },
      ],
    });

    res.send({ data: members });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// get club by Id
const getClubById = async (req, res) => {
  try {
    // get club id
    const { id } = req.params;

    const club = await Club.findByPk(id, {
      include: [
        {
          model: Member,

          include: [{ model: Attendance }],
        },
      ],
    });

    if (!club) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json({ club });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update a club
const updateClub = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Club.update(req.body, {
      where: { id },
      returning: true,
    });

    // if member was not found
    if (!updated) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ updated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete a club
const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.destroy({ where: { id } });

    if (!club) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ club });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClub,
  deleteClub,
  getAllClubs,
  getClubById,
  updateClub,
  getMembersByDate,
};
