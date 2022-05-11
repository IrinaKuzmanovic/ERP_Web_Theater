module.exports = (sequelize, DataTypes) => {
  const Performer = sequelize.define("performer", {
    firstNamePerformer: {
      type: DataTypes.STRING,
    },
    lastNamePerformer: {
      type: DataTypes.STRING,
    },
  });
  return Performer;
};
