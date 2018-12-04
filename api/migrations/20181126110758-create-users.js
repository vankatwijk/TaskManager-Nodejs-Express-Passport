'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      UserID:{
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      passwordHash: Sequelize.STRING,
      Email: Sequelize.STRING,
      CreatedAt:Sequelize.DATE,
      UpdatedAt:Sequelize.DATE,
      LastLoggedAt:Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
