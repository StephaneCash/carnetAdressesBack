const db = require('../models');

const findUserExistWithEmail = async (email) => {
    try {
        let findUser = await db.users.findOne({ where: { email: email } });
        return findUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findUserExistWithEmail
}