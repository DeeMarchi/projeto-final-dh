/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Comentario = sequelize.define('Comentario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: true
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
        likes: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'comentario',
        timestamps: false,
    });

    return Comentario;
};
