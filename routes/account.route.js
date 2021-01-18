const express = require("express")

const router = express.Router()

const controller = require("../controllers/account.controller")

router.post("/login", controller.logIn)

module.exports = router