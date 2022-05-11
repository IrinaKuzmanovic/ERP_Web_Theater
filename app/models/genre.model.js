module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("genre", {
    nameGenre: {
      type: DataTypes.STRING,
    },
  });
  return Genre;
};
