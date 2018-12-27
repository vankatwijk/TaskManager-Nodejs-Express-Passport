'use strict';
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('Roles', {
        RoleID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        RoleLock: DataTypes.STRING,
        AssignedOnly: DataTypes.STRING
    }, {});
    Roles.associate = function (models) {
        // associations can be defined here
    };
    return Roles;
};
