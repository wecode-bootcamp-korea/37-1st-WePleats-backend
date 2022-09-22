const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.get('/productslist', categoryController.category)

module.exports = router;