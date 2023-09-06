const db = require("../../models");
const { findEntiteByName } = require("./entitesModules");

const createEntite = async (req) => {
    try {
        const { nom, desc, commune, quartier, adresseComplete, categorieId } = req.body;
        let findEntiteExist = await findEntiteByName(nom);

        if (!nom)
            throw new Error("Le nom n'est pas défini");
        if (!desc)
            throw new Error("La description n'est pas définie");
        if (!commune)
            throw new Error("La commune n'est pas définie");
        if (!quartier)
            throw new Error("Le quartier n'est pas défini");
        if (!adresseComplete)
            throw new Error("L'adresse complète n'est pas définie");

        if (findEntiteExist) {
            throw new Error("Le nom fourni est déjà pris, veuillez trouver un autre");
        }
        if (req.file) {
            const newEntite = await db.entites.create({
                nom,
                desc,
                commune,
                quartier,
                adresseComplete,
                categorieId,
                image: req.file.path
            });
            return newEntite;
        } else {
            const newEntite = await db.entites.create({
                nom,
                desc,
                commune,
                quartier,
                adresseComplete,
                categorieId
            });
            return db.entites.findByPk(newEntite.id, { include: [{ model: db.categories, as: "categorie" }] });
        }
    } catch (error) {
        throw error;
    }
};

const fetchAllEntites = async () => {
    try {
        const data = await db.entites.findAll();
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createEntite,
    fetchAllEntites
}