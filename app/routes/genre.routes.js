const genreController = require("../controllers/genre.controller.js");

module.exports = function (app) {
  app.post("/api/genre/addGenre", genreController.addGenre);
  app.get("/api/genre/allGenre", genreController.getAllGenre);
  app.get("/api/genre/:id", genreController.getOneGenre);
  app.put("/api/genre/:id", genreController.updateGenre);
  app.delete("/api/genre/:id", genreController.deleteGenre);

  //Get genres
  app.get("/api/genrePerformances/:id", genreController.getGenrePerformance);
};
