const performerController = require("../controllers/performer.controller.js");

module.exports = function (app) {
  app.post("/api/performer", performerController.addPerformer);
  app.get("/api/performers", performerController.getAllPerformers);
  app.get("/api/performer/:id", performerController.getOnePerformer);
  app.put("/api/performer/:id", performerController.updatePerformer);
  app.delete("/api/performer/:id", performerController.deletePerformer);
};
