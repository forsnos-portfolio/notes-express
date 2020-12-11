'use strict';

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        guid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        hashPassword: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    });

    user.associate = () => ({
        // associations can be defined here
    });

    return user;
};
