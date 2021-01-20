const jwt = require("jsonwebtoken")
const passwordHash = require("password-hash")
const User = require("../models/userModel")

const logIn = async userInfo => {
    const { email, password } = userInfo

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

    return { data, accessToken }
}

const getInfo = async token => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findOne({ _id: userInfo._id })
    if (!user) throw new Error("User doesn't exist")

    return {
        _id: userInfo._id,
        email: userInfo.email
    }
}

module.exports = {
    logIn,
    getInfo
}