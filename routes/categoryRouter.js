const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.get('', categoryController.getProductByCategory) 

module.exports = router;