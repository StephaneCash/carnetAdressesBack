const image = require("../usesCases/images/ImageUseCase");

const createImage = async (req, res) => {
    try {
        let data = await image.create(req);
        res.status(201).json({
            status: 201,
            message: "Image créée avec succès",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const modifImage = async (req, res) => {
    try {
        let data = await image.modif(req);
        res.status(201).json({
            status: 201,
            message: "Image a été mofifiée avec succès",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        let data = await image.deleted(req);
        res.status(200).json({
            status: 200,
            message: "L'image a été supprimée avec succès",
            data: data
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createImage,
    deleteImage,
    modifImage,
}