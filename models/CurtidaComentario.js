/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const CurtidaComentario = sequelize.define('CurtidaComentario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        comentario_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'comentario',
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
        tableName: 'curtida_comentario',
        timestamps: false,
    });

    return CurtidaComentario;
};
