const { userService } = require('../services');

const signIn = async (req, res) => {
    const { email, password } = req.body

    const accessToken = await userService.signIn(email, password)
    
    res.status(200).json({ accessToken })
}
const signUp = (async (req, res) => {
    try {
        const { name, email, password, birthday, phone_number, address, gender, profile_image} = req.body;

        if ( !name || !email || !password || !birthday || !phone_number || !gender ) {
            const error = new Error('KEY_ERROR')
            error.statusCode = 400
            throw error
        }

        await userService.signUp(name, email, password, birthday,phone_number, address, gender, profile_image)
        return res.status(201).json({ message: '회원가입 완료!' })
    } catch(err) {
        console.log(err)
        return res.status(statusCode || 500).json({ message: err.message })
    }
})

module.exports = {
    signIn,
    signUp
}