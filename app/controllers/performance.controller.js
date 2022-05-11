const db = require("../models");

// Create main Model
const Performance = db.performance;
const Performer = db.performer;
const Theater = db.theater;
const Reservation = db.reservation;

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
const getAllPerformances = async (req, res) => {
  let performances = await Performance.findAll({});
  res.status(200).send(performances);
};

// 3.Get single performance
const getOnePerformance = async (req, res) => {
  let id = req.params.id;
  let performance = await Performance.findOne({ where: { id: id } });
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

// Connect one to many relation Performance and Performer
const getPerformance = async (req, res) => {
  let id = req.params.id;

  const data = await Performance.findAll({
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
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

module.exports = {
  addPerformance,
  getAllPerformances,
  getOnePerformance,
  updatePerformance,
  deletePerformance,
  getPerformance,
};
