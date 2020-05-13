/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        usuario: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps: false,
    });

    return Usuario;
};
