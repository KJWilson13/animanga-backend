'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      list_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Lists',
          key: 'list_id'
        }
      },
      image: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.STRING
      },
      isWatched: {
        type: Sequelize.BOOLEAN
      },
      rating: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animes');
  }
};