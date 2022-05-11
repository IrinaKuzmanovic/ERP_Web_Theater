module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("ticket", {
    ticketPrice: {
      type: DataTypes.INTEGER,
    },
    availability: {
      type: DataTypes.BOOLEAN,
    },
    ticketNumber: {
      type: DataTypes.INTEGER,
    },
  });
  return Ticket;
};
