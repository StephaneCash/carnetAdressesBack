const categorieUsesCases = require("../usesCases/categorie/categorieUseCase");

const createCategorie = async (req, res) => {
    try {
        let newCategorie = await categorieUsesCases.createCategorie(req);
        res.status(201).json({
            status: 201,
            message: "Catégorie créée avec succès",
            data: newCategorie,
        });
    } catch (error) {
        console.log(error , " ERR")
        return res.status(400).json({ message: error.message });
    }
    
};

const getAllCategories = async (req, res) => {
    try {
        let categories = await categorieUsesCases.fetchCategories();
        res.status(200).json({
            status: 200,
            message: "La liste de catégories a été bien trouvée",
            length: categories.length,
            data: categories,
        })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getCategorieById = async (req, res) => {
    try {
        let categorie = await categorieUsesCases.getOneCategorie(req);
        res.status(200).json({
            status: 200,
            message: "La catégorie a été trouvée avec succès",
            data: categorie
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const updateCategorie = async (req, res) => {
    try {
        let categorieUpdate = await categorieUsesCases.updateCategorie(req);
        res.status(200).json({
            status: 200,
            message: "La catégorie a été modifié avec succès",
            data: categorieUpdate
        })
    } catch (error) {
        return res.status(
            error.message.includes('déjà') ? 400 : 404
        ).json({ message: error.message });
    }
}

const deleteCategorie = async (req, res) => {
    try {
        let data = await categorieUsesCases.deleteCategorie(req);
        res.status(200).json({
            status: 200,
            message: "La catégorie a été supprimée avec succès",
            data: data
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createCategorie,
    getAllCategories,
    getCategorieById,
    deleteCategorie,
    updateCategorie
}