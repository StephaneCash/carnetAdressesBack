const db = require("../../models");
const { findEntiteByName, findEntiteById } = require("./entitesModules");

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
};

const updateEntite = async (req) => {

    const { id } = req.params;
    const { nom, desc, commune, quartier, adresseComplete, categorieId } = req.body;


    try {
        let entite = await findEntiteById(id);

        if (entite) {
            if (entite.nom !== nom) {
                if (req.file) {
                    let entiteUpdate = await entite.update({
                        nom,
                        desc,
                        commune,
                        quartier,
                        adresseComplete,
                        categorieId,
                        image: req.file.path
                    },
                        {
                            where: { id: id }
                        });
                    return db.entites.findByPk(entiteUpdate.id, { include: [{ model: db.categories, as: "categorie" }] });
                } else {

                    let entiteUpdate = await entite.update({
                        nom,
                        desc,
                        commune,
                        quartier,
                        adresseComplete,
                        categorieId,
                    },
                        {
                            where: { id: id }
                        });
                    return db.entites.findByPk(entiteUpdate.id, { include: [{ model: db.categories, as: "categorie" }] });
                }
            } else {
                throw new Error("Une entité porte déjà ce nom, veuillez fournir un autre")
            }
        } else {
            throw new Error("Aucune entité trouvée avec cet id " + id);
        }
    } catch (error) {
        throw error;
    }
};

const getEntityById = async (req) => {
    const { id } = req.params;
    try {
        const entite = await db.entites.findByPk(id, { include: [{ model: db.categories, as: "categorie" }] });
        if (entite) {
            return entite;
        } else {
            throw new Error("Aucune entité trouvée avec le id " + id);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createEntite,
    fetchAllEntites,
    updateEntite,
    getEntityById
}