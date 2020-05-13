/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Dia = sequelize.define('Dia', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        resumo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        gasto: {
            type: "DOUBLE",
            allowNull: false
        },
        moeda_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'moeda',
                key: 'id'
            }
        },
        roteiro_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'roteiro',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'dia',
        timestamps: false,
    });

    return Dia;
};
