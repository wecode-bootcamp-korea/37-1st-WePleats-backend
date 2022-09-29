const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../util/validate');

const { userDao, cartDao } = require('../models');

const signIn = async (email, password) => {
    validate.validateEmail(email)
    validate.validatePassword(password)

    const user = await userDao.getUserByEmail(email)

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const err = new Error('비밀번호가 일치하지 않습니다.')
        err.statusCode = 401

        throw err
    }

    const accessToken = jwt.sign({ user_id: user.id }, process.env.TOKKENSECRET);
    return accessToken;
}

const signUp = async (name, email, password, birthday, phone_number, address, gender, profile_image) => {
    validate.validateEmail(email)
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

const getNav = async ( userId ) => {
    const user = await userDao.getUserById( userId );
    const carts = await cartDao.getCartCount( userId );
    user.carts = carts
    const nav = {name:user.name, count:carts.count}
    return nav
}

module.exports = {
    signIn,
    signUp,
    getNav
}

