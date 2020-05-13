/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const CurtidaComentario = sequelize.define('CurtidaComentario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        comentarioId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'comentario',
                key: 'id'
            },
            field: 'comentario_id'
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
        tableName: 'curtida_comentario',
        timestamps: false,
    });

    return CurtidaComentario;
};
