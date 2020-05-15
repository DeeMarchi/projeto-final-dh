/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagem_url: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
    }, {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps: false,
    });

    return Usuario;
};
