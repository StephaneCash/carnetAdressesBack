const db = require("../../models");

const findEntiteByName = async (nom) => {
    try {
        const entite = await db.entites.findOne({ where: { nom: nom } });
        return entite;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findEntiteByName,
}