module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define("seat", {
    numberOfSeat: {
      type: DataTypes.INTEGER,
    },
    rowNumber: {
      type: DataTypes.INTEGER,
    },
  });
  return Seat;
};
