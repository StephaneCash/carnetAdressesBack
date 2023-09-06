module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define("categorie", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Categorie;
}