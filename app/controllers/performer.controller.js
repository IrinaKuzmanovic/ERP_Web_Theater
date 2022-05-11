const db = require("../models");

// Create main model
const Performer = db.performer;

// 1.Create performer
// POST api/performer
//  {
//    "firstNamePerformer":"Johnny",
//    "lastNamePerformer":"Depp",
//    "performanceId":1
//   }
const addPerformer = async (req, res) => {
  let info = {
    performanceId: req.body.performanceId,
    firstNamePerformer: req.body.firstNamePerformer,
    lastNamePerformer: req.body.lastNamePerformer,
  };

  const performer = await Performer.create(info);
  res.status(200).send(performer);
  console.log(performer);
};

// 2.Get all performers
const getAllPerformers = async (req, res) => {
  let performers = await Performer.findAll({});
  res.status(200).send(performers);
};

// 3.Get single performer
const getOnePerformer = async (req, res) => {
  let id = req.params.id;
  let performer = await Performer.findOne({ where: { id: id } });
  res.status(200).send(performer);
};

// 4.Update performer
// PUT api/performer/:id
//  {
//    "firstNamePerformer": "Sandra",
//    "lastNamePerformer": "Bullock",
//    "createdAt": "2022-05-11T18:07:00.000Z",
//    "updatedAt": "2022-05-11T18:07:00.000Z",
//    "performanceId": 1
//   }
const updatePerformer = async (req, res) => {
  let id = req.params.id;
  const performer = await Performer.update(req.body, { where: { id: id } });
  res.status(200).send(performer);
  console.log(performer);
};

// 5.Delete performer
const deletePerformer = async (req, res) => {
  let id = req.params.id;
  await Performer.destroy({ where: { id: id } });
  res.status(200).send(`Performer  with id ${id} is deleted!`);
};

module.exports = {
  addPerformer,
  getAllPerformers,
  getOnePerformer,
  updatePerformer,
  deletePerformer,
};
