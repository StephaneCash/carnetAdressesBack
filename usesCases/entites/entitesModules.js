const db = require("../../models");

const findEntiteByName = async (nom) => {
    try {
        const entite = await db.entites.findOne({ where: { nom: nom } });
        return entite;
    } catch (error) {
        throw error;
    }
};

const findEntiteById = async (id) => {
    try {
        const entite = await db.entites.findByPk(id);
        return entite;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findEntiteByName,
    findEntiteById
}