const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Connexion à la base de données a été effectuée avec succès");
    })
    .catch(err => {
        console.log(err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.categories = require("./categorieModel")(sequelize, DataTypes);
db.entites = require("./entiteModel")(sequelize, DataTypes);
db.images = require("./imagesModel")(sequelize, DataTypes);

// CATEGORIE - ADRESSE 1-N

db.categories.hasMany(db.entites, {
    as: "entites"
});

db.entites.belongsTo(db.categories, {
    foreignKey: "categorieId",
    as: "categorie"
});

// ADRESSE - IMAGE 1-N

db.entites.hasMany(db.images, {
    as: "images"
});

db.images.belongsTo(db.entites, {
    foreignKey: "entiteId",
    as: "entite"
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB SYNCHRONISEE AVEC SUCCES",)
    })
    .catch(err => {
        console.log("ERREURS DE SYNCHRONISATION DE BD : ", err);
    });

module.exports = db;