const { accountService } = require("../services")
const { common } = require("../utils")

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const data = await accountService.logIn({ email, password })

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getInfo = async (req, res) => {
    try {
        const token = common.getToken(req)

        const data = await accountService.getInfo(token)

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    logIn,
    getInfo
}