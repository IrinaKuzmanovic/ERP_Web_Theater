/* const db = require("../models");

//create main model
const User = db.user;

const Reservation = db.reservation;

const getUser = async (req, res) => {
  let id = req.params.id;

  const data = await User.findAll({
    include: [
      {
        model: Reservation,
        as: "reservation",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

module.exports = { getUser }; */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.staffBoard = (req, res) => {
  res.status(200).send("Staff Content.");
};
