const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');

const userValidation = require('../util/validate');
const { userDao }    = require('../models');

const signIn = async (email, password) => {
    userValidation.validateEmail(email)
    userValidation.validatePassword(password)

    const user  = await userDao.getUserByEmail(email)
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new BaseError('..', 401)

    return jwt.sign({ user_id: user.id }, process.env.JWT_KEY);
}

const signUp = async (name, email, password, birthday, phone_number, address, gender, profile_image) => {
    userValidation.validateEmail(email)
    validate.validatePassword(password)

    const hashPassword = await bcrypt.hash(password, 10)

    return await userDao.createUser(
        name,
        email,
        hashPassword,
        birthday,
        phone_number,
        address,
        gender,
        profile_image
    );
}

module.exports = {
    signIn,
    signUp
}

