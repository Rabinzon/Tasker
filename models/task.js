module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING(1000),
  });

  Task.associate = (models) => {
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
    models.Task.belongsToMany(
      models.Tag,
      { through: 'TaskTags', foreignKey: 'taskId', otherKey: 'tagId' },
    );
  };

  Task.loadScopes = (models) => {
    Task.addScope('default', tagQuery => ({
      include: [
        {
          model: models.User,
          as: 'creator',
        }, {
          model: models.User,
          as: 'assignedTo',
        }, {
          model: models.TaskStatus,
          as: 'status',
        }, {
          model: models.Tag,
          where: tagQuery,
        },
      ],
    }));
  };

  return Task;
};
