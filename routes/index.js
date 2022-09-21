const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");
const userRouter = require('./userRouter');


router.use('/users', userRouter);
router.use("/review", reviewRouter);


module.exports = router