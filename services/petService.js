const Pet = require("../models/petModel")

const get = async () => {
    const pets = await Pet.find()
    return pets.map(pet => ({
        _id: pet._id,
        name: pet.name,
        price: pet.price,
        sellPrice: pet.sellPrice,
        goldPerSecond: pet.goldPerSecond,
        description: pet.description,
        type: pet.name.toLowerCase()
    }))
}

module.exports = {
    get
}