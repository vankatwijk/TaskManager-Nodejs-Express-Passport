'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('Tasks', {
        TaskID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Subject: DataTypes.STRING,
        Description: DataTypes.BLOB,
        Status: DataTypes.STRING,
        type: DataTypes.STRING,
        Asignee: DataTypes.INTEGER,
        RelatedTo: DataTypes.INTEGER,
        CreatedByAdmin: DataTypes.INTEGER,
        CreatedByClient: DataTypes.INTEGER,
        AdditionalInfo: DataTypes.STRING
    }, {});
    Tasks.associate = function (models) {
        // associations can be defined here
    };
    return Tasks;
};
