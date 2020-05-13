/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'nome'
        },
        usuario: {
            type: DataTypes.STRING(35),
            allowNull: false,
            field: 'usuario'
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'email'
        },
        senha: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'senha'
        }
    }, {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps: false,
    });

    return Usuario;
};
