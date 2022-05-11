module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("reservation", {
    numberOfTickets: {
      type: DataTypes.INTEGER,
    },
    dateOfReservation: {
      type: DataTypes.DATE,
    },
  });
  return Reservation;
};
