'use strict';

module.exports = (sequelize, DataTypes) => {
    const session = sequelize.define('sessions', {
        refreshToken: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
    });

    session.associate = function (models) {
        //
    };

    return session;
};
