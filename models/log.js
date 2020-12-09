module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        descriptions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        definitions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        results: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Log;
}

