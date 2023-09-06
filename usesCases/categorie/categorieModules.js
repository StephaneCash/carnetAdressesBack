const db = require('../../models');

const getCategorieById = async (id) => {
    try {
        let categorie = await db.categories.findByPk(id);
        return categorie;
    } catch (error) {
        throw error;
    }
};

const getCategorieByName = async (nom) => {
    try {
        let categorie = await db.categories.findOne({where: {nom: nom}});
        return categorie;
    } catch (error) {
        throw error;
    }
};

module.exports = { getCategorieById, getCategorieByName }