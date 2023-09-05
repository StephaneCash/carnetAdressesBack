module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        url: {
            type: DataTypes.STRING
        },
        isConnected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
}