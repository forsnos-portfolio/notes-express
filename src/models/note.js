'use strict';

module.exports = (sequelize, DataTypes) => {
    const note = sequelize.define('notes', {
        guid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        note: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        share: {
            type: DataTypes.STRING(128),
            allowNull: true,
            unique: true
        }
    });

    note.associate = function (models) {
        note.belongsTo(models.user, {
            foreignKey: 'user_id'
        })
    };

    return note;
};
