'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserNotes = sequelize.define('UserNotes', {
        UserNotesID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        TimeStamp: DataTypes.STRING,
        Note: DataTypes.BLOB
    }, {});
    UserNotes.associate = function (models) {
        // associations can be defined here
    };
    return UserNotes;
};
