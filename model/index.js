const dbConfig = require("../config/db");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

// authenticating
sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((error) => {
    console.log("Error >> " + error);
  });

const database = {}; // empty obj

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// define the models
const club = require("./club")(sequelize, DataTypes);
const member = require("./member")(sequelize, DataTypes);
const attendance = require("./attendance")(sequelize, DataTypes);

// associations btwn member, club and attendance
member.belongsTo(club, {
  foreignKey: "clubId",
});

member.hasMany(attendance, {
  foreignKey: "memberId",
});

// asociations btwn club, member and attendance
club.hasMany(member, {
  foreignKey: "clubId",
});

club.hasMany(attendance, {
  foreignKey: "clubId",
});

// associations between attendance, member and club
attendance.belongsTo(member, {
  foreignKey: "memberId",
});

attendance.belongsTo(club, {
  foreignKey: "clubId",
});

database.member = member;
database.club = club;
database.attendance = attendance;

database.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync completed");
});

module.exports = database;
