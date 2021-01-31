const { userService } = require("../services")

const getDashboard = async (req, res) => {
    try {
        const { userId } = req

        const data = await userService.getDashboard(userId)

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const exchange = async (req, res) => {
    try {
        const { userId } = req
        const { option, quantity } = req.body // option = "gold" || "cash"

        await userService.exchange({ userId, option, quantity })

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const collect = async (req, res) => {
    try {
        const { userId } = req
        await userService.collect(userId)

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getDashboard,
    exchange,
    collect
}