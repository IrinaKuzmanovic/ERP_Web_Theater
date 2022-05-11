const ticketController = require("../controllers/ticket.controller.js");

module.exports = function (app) {
  app.post("/api/ticket", ticketController.addTicket);
  app.get("/api/ticket", ticketController.getAllTickets);
  app.get("/api/ticket/:id", ticketController.getOneTicket);
  app.put("/api/ticket/:id", ticketController.updateTicket);
  app.delete("/api/ticket/:id", ticketController.deleteTicket);
};
