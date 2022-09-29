const validatePassword = (password) => {
    const passwordCondition =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!passwordCondition.test(password)) {
        const error = new Error('옳지 않은 비밀번호')
        error.statusCode = 400
        throw error
    }
}

const validateEmail = (email) => {
    const emailCondition =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    
    if (!emailCondition.test(email)) {
        const error = new Error('옳지 않은 이메일')
        error.statusCode = 400
        throw error
    }
}

const validatePhone = (number) => {
    const phoneCondition =/^\d{3}-\d{3,4}-\d{4}$/;
    
    if (!phoneCondition.test(number)) {
        const error = new Error('옳지 않은 휴대전화 번호')
        error.statusCode = 400
        throw error
    }
}

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone
}