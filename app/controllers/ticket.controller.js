const db = require("../models");

// Create main model
const Ticket = db.ticket;

// 1.Create ticket
// POST api/ticket
//  {
//    "ticketPrice":500,
//    "availability":true,
//    "ticketNumber":200,
//    "reservationId":1
//  }
const addTicket = async (req, res) => {
  let info = {
    reservationId: req.body.reservationId,
    ticketPrice: req.body.ticketPrice,
    availability: req.body.availability,
    ticketNumber: req.body.ticketNumber,
  };

  const ticket = await Ticket.create(info);
  res.status(200).send(ticket);
  console.log(ticket);
};

// 2.Get all tickets
const getAllTickets = async (req, res) => {
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
  let ticket = await Ticket.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: ticket.rows,
    totalPages: Math.ceil(ticket.count / Number.parseInt(size)),
  });
};

// 3.Get single ticket
const getOneTicket = async (req, res) => {
  let id = req.params.id;
  let ticket = await Ticket.findOne({ where: { id: id } });
  res.status(200).send(ticket);
};

// 4.Update ticket
//  {
//    "reservationId": 1,
//    "ticketPrice": 200,
//    "availability": true,
//    "ticketNumber": 200,
//    "updatedAt": "2022-05-11T18:30:50.169Z",
//    "createdAt": "2022-05-11T18:30:50.169Z"
//   }
const updateTicket = async (req, res) => {
  let id = req.params.id;
  const ticket = await Ticket.update(req.body, { where: { id: id } });
  res.status(200).send(ticket);
  console.log(ticket);
};

// 5.Delete ticket
const deleteTicket = async (req, res) => {
  let id = req.params.id;
  await Ticket.destroy({ where: { id: id } });
  res.status(200).send(`Ticket  with id ${id} is deleted!`);
};

module.exports = {
  addTicket,
  getAllTickets,
  getOneTicket,
  updateTicket,
  deleteTicket,
};
