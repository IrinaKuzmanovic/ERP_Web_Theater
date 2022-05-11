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
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }
  let seat = await Seat.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: seat.rows,
    totalPages: Math.ceil(seat.count / Number.parseInt(size)),
  });
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
