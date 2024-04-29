const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Monitoring', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endpoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latency: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        uptimeState: {
            type: DataTypes.ENUM('UP', 'DELAYED', 'DOWN'),
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });
};
