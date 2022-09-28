const { userService } = require('../services');
const { asyncWrap } = require("../middleware/errorControl")
const { BaseError } = require('../util/error')

const signIn = asyncWrap(async (req, res) => {
    const { email, password } = req.body

    const accessToken = await userService.signIn(email, password)
    
    res.status(200).json({ accessToken })
})

const signUp = asyncWrap(async (req, res) => {
	const { name, email, password, birthday, phone_number, address, gender, profile_image} = req.body;

	if ( !name || !email || !password || !birthday || !phone_number || !gender ) throw new BaseError('KEY_ERROR', 400)

	await userService.signUp(name, email, password, birthday, phone_number, address, gender, profile_image)

	return res.status(201).json({ message: '회원가입 완료!' })
})

module.exports = {
    signIn,
    signUp
}
