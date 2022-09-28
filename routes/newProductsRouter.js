const express = require('express');
const { newProductsController } = require('../controllers');

const router = express.Router();

router.get('/new', newProductsController.newProducts);

module.exports = router;