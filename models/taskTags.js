module.exports = (sequelize, DataTypes) => {
  const TaskTags = sequelize.define('TaskTags', {
    taskId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Tags',
        key: 'id',
      },
    },
  });

  return TaskTags;
};
