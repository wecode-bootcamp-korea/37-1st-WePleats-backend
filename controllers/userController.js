const { userService } = require('../services');

const signIn = async (req, res) => {
    const { email, password } = req.body

    const accessToken = await userService.signIn(email, password)
    
    res.status(200).json({ accessToken })
}

module.exports = {
    signIn
}