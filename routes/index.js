const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");
const userRouter = require('./userRouter');
const productRouter = require("./productRouter")
const cartRouter = require("./cartRouter")
const categoryRouter = require("./categoryRouter")


router.use('/users', userRouter);
router.use("/review", reviewRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/category", categoryRouter)


module.exports = router