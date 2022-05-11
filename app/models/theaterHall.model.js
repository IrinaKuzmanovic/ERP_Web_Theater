module.exports = (sequelize, DataTypes) => {
  const TheaterHall = sequelize.define("theaterHall", {
    numberOfHall: {
      type: DataTypes.INTEGER,
    },
  });
  return TheaterHall;
};
