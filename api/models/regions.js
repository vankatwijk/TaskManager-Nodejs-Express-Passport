'use strict';
module.exports = (sequelize, DataTypes) => {
    const Regions = sequelize.define('Regions', {
        RegionID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: DataTypes.STRING
    }, {});
    Regions.associate = function (models) {
        // associations can be defined here
    };
    return Regions;
};
