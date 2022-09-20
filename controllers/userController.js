const { userService } = require('../services');


const signUp = (async (req, res) => {
    try {
        const { name, email, password, birthday, phone_number, address, sex} = req.body;

        if ( !name || !email || !password || !birthday || !phone_number || !address || !sex || profile_image ) {
            const error = new Error('KEY_ERROR')
            error.statusCode = 400
            throw error
        }

        await userService.signUp(name, email, password, birthday,phone_number, address, sex)
        return res.status(201).json({ message: '회원가입 완료!' })
    } catch(err) {
        console.log(err)
        return res.status(statusCode || 500).json({ message: err.message })
    }
})

// const signIn = async (req, res) => {
//     const { email, password } = req.body

//     const accessToken = await userService.signIn(email, password)
//     res.status(200).json({ accessToken })
// }

module.exports = {
    signUp
}