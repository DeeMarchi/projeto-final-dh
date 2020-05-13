/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Estilo = sequelize.define('Estilo', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'nome'
        }
    }, {
        freezeTableName: true,
        tableName: 'estilo',
        timestamps: false,
    });

    return Estilo;
};
