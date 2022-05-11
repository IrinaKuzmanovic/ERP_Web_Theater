const db = require("../models");
const Op = db.Sequelize.Op;

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

// 2.Get all genre and pagination
const getAllGenre = async (req, res) => {
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
  let genres = await Genre.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: genres.rows,
    totalPages: Math.ceil(genres.count / Number.parseInt(size)),
  });
};

// 3.Get single genre
// Connect one to many relation Performance and Genre
const getOneGenre = async (req, res) => {
  let id = req.params.id;
  let genres = await Genre.findOne({
    include: [
      {
        model: Performance,
        as: "performance",
      },
    ],
    where: { id: id },
  });
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

module.exports = {
  addGenre,
  getAllGenre,
  getOneGenre,
  updateGenre,
  deleteGenre,
};
