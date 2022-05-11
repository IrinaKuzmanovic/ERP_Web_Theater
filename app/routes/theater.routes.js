const theaterController = require("../controllers/theater.controller.js");

module.exports = function (app) {
  app.post("/api/theater", theaterController.addTheater);
  app.get("/api/theater", theaterController.getAllTheaters);
  app.get("/api/theater/:id", theaterController.getOneTheater);
  app.put("/api/theater/:id", theaterController.updateTheater);
  app.delete("/api/theater/:id", theaterController.deleteTheater);
};
