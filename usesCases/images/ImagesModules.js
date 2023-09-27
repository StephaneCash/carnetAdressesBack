const db = require("../../models");

const findById = async (id) => {
    try {
        const image = await db.images.findByPk(id);
        return image;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findById,
}
