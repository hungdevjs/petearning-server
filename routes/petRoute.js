const express = require("express")

const router = express.Router()

const { petController } = require("../controllers")

router.get("/", petController.get)

router.post("/buy", petController.buy)

module.exports = router