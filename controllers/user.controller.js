const _ = require("lodash")

const User = require("../models/user.model")
const Pet = require("../models/pet.model")

const { calculateProfit } = require("../utils/helper")

module.exports.getDashboard = async (req, res) => {
    try {
        const { userId } = req

        const user = await User.findOne({ _id: userId })
        if (!user) throw new Error("User doesn't exist")

        const allPets = await Pet.find({})

        const userPets = user.pets.map(pet => {
            const petInfo = allPets.find(item => item._id.toString() === pet.idPet)

            const { name, price, sellPrice, goldPerSecond } = petInfo

            const samePets = user.pets.filter(item => item.idPet === pet.idPet)
            const profit = _.sumBy(samePets, pet => calculateProfit({ buyTime: pet.buyTime, goldPerSecond: petInfo.goldPerSecond }))

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

        const data = {
            pets,
            gold: user.gold,
            cash: user.cash
        }

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.exchange = async (req, res) => {
    try {
        const { userId } = req
        const { option, quantity } = req.body// option = "gold" || "cash"

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

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}