'use strict';
module.exports = (sequelize, DataTypes) => {
    const AdminRegionRoles = sequelize.define('AdminRegionRoles', {
        AdminRegionRoleID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AdminID: DataTypes.INTEGER,
        RegionID: DataTypes.INTEGER,
        RoleID: DataTypes.INTEGER
    }, {});
    AdminRegionRoles.associate = function (models) {
        // associations can be defined here
    };
    return AdminRegionRoles;
};
