const db = require('../../models');
const { getCategorieById, getCategorieByName } = require('./categorieModules');

const createCategorie = async (req) => {
    try {
        const { nom, desc } = req.body;
        if (!nom)
            throw new Error("Le nom n'est pas défini");
        if (!desc)
            throw new Error("La description n'est pas définie");
        let findcategorieExist = await getCategorieByName(nom);
        if (findcategorieExist) {
            throw new Error("Une catégorie porte déjà ce nom, veuillez fournir un autre nom que" + nom);
        } else {
            let newCategorie = await db.categories.create({
                nom, desc
            });
            return newCategorie
        }
    } catch (error) {
        throw error
    }
}

const fetchCategories = async () => {
    try {
        let categories = await db.categories.findAll();
        return categories;
    } catch (error) {
        throw error
    }
}

const getOneCategorie = async (req) => {
    const { id } = req.params;
    try {
        let categorie = await getCategorieById(id);

        if (categorie) {
            return categorie;
        } else {
            throw new Error("Aucune catégorie trouvée avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
};

const updateCategorie = async (req) => {
    const { id } = req.params;
    try {
        const categorie = await getCategorieById(id);
        const { nom, description } = req.body;
        if (categorie) {
            let categorieUpdate = await categorie.update({
                nom, description
            }, { where: { id: id } });
            return categorieUpdate;
        } else {
            throw new Error("Aucune catégorie trouvée avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
}

const deleteCategorie = async () => {
    const { id } = req.params;
    try {
        const categorie = await getCategorieById(id);
        if (categorie) {
            let categorieDeleted = await categorie.destroy({ where: { id: id } });
            return categorieDeleted;
        } else {
            throw new Error("Aucune catégorie trouvée avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchCategories,
    getOneCategorie,
    createCategorie,
    updateCategorie,
    deleteCategorie
}