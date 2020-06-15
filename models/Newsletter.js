/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Newsletter = sequelize.define('Newsletter', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    }, {
        freezeTableName: true,
        tableName: 'newsletter',
        timestamps: false,
    });

    return Newsletter;
};
