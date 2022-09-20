const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models');

const validatePassword = (password) => {
    const passwordCondition =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!passwordCondition.test(password)) {
        const error = new Error('INVALID_PASSWORD')
        error.statusCode = 400
        throw error
    }
}

const validateEmail = (email) => {
    const emailCondition =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    
    if (!emailCondition.test(email)) {
        const error = new Error('INVALID_EMAIL')
        error.statusCode = 400
        throw error
    }
}

const signUp = async (name, email, password, birthday, phone_number, address, sex, profile_image) => {
        validateEmail(email)
        validatePassword(password)

        const hashPassword = await bcrypt.hash(password, 10)

        return await userDao.createUser(
            name,
            email,
            hashPassword,
            birthday,
            phone_number,
            address,
            sex,
            profile_image
        );
}

module.exports = {
    signUp
}

