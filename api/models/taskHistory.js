'use strict';
module.exports = (sequelize, DataTypes) => {
    const TaskHistory = sequelize.define('TaskHistory', {
        TaskHistoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TaskID: DataTypes.STRING,
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
    TaskHistory.associate = function (models) {
        // associations can be defined here
    };
    return TaskHistory;
};
