/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Local = sequelize.define('Local', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dia_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'local',
        timestamps: false,
    });

    return Local;
};
