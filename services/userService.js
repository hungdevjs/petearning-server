const _ = require("lodash")

const { User, Pet } = require("../models")

const { helper } = require("../utils")

const getDashboard = async userId => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error("User doesn't exist")

    const allPets = await Pet.find({})

    const userPets = user.pets.map(pet => {
        const petInfo = allPets.find(item => item._id.toString() === pet.idPet)

        const { name, price, sellPrice, goldPerSecond } = petInfo

        const samePets = user.pets.filter(item => item.idPet === pet.idPet)
        const profit = _.sumBy(samePets, pet => helper.calculateProfit({ buyTime: pet.buyTime, goldPerSecond: petInfo.goldPerSecond }))

        return {
            _id: petInfo._id,
            name,
            type: name.toLowerCase(),
            price,
            sellPrice,
            goldPerSecond,
            profit,
            quantity: samePets.length
        }
    })

    const pets = _.uniqBy(userPets, "_id")

    return {
        pets,
        gold: user.gold,
        cash: user.cash
    }
}

const exchange = async ({ userId, option, quantity }) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error("User doesn't exist")

    if (!user[option] || user[option] < quantity) throw new Error("Not enough to exchange")

    if (!["gold", "cash"].includes(option)) throw new Error("Invalid option")

    const exchangedQuantity = option === "gold"
        ? Math.round(quantity / process.env.GOLDPERCASH, 2)
        : quantity * process.env.GOLDPERCASH

    user[option] = user[option] - quantity

    if (option === "gold") {
        user.cash = user.cash + exchangedQuantity
    } else {
        user.gold = user.gold + exchangedQuantity
    }

    await user.save()
}

module.exports = {
    getDashboard,
    exchange
}