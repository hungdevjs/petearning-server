const _ = require("lodash")
const { Pet, User } = require("../models")

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

const buy = async (userId, pets) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error("User doesn't exist")

    const filteredPets = pets.filter(pet => pet.quantity > 0)
    const allPets = await Pet.find()

    const petToBuy = allPets
        .filter(pet => !!filteredPets.find(p => p._id === pet._id.toString()))
        .map(pet => ({
            _id: pet._id,
            price: pet.price,
            quantity: filteredPets.find(p => p._id === pet._id.toString()).quantity
        }))

    const totalPrice = _.sumBy(petToBuy, pet => pet.price * pet.quantity)
    if (totalPrice > user.gold) throw new Error("Not enough gold")

    for (const pet of petToBuy) {
        const newPets = new Array(pet.quantity).fill({ idPet: pet._id, buyTime: new Date().getTime() })
        user.pets = [
            ...user.pets,
            ...newPets
        ]
    }

    user.gold = user.gold - totalPrice

    await user.save()
}

module.exports = {
    get,
    buy
}