const { userService } = require('../services');


const signUp = (async (req, res) => {
    const { name, email, password, birthday, phone_number, address, sex} = req.body;

        if ( !name || !email || !password || !birthday || !phone_number || !address || !sex || profile_image ) {
            const error = new Error('KEY_ERROR')
            error.statusCode = 400

            throw error
        }

        const insertId = await userService.signUp(name, email, password, birthday,phone_number, address, sex)
        res.status(201).json({ insertId });
})

const signIn = async (req, res) => {
    const { email, password } = req.body

    const accessToken = await userService.signIn(email, password)
    res.status(200).json({ accessToken })
}

module.exports = {
    signUp,
    signIn
}