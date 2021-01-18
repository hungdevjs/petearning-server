
const mongoose = require("mongoose")
const passwordHash = require("password-hash")

const User = require("./models/user.model")

const uri = "mongodb+srv://adminpetearning:Asdfgh1@3@cluster0.qsrxo.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const password = passwordHash.generate("Asdfgh1@3")

console.log("Creating user...")
async function createUser() {
    const newUser = new User({
        email: "hungdev.js@gmail.com",
        password,
        pets: []
    })
    await newUser.save()
}

createUser().then(() => console.log("Created user"))