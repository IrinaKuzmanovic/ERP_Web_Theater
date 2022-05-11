const performanceController = require("../controllers/performance.controller.js");

module.exports = function (app) {
  app.post("/api/performance", performanceController.addPerformance);
  app.get("/api/performance", performanceController.getAllPerformances);
  app.get("/api/performance/:id", performanceController.getOnePerformance);
  app.put("/api/performance/:id", performanceController.updatePerformance);
  app.delete("/api/performance/:id", performanceController.deletePerformance);

  //Get performers of theatrical performances and in which theaters
  app.get(
    "/api/allAboutPerformances/:id",
    performanceController.getPerformance
  );
};
