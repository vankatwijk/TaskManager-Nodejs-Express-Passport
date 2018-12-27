'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    UserID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    PasswordHash: DataTypes.STRING,
    Email: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Address: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    PostalCode: DataTypes.STRING,
    KYC: DataTypes.STRING,
    AgentAccount: DataTypes.STRING,
    IsAdmin: DataTypes.BOOLEAN,
    LastLoggedAt:DataTypes.DATE
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
