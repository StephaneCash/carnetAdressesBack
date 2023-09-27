module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: "https://cdn-icons-png.flaticon.com/512/5044/5044265.png",
        },
    });

    return Image;
}