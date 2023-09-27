const db = require("../../models");
const { findById } = require("./ImagesModules");

const create = async (req) => {
    try {
        if (req.files) {
            const { desc, entiteId } = req.body;
            let data = []
            for (let i = 0; i < req.files.length; i++) {
                let newImage = await db.images.create({
                    desc: desc,
                    entiteId: entiteId,
                    url: `api/${req.files[i].path}`,
                });
                data.push(newImage);
            }
            return data;
        }
    } catch (error) {
        throw error;
    }
}

const modif = async (req) => {
    const { id } = req.params;
    try {
        const image = await findById(id);
        if (image) {
            let imageUpdate = await image.update(
                {
                    image: req.file ? `api/${req.file.path}` : image.image,
                    entiteId: entiteId,
                }, { where: { id: id } });
            return imageUpdate;
        } else {
            throw new Error("Aucune image trouvée avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
}

const deleted = async (id) => {
    try {
        const image = await findById(id);
        if (image)
            return image.destroy({ where: { id: id } });
        else
            throw new Error('Aucune image trouvée avec le id ' + id);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    create, deleted, modif
}