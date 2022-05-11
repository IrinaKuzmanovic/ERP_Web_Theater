const db = require("../models");

//Create main model
const Seat = db.seat;

//1.Create seat
const addSeat = async (req, res) => {
  let info = {
    reservationId: req.body.reservationId,
    theaterHallId: req.body.theaterHallId,
    numberOfSeat: req.body.numberOfSeat,
    rowNumber: req.body.rowNumber,
  };

  const seat = await Seat.create(info);
  res.status(200).send(seat);
  console.log(seat);
};

//2.Get all seats
const getAllSeats = async (req, res) => {
  let seat = await Seat.findAll({});
  res.status(200).send(seat);
};

//3.Get single seat
const getOneSeat = async (req, res) => {
  let id = req.params.id;
  let seat = await Seat.findOne({ where: { id: id } });
  res.status(200).send(seat);
};

//4.Update seat
const updateSeat = async (req, res) => {
  let id = req.params.id;
  const seat = await Seat.update(req.body, { where: { id: id } });
  res.status(200).send(seat);
  console.log(seat);
};

//5.Delete seat
const deleteSeat = async (req, res) => {
  let id = req.params.id;
  await Seat.destroy({ where: { id: id } });
  res.status(200).send(`Seat  with id ${id} is deleted!`);
};

module.exports = {
  addSeat,
  getAllSeats,
  getOneSeat,
  updateSeat,
  deleteSeat,
};
