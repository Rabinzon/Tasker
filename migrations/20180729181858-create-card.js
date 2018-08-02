module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cards', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })
    .then(() => queryInterface.addColumn(
      'cards', // name of Target model
      'creatorId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('cards'),
};
