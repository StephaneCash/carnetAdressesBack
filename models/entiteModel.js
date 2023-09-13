module.exports = (sequelize, DataTypes) => {
    const Entite = sequelize.define("entite", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        desc: {
            type: DataTypes.STRING,
        },
        commune: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quartier: {
            type: DataTypes.STRING,
        },
        adresseComplete: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://cdn-icons-png.flaticon.com/512/5044/5044265.png",
        },
        video: {
            type: DataTypes.STRING
        },
        lon: {
            type: DataTypes.DOUBLE,
        },
        lat: {
            type: DataTypes.DOUBLE,
        }
    });

    return Entite;
}