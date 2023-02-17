module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define("member", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clubId: {
      type: DataTypes.INTEGER,
    },
  });

  return member;
};
