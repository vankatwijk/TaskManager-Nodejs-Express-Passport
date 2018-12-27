'use strict';
module.exports = (sequelize, DataTypes) => {
    const AdditionalInfo = sequelize.define('AdditionalInfo', {
        AdditionalInfoID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: DataTypes.INTEGER,
        CountryIP: DataTypes.STRING,
        CityIP: DataTypes.STRING,
        Referer: DataTypes.STRING,
        Country: DataTypes.STRING,
        URLKeyword: DataTypes.STRING,
        GeoLocation: DataTypes.STRING
    }, {});
    AdditionalInfo.associate = function (models) {
        // associations can be defined here
    };
    return AdditionalInfo;
};
