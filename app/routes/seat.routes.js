const seatController = require("../controllers/seat.controller.js");

module.exports = function (app) {
  app.post("/api/seat", seatController.addSeat);
  app.get("/api/seat", seatController.getAllSeats);
  app.get("/api/seat/:id", seatController.getOneSeat);
  app.put("/api/seat/:id", seatController.updateSeat);
  app.delete("api/seat/:id", seatController.deleteSeat);
};
