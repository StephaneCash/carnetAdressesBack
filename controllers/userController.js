const userCase = require("../usesCases/userCase");

const createUser = async (req, res) => {
    try {
        let newUser = await userCase.createUser(req);
        res.status(201).json({
            status: 201,
            message: "User créé avec succès",
            data: newUser
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        let users = await userCase.fetchUsers();
        res.status(200).json({
            status: 200,
            message: "La liste de users a été bien trouvée",
            length: users.length,
            data: users,
        })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const login = async (req, res) => {
    try {
        let userLogged = await userCase.authentifacation(req);
        res.status(200).json({
            status: 200,
            message: "Utilisateur connecté avec succès",
            data: userLogged
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        let user = await userCase.getOneUser(req);
        res.status(200).json({
            status: 200,
            message: "L'utilisateur a été trouvé avec succès",
            data: user
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let userUpdate = await userCase.updateUser(req);
        res.status(200).json({
            status: 200,
            message: "L'utilisateur a été modifié avec succès",
            data: userUpdate
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await userCase.deleteUser(req);
        res.status(200).json({
            status: 200,
            message: "L'utilisateur a été supprimé avec succès"
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    login,
    getUserById,
    deleteUser,
    updateUser
}