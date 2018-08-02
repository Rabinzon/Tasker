import { User } from './index';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    // assignedTo: '',
    // tags: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        this.belongsTo(User, { as: 'creatorId' });
        // this.belongsTo(TaskStatus, { as: 'statusId' });
      },
    },
  });
  return Card;
};
