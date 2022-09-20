const express = require('express');
const router = require.Router();

const userRouter = require('./userRouter');
Router.use('/users', userRouter.router);

module.exports = router;