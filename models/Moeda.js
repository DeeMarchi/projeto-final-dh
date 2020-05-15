/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Moeda = sequelize.define('Moeda', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        simbolo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'moeda',
        timestamps: false,
    });

    return Moeda;
};
