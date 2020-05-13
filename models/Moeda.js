/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Moeda = sequelize.define('Moeda', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        simbolo: {
            type: DataTypes.STRING(3),
            allowNull: true,
            field: 'simbolo'
        },
        nome: {
            type: DataTypes.STRING(80),
            allowNull: true,
            field: 'nome'
        }
    }, {
        freezeTableName: true,
        tableName: 'moeda',
        timestamps: false,
    });

    return Moeda;
};
