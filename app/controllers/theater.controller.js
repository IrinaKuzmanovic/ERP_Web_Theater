const db = require("../models");

// Create main model
const Theater = db.theater;

// 1.Create theater
// POST api/theater
//  {
//    "id": 1,
//    "performanceId": 1,
//    "theaterName": "Novosadsko pozoriste",
//    "address": "Jovana Subotica 3-5",
//    "phoneNumber": "0688888885",
//    "city": "Novi Sad",
//    "updatedAt": "2022-05-11T18:08:59.169Z",
//    "createdAt": "2022-05-11T18:08:59.169Z"
//   }
const addTheater = async (req, res) => {
  let info = {
    performanceId: req.body.performanceId,
    theaterName: req.body.theaterName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
  };

  const theater = await Theater.create(info);
  res.status(200).send(theater);
  console.log(theater);
};

// 2.Get all theater
const getAllTheaters = async (req, res) => {
  let theater = await Theater.findAll({});
  res.status(200).send(theater);
};

// 3.Get single theater
const getOneTheater = async (req, res) => {
  let id = req.params.id;
  let theater = await Theater.findOne({ where: { id: id } });
  res.status(200).send(theater);
};

// 4.Update theater
// PUT api/theater/:id
//  {
//     "theaterName": "Srpsko narodno pozoriste",
//     "address": "Pozorisni trg 1",
//     "phoneNumber": "068365214",
//     "city": "Novi Sad",
//     "createdAt": "2022-05-11T18:10:22.000Z",
//     "updatedAt": "2022-05-11T18:10:22.000Z",
//     "performanceId": 1
//   }
const updateTheater = async (req, res) => {
  let id = req.params.id;
  const theater = await Theater.update(req.body, { where: { id: id } });
  res.status(200).send(theater);
  console.log(theater);
};

// 5.Delete theater
const deleteTheater = async (req, res) => {
  let id = req.params.id;
  await Theater.destroy({ where: { id: id } });
  res.status(200).send(`Theater  with id ${id} is deleted!`);
};

module.exports = {
  addTheater,
  getAllTheaters,
  getOneTheater,
  updateTheater,
  deleteTheater,
};
