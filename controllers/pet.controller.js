const Pet = require("../models/pet.model")

module.exports.get = async (req, res) => {
    try {
        const pets = await Pet.find()
        const data = pets.map(pet => ({
            _id: pet._id,
            name: pet.name,
            price: pet.price,
            sellPrice: pet.sellPrice,
            goldPerSecond: pet.goldPerSecond,
            description: pet.description,
            type: pet.name.toLowerCase()
        }))

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}