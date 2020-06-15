/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const CurtidaComentario = sequelize.define('CurtidaComentario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        comentario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: DataTypes.DATE,
    }, {
        freezeTableName: true,
        tableName: 'curtida_comentario',
        timestamps: false,
    });


    return CurtidaComentario;
};
