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
    LastLoggedAt:DataTypes.DATE
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
