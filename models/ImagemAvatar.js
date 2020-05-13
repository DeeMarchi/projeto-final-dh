/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const ImagemAvatar = sequelize.define('ImagemAvatar', {
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
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'url'
        }
    }, {
        freezeTableName: true,
        tableName: 'imagem_avatar',
        timestamps: false,
    });

    return ImagemAvatar;
};
