const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ""

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        req.userId = userInfo._id
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}