/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Roteiro = sequelize.define('Roteiro', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        usuario_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id'
            }
        },
        estilo_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'estilo',
                key: 'id'
            }
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        data_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        data_criacao: {
            type: DataTypes.DATE,
            allowNull: true,
            unique: true
        },
        qntd_dias: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        descricao: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'roteiro',
        timestamps: false,
    });

    return Roteiro;
};
