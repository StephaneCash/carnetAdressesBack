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
            data: users
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

module.exports = {
    createUser,
    getAllUsers,
    login
}