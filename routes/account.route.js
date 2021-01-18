const express = require("express")

const router = express.Router()

const controller = require("../controllers/account.controller")

router.post("/login", controller.logIn)

router.get("/info", controller.getInfo)

module.exports = router