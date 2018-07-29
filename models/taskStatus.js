module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: DataTypes.STRING,
  }, {});
  return TaskStatus;
};
