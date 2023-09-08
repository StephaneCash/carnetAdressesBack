const { createEntite, fetchAllEntites, updateEntite, getEntityById, delteEntity } = require("../usesCases/entites/entitesUsesCases");

const newEntite = async (req, res) => {
    try {
        let newEntite = await createEntite(req);
        res.status(201).json({
            status: 201,
            message: "Entité créée avec succès",
            data: newEntite
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllEntites = async (req, res) => {
    try {
        const entites = await fetchAllEntites();
        res.status(200).json({
            status: 200,
            message: "La liste des entités a été bien trouvée",
            length: entites.length,
            data: entites
        })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const editEntity = async (req, res) => {
    try {
        const entite = await updateEntite(req);
        res.status(200).json({
            status: 200,
            message: "L'entité a été bien modifiée",
            data: entite
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteEntite = async (req, res) => {
    try {
        const entite = await delteEntity(req);
        res.status(200).json({
            status: 200,
            message: "L'entité a été bien supprimé",
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getOneEntityById = async (req, res) => {
    try {
        const entite = await getEntityById(req);
        res.status(200).json({
            status: 200,
            message: "L'entité a été bien trouvée",
            data: entite
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    newEntite,
    getAllEntites,
    editEntity,
    deleteEntite,
    getOneEntityById
}