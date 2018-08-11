module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});

  Tag.associate = function (models) {
    models.Tag.belongsToMany(models.Task, { through: 'TaskTags  ' });
  };
  return Tag;
};
