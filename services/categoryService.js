const { categoryDao } = require('../models');

const getProductByCategory = async (category, id, color) => {
    const products = await categoryDao.getProductByCategory(category, id, color)
    return products
}

module.exports = {
    getProductByCategory
}