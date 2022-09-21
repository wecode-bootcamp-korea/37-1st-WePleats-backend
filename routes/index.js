const express = require("express");
const router = express.Router();

const reviewRouter = require("./reviewRouter");


router.use("/review", reviewRouter);


module.exports = router