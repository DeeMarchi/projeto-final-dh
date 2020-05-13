/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Roteiro = sequelize.define('Roteiro', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
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
        estiloId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'estilo',
                key: 'id'
            },
            field: 'estilo_id'
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'titulo'
        },
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_inicio'
        },
        dataCriacao: {
            type: DataTypes.DATE,
            allowNull: true,
            unique: true,
            field: 'data_criacao'
        },
        qntdDias: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'qntd_dias'
        },
        descricao: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            field: 'descricao'
        },
        likes: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'likes'
        }
    }, {
        freezeTableName: true,
        tableName: 'roteiro',
        timestamps: false,
    });

    return Roteiro;
};
