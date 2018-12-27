'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserHistory = sequelize.define('UserHistory', {
        UserHistoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        TimeStamp: DataTypes.DATE,
        Email: DataTypes.STRING,
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        Address: DataTypes.STRING,
        DateOfBirth: DataTypes.DATE,
        PostalCode: DataTypes.STRING,
        KYC: DataTypes.STRING,
        AgentAccount: DataTypes.STRING
    }, {});
    UserHistory.associate = function (models) {
        // associations can be defined here
    };
    return UserHistory;
};
