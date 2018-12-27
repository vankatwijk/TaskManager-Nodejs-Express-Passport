'use strict';
module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define('Accounts', {
        AccountID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        TradingPlatform: DataTypes.STRING,
        AccountNumber: DataTypes.STRING
    }, {});
    Accounts.associate = function (models) {
        // associations can be defined here
    };
    return Accounts;
};
