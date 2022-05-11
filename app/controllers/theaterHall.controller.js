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
  let theaterHall = await TheaterHall.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: theaterHall.rows,
    totalPages: Math.ceil(theaterHall.count / Number.parseInt(size)),
  });
};

// 3.Get single theater hall
// Connect one to many relation theater hall and seat
const getOneTheaterHall = async (req, res) => {
  let id = req.params.id;
  let theaterHall = await TheaterHall.findOne({
    include: [
      {
        model: Seat,
        as: "seat",
      },
    ],
    where: { id: id },
  });
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

module.exports = {
  addTheaterHall,
  getAllTheaterHalls,
  getOneTheaterHall,
  updateTheaterHall,
  deleteTheaterHall,
};
