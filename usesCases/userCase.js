const db = require('../models');
const bcrypt = require('bcrypt');
const { findUserExistByEmail, findUserById } = require('./userModules');
const jwt = require("jsonwebtoken");

const createUser = async (req) => {
    try {
        const { pseudo, email, password } = req.body;

        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!pseudo)
            throw new Error("Le pseudo n'est pas défini");

        if (!password)
            throw new Error("Le mot de passe n'est pas défini");

        if (!email) {
            throw new Error("L'adresse email n'est pas définie");
        } else {
            if (pattern.test(email)) {

                const passwordHased = await bcrypt.hash(password, 10);

                const usserExist = await findUserExistByEmail(email);

                if (usserExist) {
                    throw new Error(`Cette adresse email ${usserExist.email} existe déjà, veuillez fournir une autre`)
                }

                let newUser = await db.users.create({
                    pseudo, email, password: passwordHased
                });

                return await db.users.findByPk(newUser.id, {
                    attributes: ['pseudo', 'email', 'role', 'createdAt', 'updatedAt', "id", 'isActive', 'url'],
                });
            } else {
                throw new Error("L'adresse email fournie n'est pas valide");
            }
        }

    } catch (error) {
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const users = await db.users.findAll({
            attributes: ['pseudo', 'email', 'role', 'createdAt', 'updatedAt', "id", 'isActive', 'url'],
        });
        return users;
    } catch (error) {
        throw error;
    }
};

const authentifacation = async (req) => {
    try {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const { email, password } = req.body;

        if (!email) {
            throw new Error("L'adresse email n'est pas définie");
        } else {
            if (pattern.test(email)) {
                const usserExist = await findUserExistByEmail(email);

                if (usserExist) {
                    if (!password) {
                        throw new Error("Le mot de passe n'est pas défini");
                    } else {
                        const user = await bcrypt.compare(password, usserExist.password);
                        if (user) {
                            const token = jwt.sign({
                                id: user.id
                            },
                                process.env.PRIMARYKEY,
                                { expiresIn: "5h" }
                            );

                            return token;
                        } else {
                            throw new Error("Le mot de passe fourni est incorrect");
                        }
                    }
                } else {
                    throw new Error("L'utilisateur n'existe pas");
                }
            } else {
                throw new Error("L'adresse email fournie n'est pas valide");
            }
        }
    } catch (error) {
        throw error;
    }
}

const getOneUser = async (req) => {
    const { id } = req.params;
    try {
        let user = await findUserById(id);
        if (user) {
            return user;
        } else {
            throw new Error("Aucun utilisateur trouvé avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (req) => {
    const { id } = req.params;
    try {
        let user = await findUserById(id);
        if (user) {
            let isDestroy = await user.destroy({ where: { id: id } });
            if (isDestroy) {
                return isDestroy
            } else {
                throw new Error("L'utilisateur n'a pas été supprimé " + id);
            }
        } else {
            throw new Error("Aucun utilisateur trouvé avec l'id " + id);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    fetchUsers,
    authentifacation,
    getOneUser,
    deleteUser
}