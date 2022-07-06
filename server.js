const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

//const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

//middleware
app.use(cors(corsOptions));
//app.use("/api/checkout");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/performer.routes")(app);
require("./app/routes/performance.routes")(app);
require("./app/routes/theater.routes")(app);
require("./app/routes/theaterHall.routes")(app);
require("./app/routes/seat.routes")(app);
require("./app/routes/reservation.routes")(app);
require("./app/routes/ticket.routes")(app);
require("./app/routes/stripe.routes")(app);

//database
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

//testing api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Web Shop Theater application." });
});

//port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("yes re-sync done!");
  initial();
}); 

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "staff",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}*/
