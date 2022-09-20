const express = require("express");
const router = express.Router();

const { cartController } = require("../controllers")


router.get("/", cartController.showCart)


module.exports = router