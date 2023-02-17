module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define("attendance", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNUll: false,
    },
    clubId: {
      type: DataTypes.INTEGER,
      allowNUll: false,
    },
    attendedOn: {
      type: DataTypes.DATEONLY,
    },
    attended: {
      type: DataTypes.BOOLEAN,
    },
  });

  return attendance;
};
