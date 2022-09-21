const jwt = require("jsonwebtoken");

const accessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const access = jwt.verify(token, process.env.TOKKENSECRET);
        const userId = access.user_id;
        req.body.userId = userId;
        return next()
    } catch(err) {
        return res.status(400).json({ message: "잘못된 토큰 입니다."});
    }
};

module.exports = accessToken