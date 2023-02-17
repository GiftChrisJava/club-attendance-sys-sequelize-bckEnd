const entities = require("../model");

const Attendance = entities.attendance;
const Member = entities.member;
const Club = entities.club;

// create attendance for a particular member
const createAttendance = async (req, res) => {
  try {
    // find a member
    const member = await Member.findByPk(req.body.memberId);
    if (!member) {
      res.status(404).json({ message: " Member Not Found" });
    }

    // find the club
    const club = await Club.findByPk(req.body.clubId);
    if (!club) {
      res.status(404).json({ message: " Club Not Found" });
    }

    // set the attendance
    const attendance = await Attendance.create({
      memberId: req.body.memberId,
      clubId: req.body.clubId,
      attendedOn: req.body.attendedOn,
      attended: req.body.attended,
    });

    return res.status(201).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all attendees
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();

    return res.status(200).json({ attendances });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get attendance by Id
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);

    if (!attendance) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update the attendance of a particular member
const updateMemberAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      where: {
        memberId: req.params.memberId,
      },
    });

    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }

    // make the update
    const updatedAttendance = await attendance.update({
      attended: req.body.attended,
    });

    res.send({ data: updatedAttendance });
  } catch (error) {
    return res.status(500).json({ massage: "server error" });
  }
};

// delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Attendance.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    return res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateMemberAttendance,
  deleteAttendance,
};
