const jwt = require("jsonwebtoken")
const { common } = require("../utils")

module.exports = (req, res, next) => {
    const token = common.getToken()

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        req.userId = userInfo._id
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}