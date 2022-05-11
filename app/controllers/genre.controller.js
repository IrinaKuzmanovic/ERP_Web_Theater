const db = require("../models");

//Create main Model
const Genre = db.genre;
const Performance = db.performance;

// 1.Create genre
// POST /api/genre
//   {
//     "nameGenre":"KOMEDIJA"
//   }
const addGenre = async (req, res) => {
  let info = {
    nameGenre: req.body.nameGenre,
  };

  const genre = await Genre.create(info);
  res.status(200).send(genre);
  console.log(genre);
};

// 2.Get all genre
const getAllGenre = async (req, res) => {
  let genres = await Genre.findAll({});
  res.status(200).send(genres);
};

// 3.Get single genre
const getOneGenre = async (req, res) => {
  let id = req.params.id;
  let genres = await Genre.findOne({ where: { id: id } });
  res.status(200).send(genres);
};

// 4.Update genre
// PUT api/genre/:id
//  {
//    "nameGenre": "TRAGEDIJA",
//    "updatedAt": "2022-05-11T17:57:54.794Z",
//    "createdAt": "2022-05-11T17:57:54.794Z"
//   }
const updateGenre = async (req, res) => {
  let id = req.params.id;
  const genre = await Genre.update(req.body, { where: { id: id } });
  res.status(200).send(genre);
  console.log(genre);
};

// 5.Delete genre by id
const deleteGenre = async (req, res) => {
  let id = req.params.id;
  await Genre.destroy({ where: { id: id } });
  res.status(200).send(`Genre  with id ${id} is deleted!`);
};

// Connect one to many relation Performance and Genre
const getGenrePerformance = async (req, res) => {
  let id = req.params.id;

  const data = await Genre.findOne({
    include: [
      {
        model: Performance,
        as: "performance",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

module.exports = {
  addGenre,
  getAllGenre,
  getOneGenre,
  updateGenre,
  deleteGenre,
  getGenrePerformance,
};
