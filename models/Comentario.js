/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Comentario = sequelize.define('Comentario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'conteudo'
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
        likes: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'likes'
        }
    }, {
        freezeTableName: true,
        tableName: 'comentario',
        timestamps: false,
    });

    return Comentario;
};
