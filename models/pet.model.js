const mongoose = require("mongoose")

const Schema = mongoose.Schema

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    sellPrice: {
        type: Number,
        required: true,
        default: 0
    },
    goldPerSecond: {
        type: Number,
        required: true,
        default: 1
    },
    description: {
        type: String,
        required: true
    }
})

const Pet = mongoose.model("Pet", petSchema)

module.exports = Pet