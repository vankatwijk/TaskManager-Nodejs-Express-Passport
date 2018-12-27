'use strict';
module.exports = (sequelize, DataTypes) => {
    const Documents = sequelize.define('Documents', {
        DocumentID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        DocName: DataTypes.STRING,
        DocLocation: DataTypes.STRING
    }, {});
    Documents.associate = function (models) {
        // associations can be defined here
    };
    return Documents;
};
