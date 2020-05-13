/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const ImagemRoteiro = sequelize.define('ImagemRoteiro', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        roteiro_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'roteiro',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'imagem_roteiro',
        timestamps: false,
    });

    return ImagemRoteiro;
};
