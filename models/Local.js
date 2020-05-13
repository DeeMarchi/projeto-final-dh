/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Local = sequelize.define('Local', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        dia_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'dia',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'local',
        timestamps: false,
    });

    return Local;
};
