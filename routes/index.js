const express = requrie('express');
const router = express.Router();

const categoryRouter = require('./categoryRouter');

router.use('/category', categoryRouter);

module.exports = router;