const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.get('/new', categoryController.getNewProductsList);

module.exports = router;