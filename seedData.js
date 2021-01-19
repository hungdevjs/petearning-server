
const mongoose = require("mongoose")
const passwordHash = require("password-hash")
const Pet = require("./models/pet.model")

const User = require("./models/user.model")

const uri = "mongodb+srv://adminpetearning:Asdfgh1@3@cluster0.qsrxo.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const password = passwordHash.generate("Asdfgh1@3")

// console.log("Creating user...")
// async function createUser() {
//     const newUser = new User({
//         email: "hungdev.js@gmail.com",
//         password,
//         pets: []
//     })
//     await newUser.save()
// }

// createUser().then(() => console.log("Created user"))

console.log("Creating pets...")
const pets = [
    { name: "Chicken", price: 1000, sellPrice: 850 },
    { name: "Duck", price: 1200, sellPrice: 1000 },
    { name: "Pig", price: 2000, sellPrice: 1700 },
    { name: "Dog", price: 1000, sellPrice: 850 }
]

async function createPets() {
    for (const pet of pets) {
        const newPet = new Pet(pet)
        await newPet.save()
    }
}

createPets().then(() => console.log("Created pets"))