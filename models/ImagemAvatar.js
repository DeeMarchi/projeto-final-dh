/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const ImagemAvatar = sequelize.define('ImagemAvatar', {
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
        url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'imagem_avatar',
        timestamps: false,
    });

    return ImagemAvatar;
};
