const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    pets: [
        new Schema({
            petId: { type: Number, required: true },
            buyTime: { type: Number, required: true },
            sellTime: { type: Number }
        })
    ],
    gold: {
        type: Number,
        required: true,
        default: 0
    },
    cash: {
        type: Number,
        required: true,
        default: 0
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User