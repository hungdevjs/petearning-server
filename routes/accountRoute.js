const express = require("express")

const router = express.Router()

const { accountController } = require("../controllers")

router.post("/login", accountController.logIn)

router.get("/info", accountController.getInfo)

module.exports = router