const { createEntite, fetchAllEntites } = require("../usesCases/entites/entitesUsesCases");

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

module.exports = {
    newEntite,
    getAllEntites
}