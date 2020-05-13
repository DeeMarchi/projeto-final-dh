/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Moeda = sequelize.define('Moeda', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        simbolo: {
            type: DataTypes.STRING(3),
            allowNull: true
        },
        nome: {
            type: DataTypes.STRING(80),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'moeda',
        timestamps: false,
    });

    return Moeda;
};
