const memberController = require("../controller/memberController");
const clubControler = require("../controller/clubController");
const attendanceController = require("../controller/attendanceController");
// get router
const router = require("express").Router();

//member routes
router.get("/members", memberController.getAllMembers);
router.get("/member/email/:email", memberController.getMemberByEmail);
router.get("/member/:id", memberController.getMemberById);
router.post("/member", memberController.createMember);
router.put("/member/:id", memberController.updateMember);
router.delete("member/:id", memberController.deleteMember);

// club routes
router.get("/clubs", clubControler.getAllClubs);
router.get("/club/:id", clubControler.getClubById);
router.get("/club/members/:attendedOn", clubControler.getMembersByDate);
router.post("/club", clubControler.createClub);
router.put("/club/:id", clubControler.updateClub);
router.delete("/club/:id", clubControler.deleteClub);

// attendance routes
router.get("/attendance/:id", attendanceController.getAttendanceById);
router.get("/attendances", attendanceController.getAllAttendances);
router.post(
  "/attendance/:memberId/:clubId",
  attendanceController.createAttendance
);
router.put(
  "/attendance/member/:memberId",
  attendanceController.updateMemberAttendance
);
router.delete("/attendance/:id", attendanceController.deleteAttendance);

module.exports = router;
