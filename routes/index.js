const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter")
const newProductsRouter = require("./newProductsRouter");


router.use('/users', userRouter);
router.use("/review", reviewRouter);
router.use("/cart", cartRouter);
router.use("/category", newProductsRouter);


module.exports = router