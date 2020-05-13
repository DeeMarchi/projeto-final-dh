/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Estilo = sequelize.define('Estilo', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'estilo',
        timestamps: false,
    });

    return Estilo;
};
