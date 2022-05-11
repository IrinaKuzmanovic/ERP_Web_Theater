const db = require("../models");

// Create main model
const TheaterHall = db.theaterHall;
const Seat = db.seat;

// 1.Create theater hall
// POST api/theaterHall
//  {
//    "numberOfHall":1
//  }
const addTheaterHall = async (req, res) => {
  let info = {
    numberOfHall: req.body.numberOfHall,
  };

  const theaterHall = await TheaterHall.create(info);
  res.status(200).send(theaterHall);
  console.log(theaterHall);
};

// 2.Get all  theater hall
const getAllTheaterHalls = async (req, res) => {
  let theaterHall = await TheaterHall.findAll({});
  res.status(200).send(theaterHall);
};

// 3.Get single theater hall
const getOneTheaterHall = async (req, res) => {
  let id = req.params.id;
  let theaterHall = await TheaterHall.findOne({ where: { id: id } });
  res.status(200).send(theaterHall);
};

// 4.Update theater hall
//PUT api/theaterHall/:id
//  {
//    "numberOfHall":2,
//    "createdAt": "2022-05-11T18:14:17.000Z",
//    "updatedAt": "2022-05-11T18:14:17.000Z"
//  }
const updateTheaterHall = async (req, res) => {
  let id = req.params.id;
  const theaterHall = await TheaterHall.update(req.body, { where: { id: id } });
  res.status(200).send(theaterHall);
  console.log(theaterHall);
};

// 5.Delete theater hall
const deleteTheaterHall = async (req, res) => {
  let id = req.params.id;
  await TheaterHall.destroy({ where: { id: id } });
  res.status(200).send(`Theater hall with id ${id} is deleted!`);
};

// Connect one to many relation theater hall and seat
const getTheaterHall = async (req, res) => {
  let id = req.params.id;

  const data = await TheaterHall.findAll({
    include: [
      {
        model: Seat,
        as: "seat",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

module.exports = {
  addTheaterHall,
  getAllTheaterHalls,
  getOneTheaterHall,
  updateTheaterHall,
  deleteTheaterHall,
  getTheaterHall,
};
