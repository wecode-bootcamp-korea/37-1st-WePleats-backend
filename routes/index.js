const express = require("express");
const router = express.Router();

const userRouter = require('./userRouter');
const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter")
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const categoryRouter = require("./categoryRouter")


router.use('/users', userRouter);
router.use("/review", reviewRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter)
router.use("/category", categoryRouter)


module.exports = router
