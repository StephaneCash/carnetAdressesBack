const db = require('../models');

const findUserExistByEmail = async (email) => {
    try {
        let findUser = await db.users.findOne({ where: { email: email } });
        return findUser;
    } catch (error) {
        throw error;
    }
};

const findUserById = async (id) => {
    try {
        const finduser = await db.users.findByPk(id, {
            attributes: ['pseudo', 'email', 'role', 'createdAt', 'updatedAt', "id", 'isActive', 'url'],
        });
        return finduser;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findUserExistByEmail,
    findUserById
}