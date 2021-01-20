const express = require("express")

const router = express.Router()

const { userController } = require("../controllers")

router.get("/dashboard", userController.getDashboard)

router.post("/exchange", userController.exchange)

module.exports = router