const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter")
const productRouter = require("./productRouter")


router.use('/users', userRouter);
router.use("/review", reviewRouter);
router.use("/cart", cartRouter);
router.use("/product", productRouter)


module.exports = router