/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Comentario = sequelize.define('Comentario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        roteiro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        freezeTableName: true,
        tableName: 'comentario',
        timestamps: false,
    });

    Comentario.associate = models => {
       
        Comentario.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario',
        });
    };

    return Comentario;
};
