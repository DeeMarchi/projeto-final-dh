/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Curtida = sequelize.define('Curtida', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        roteiroId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'roteiro',
                key: 'id'
            },
            field: 'roteiro_id'
        },
        usuarioId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id'
            },
            field: 'usuario_id'
        },
        data: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'data'
        }
    }, {
        freezeTableName: true,
        tableName: 'curtida',
        timestamps: false,
    });

    return Curtida;
};
