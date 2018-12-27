'use strict';
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        AutoApproveLive: DataTypes.STRING,
        AutoApproveDemo: DataTypes.STRING,
        AutoApproveIB: DataTypes.STRING,
        FundWithOutKYC: DataTypes.STRING
    }, {});
    Company.associate = function (models) {
        // associations can be defined here
    };
    return Company;
};
