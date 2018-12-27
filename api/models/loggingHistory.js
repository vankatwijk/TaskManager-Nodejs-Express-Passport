'use strict';
module.exports = (sequelize, DataTypes) => {
    const LoggingHistory = sequelize.define('LoggingHistory', {
        LoggingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        TimeStamp: DataTypes.DATE,
        IPAddress: DataTypes.STRING,
        GeoLocation: DataTypes.STRING
    }, {});
    LoggingHistory.associate = function (models) {
        // associations can be defined here
    };
    return LoggingHistory;
};
