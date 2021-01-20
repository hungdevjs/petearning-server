const { petService } = require("../services")

const get = async (req, res) => {
    try {
        const data = await petService.get()

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    get
}