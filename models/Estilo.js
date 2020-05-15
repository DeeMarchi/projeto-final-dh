/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Estilo = sequelize.define('Estilo', {
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
    }, {
        freezeTableName: true,
        tableName: 'estilo',
        timestamps: false,
    });

    return Estilo;
};
