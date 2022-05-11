module.exports = (sequelize, DataTypes) => {
  const Performance = sequelize.define("performance", {
    performanceName: {
      type: DataTypes.STRING,
    },
    dateOfThePerformance: {
      type: DataTypes.DATE,
    },
  });
  return Performance;
};
