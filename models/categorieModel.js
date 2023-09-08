module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define("categorie", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://cdn-icons-png.flaticon.com/512/5044/5044265.png",
        },
    });

    return Categorie;
}