const db = require("../models");

//Create main Model
const Reservation = db.reservation;
const Seat = db.seat;
const Ticket = db.ticket;

//1.Create reservation
// POST api/reservation
// {
//   "numberOfTickets":2,
//   "dateOfReservation":"2022-10-17 15:40:10",
//   "performanceId":1
//  }
const addReservation = async (req, res) => {
  let data = {
    performanceId: req.body.performanceId,
    numberOfTickets: req.body.numberOfTickets,
    dateOfReservation: req.body.dateOfReservation,
  };

  const reservation = await Reservation.create(data);
  res.status(200).send(reservation);
  console.log(reservation);
};

// 2.Get all reservation
const getAllReservation = async (req, res) => {
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
  let reservation = await Reservation.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: reservation.rows,
    totalPages: Math.ceil(reservation.count / Number.parseInt(size)),
  });
};

// 3.Get single reservation
// Connect one to many relation reservation and seat
const getOneReservation = async (req, res) => {
  let id = req.params.id;
  let reservation = await Reservation.findOne({
    include: [
      {
        model: Seat,
        as: "seat",
      },
      {
        model: Ticket,
        as: "ticket",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(reservation);
};

// 4.Update reservation
// PUT api/reservation/:id
//  {
//    "numberOfTickets": 4,
//    "dateOfReservation": "2022-10-17T13:40:10.000Z",
//    "createdAt": "2022-05-11T18:27:46.000Z",
//    "updatedAt": "2022-05-11T18:27:46.000Z",
//    "performanceId": 2
//   }
const updateReservation = async (req, res) => {
  let id = req.params.id;
  const reservation = await Reservation.update(req.body, { where: { id: id } });
  res.status(200).send(reservation);
  console.log(reservation);
};

// 5.Delete reservation
const deleteReservation = async (req, res) => {
  let id = req.params.id;
  await Reservation.destroy({ where: { id: id } });
  res.status(200).send(`Reservation  with id ${id} is deleted!`);
};

module.exports = {
  addReservation,
  getAllReservation,
  getOneReservation,
  updateReservation,
  deleteReservation,
};
