const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");
const cartRouter = require("./cartRouter");


router.use("/review", reviewRouter);
router.use("/cart", cartRouter);


module.exports = router