const express = require("express")

const router = express.Router()

const controller = require("../controllers/user.controller")

router.get("/dashboard", controller.getDashboard)

module.exports = router