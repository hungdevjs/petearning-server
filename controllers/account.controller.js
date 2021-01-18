const jwt = require("jsonwebtoken")
const passwordHash = require("password-hash")

const User = require("../models/user.model")

module.exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) throw new Error("User doesn't exist")

        const passed = passwordHash.verify(password, user.password)

        if (!passed) throw new Error("Wrong email or password")

        const data = {
            _id: user._id,
            email: user.email
        }

        const accessToken = jwt.sign(
            data,
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE }
        )

        res.status(200).json({
            data,
            accessToken
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.getInfo = async (req, res) => {
    try {
        const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : ""

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        const user = await User.findOne({ _id: userInfo._id })
        if (!user) throw new Error("User doesn't exist")

        const data = {
            _id: userInfo._id,
            email: userInfo.email
        }

        res.status(200).json({ data })
    } catch (err) {
        res.status(400).send(err.message)
    }
}