/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const ImagemRoteiro = sequelize.define('ImagemRoteiro', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        roteiro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: DataTypes.TEXT,
    }, {
        freezeTableName: true,
        tableName: 'imagem_roteiro',
        timestamps: false,
    });

    return ImagemRoteiro;
};
