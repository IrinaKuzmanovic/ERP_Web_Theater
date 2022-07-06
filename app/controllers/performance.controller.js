const db = require("../models");
const Op = db.Sequelize.Op;

// Create main Model
const Performance = db.performance;
const Performer = db.performer;
const Theater = db.theater;
const Reservation = db.reservation;
const Ticket = db.ticket;

// 1.Create performance
// POST api/performance
//  {
//     "id": 1,
//     "genreId": 1,
//     "performanceName": "Bura",
//     "dateOfThePerformance": "2021-10-17T13:40:10.000Z",
//     "updatedAt": "2022-05-11T18:00:29.830Z",
//     "createdAt": "2022-05-11T18:00:29.830Z"
//   }
const addPerformance = async (req, res) => {
  let data = {
    genreId: req.body.genreId,
    performanceName: req.body.performanceName,
    dateOfThePerformance: req.body.dateOfThePerformance,
  };

  const performance = await Performance.create(data);
  res.status(200).send(performance);
  console.log(performance);
};

// 2.Get all performances
// Connect one to many relation Performance and Performer
const getAllPerformances = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const performanceName = String(req.query.performanceName);
  /*  var condition = performanceName
    ? { performanceName: { [Op.like]: `%${performanceName}%` } }
    : null; */

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

  let performances = await Performance.findAndCountAll({
    //where: { condition },
    order: [["performanceName", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: performances.rows,
    totalPages: Math.ceil(performances.count / Number.parseInt(size)),
  });
};

// 3.Get single performance
const getOnePerformance = async (req, res) => {
  let id = req.params.id;
  let performance = await Performance.findOne({
    include: [
      {
        model: Performer,
        as: "performer",
      },
      {
        model: Theater,
        as: "theater",
      },
      {
        model: Reservation,
        as: "reservation",
      },
      {
        model: Ticket,
        as: "ticket",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(performance);
};

// 4.Update performance
// PUT api/performance/:id
//  {
//    "performanceName": "Labudovo jezero",
//    "dateOfThePerformance": "2021-10-17T13:40:10.000Z",
//    "createdAt": "2022-05-11T18:02:52.000Z",
//    "updatedAt": "2022-05-11T18:02:52.000Z",
//    "genreId": 1
//   }
const updatePerformance = async (req, res) => {
  let id = req.params.id;
  const performance = await Performance.update(req.body, { where: { id: id } });
  res.status(200).send(performance);
  console.log(performance);
};

// 5.Delete performance
const deletePerformance = async (req, res) => {
  let id = req.params.id;
  await Performance.destroy({ where: { id: id } });
  res.status(200).send(`Performance  with id ${id} is deleted!`);
};

module.exports = {
  addPerformance,
  getAllPerformances,
  getOnePerformance,
  updatePerformance,
  deletePerformance,
};
