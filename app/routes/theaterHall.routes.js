const theaterHallController = require("../controllers/theaterHall.controller.js");

module.exports = function (app) {
  app.post("/api/theaterHall", theaterHallController.addTheaterHall);
  app.get("/api/theaterHall", theaterHallController.getAllTheaterHalls);
  app.get("/api/theaterHall/:id", theaterHallController.getOneTheaterHall);
  app.put("/api/theaterHall/:id", theaterHallController.updateTheaterHall);
  app.delete("/api/theaterHall/:id", theaterHallController.deleteTheaterHall);

  //Get seats of theater hall
  app.get("/api/allAboutTheaterHall/:id", theaterHallController.getTheaterHall);
};
