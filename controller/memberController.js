const entities = require("../model");

// bring the entities out
const Member = entities.member;
const Club = entities.club;
const Attendance = entities.attendance;

// add a member
const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.status(201).json({ member });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a single member by id
const getMemberById = async (req, res) => {
  try {
    // get a member with club and attendance details
    const member = await Member.findByPk(req.params.id, {
      include: [{ model: Club }, { model: Attendance }],
    });

    if (!member) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ member });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a member by email
const getMemberByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const member = await Member.findOne({
      where: { email },
      include: [{ model: Club }, { model: Attendance }],
    });

    if (!member) {
      return res.status(404).send({ message: "Member not found" });
    }

    res.send({ data: member });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// update a member
const updateMember = async (req, res) => {
  try {
    // we need an id
    const { id } = req.params;
    const [updated] = await Member.update(req.body, {
      where: { id },
      returning: true,
    });

    // if member was not found
    if (!updated) {
      return res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete a member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.destroy({ where: { id } });

    if (!member) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ member });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMemberByEmail,
};
