const { categoryDao } = require('../models');

const getProductByCategory = async (category, id, color) => {
    return await categoryDao.getProductByCategory(category, id, color)
}

module.exports = {
    getProductByCategory
}