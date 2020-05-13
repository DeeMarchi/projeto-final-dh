/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Curtida = sequelize.define('Curtida', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        roteiro_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'roteiro',
                key: 'id'
            }
        },
        usuario_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id'
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'curtida',
        timestamps: false,
    });

    return Curtida;
};
