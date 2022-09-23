const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.get('/color/:colorId', categoryController.color)
router.get('/main/:categoryId', categoryController.mainCategories)
router.get('/:categoryId', categoryController.subCategories)

module.exports = router;