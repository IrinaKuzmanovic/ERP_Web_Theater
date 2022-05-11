const reservationController = require("../controllers/reservation.controller.js");

module.exports = function (app) {
  app.post("/api/reservation", reservationController.addReservation);
  app.get("/api/reservation", reservationController.getAllReservation);
  app.get("/api/reservation/:id", reservationController.getOneReservation);
  app.put("/api/reservation/:id", reservationController.updateReservation);
  app.delete("/api/reservation/:id", reservationController.deleteReservation);

  //Get seats for reservation
  app.get("/api/allAboutReservation/:id", reservationController.getReservation);
};
