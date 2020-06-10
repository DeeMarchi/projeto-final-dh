/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Curtida = sequelize.define('Curtida', {
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
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: DataTypes.DATE,
    }, {
        freezeTableName: true,
        tableName: 'curtida',
        timestamps: false,
    });

    Curtida.associate = models => {
        Curtida.belongsTo(models.Roteiro, {
            foreignKey: 'roteiro_id',
            as: 'roteiro',
        });

        Curtida.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario',
        });
    };

    return Curtida;
};
