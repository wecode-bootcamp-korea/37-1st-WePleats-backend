const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../util/validate');

const { userDao } = require('../models');

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
    const accessToken = jwt.sign({ user_id: user.id }, process.env.JWT_KEY);
    console.log(accessToken)
    return accessToken;
}

module.exports = {
    signIn
}

