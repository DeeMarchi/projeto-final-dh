/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Dia = sequelize.define('Dia', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        resumo: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'resumo'
        },
        gasto: {
            type: "DOUBLE",
            allowNull: false,
            field: 'gasto'
        },
        moedaId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'moeda',
                key: 'id'
            },
            field: 'moeda_id'
        },
        roteiroId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'roteiro',
                key: 'id'
            },
            field: 'roteiro_id'
        }
    }, {
        freezeTableName: true,
        tableName: 'dia',
        timestamps: false,
    });

    return Dia;
};
