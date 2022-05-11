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
  let reservation = await Reservation.findAll({});
  res.status(200).send(reservation);
};

// 3.Get single reservation
const getOneReservation = async (req, res) => {
  let id = req.params.id;
  let reservation = await Reservation.findOne({ where: { id: id } });
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

// Connect one to many relation reservation and seat
const getReservation = async (req, res) => {
  let id = req.params.id;

  const data = await Reservation.findAll({
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
  res.status(200).send(data);
};

module.exports = {
  addReservation,
  getAllReservation,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getReservation,
};
