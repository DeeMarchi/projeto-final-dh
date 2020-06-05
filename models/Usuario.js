/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        apelido: {
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
            defaultValue: '/icones/componentes/usuario/user.svg',
            allowNull: false,
        },
        resumo: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
    }, {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps: false,
    });

    Usuario.associate = models => {
        Usuario.hasMany(models.Roteiro, {
            foreignKey: 'usuario_id',
            as: 'roteiro',
        });
    };

    return Usuario;
};
