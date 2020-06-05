/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Dia = sequelize.define('Dia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        resumo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        gasto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        moeda_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roteiro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'dia',
        timestamps: false,
    });
    Dia.associate = models => {
     
        Dia.hasMany(models.Local, {
            foreignKey: 'dia_id',
            as: 'local'
        })
    };
    return Dia;
};
