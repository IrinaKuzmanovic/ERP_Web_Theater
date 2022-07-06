const config = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");
const { DB } = require("../config/db.config.js");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected..");
  })
  .catch((err) => {
    console.log("Error " + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.genre = require("../models/genre.model.js")(sequelize, DataTypes);
db.performer = require("../models/performer.model.js")(sequelize, DataTypes);
db.performance = require("../models/performance.model.js")(
  sequelize,
  DataTypes
);
db.theater = require("../models/theater.model.js")(sequelize, DataTypes);
db.theaterHall = require("../models/theaterHall.model.js")(
  sequelize,
  DataTypes
);
db.seat = require("../models/seat.model.js")(sequelize, DataTypes);
db.reservation = require("../models/reservation.model.js")(
  sequelize,
  DataTypes
);
db.ticket = require("../models/ticket.model.js")(sequelize, DataTypes);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.reservation = require("../models/reservation.model.js")(
  sequelize,
  DataTypes
);

//one to many relation between performance and performer
db.performance.hasMany(db.performer, {
  foreignKey: "performanceId",
  as: "performer",
});

db.performer.belongsTo(db.performance, {
  foreignKey: "performanceId",
  as: "performance",
});

//one to many relation between performance and genre
db.genre.hasMany(db.performance, {
  foreignKey: "genreId",
  as: "performance",
});

db.performance.belongsTo(db.genre, {
  foreignKey: "genreId",
  as: "genre",
});

//one to many relation between performance and theater
db.performance.hasMany(db.theater, {
  foreignKey: "performanceId",
  as: "theater",
});

db.theater.belongsTo(db.performance, {
  foreignKey: "performanceId",
  as: "performance",
});
//one to many relation between performance and ticket
db.performance.hasMany(db.ticket, {
  foreignKey: "performanceId",
  as: "ticket",
});

db.ticket.belongsTo(db.performance, {
  foreignKey: "performanceId",
  as: "performance",
});
//one to many relation between theater hall and seat
db.theaterHall.hasMany(db.seat, {
  foreignKey: "theaterHallId",
  as: "seat",
});

db.seat.belongsTo(db.theaterHall, {
  foreignKey: "theaterHallId",
  as: "theaterHall",
});

//one to many relation between reservation and seat
db.reservation.hasMany(db.seat, {
  foreignKey: "reservationId",
  as: "seat",
});

db.seat.belongsTo(db.reservation, {
  foreignKey: "reservationId",
  as: "reservation",
});

//one to many relation between reservation and ticket
db.reservation.hasMany(db.ticket, {
  foreignKey: "reservationId",
  as: "ticket",
});

db.ticket.belongsTo(db.reservation, {
  foreignKey: "reservationId",
  as: "reservation",
});

//one to many relation between performance and reservation
db.performance.hasMany(db.reservation, {
  foreignKey: "performanceId",
  as: "reservation",
});

db.reservation.belongsTo(db.performance, {
  foreignKey: "performanceId",
  as: "performance",
});

//one to many relation between user and reservation
db.user.hasMany(db.reservation, {
  foreignKey: "userId",
  as: "reservation",
});

db.reservation.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

//meny to many relation between user and role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

//Database
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

db.ROLES = ["user", "admin", "staff"];

module.exports = db;
