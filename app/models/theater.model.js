module.exports = (sequelize, DataTypes) => {
  const Theater = sequelize.define("theater", {
    theaterName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  });
  return Theater;
};
