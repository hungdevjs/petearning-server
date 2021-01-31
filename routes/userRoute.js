const express = require("express")

const router = express.Router()

const { userController } = require("../controllers")

router.get("/dashboard", userController.getDashboard)

router.post("/exchange", userController.exchange)

router.post("/collect", userController.collect)

module.exports = router