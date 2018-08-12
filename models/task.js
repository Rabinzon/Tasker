module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.User, {
      as: 'creator',
      foreignKey: {
        allowNull: false,
      },
    });
    models.Task.belongsTo(models.User, { as: 'assignedTo' });
    models.Task.belongsTo(models.TaskStatus, {
      as: 'status',
      foreignKey: {
        allowNull: false,
      },
    });
    models.Task.belongsToMany(models.Tag, { through: 'TaskTags', foreignKey: 'taskId', otherKey: 'tagId' });
  };

  return Task;
};
