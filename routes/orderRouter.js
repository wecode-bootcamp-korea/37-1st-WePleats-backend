const express = require("express");
const router = express.Router();
const accessToken = require("../middleware/auth")

const { orderController } = require("../controllers")

router.get("", accessToken, orderController.getOrder);
router.post("", accessToken, orderController.createOrder);

module.exports = router