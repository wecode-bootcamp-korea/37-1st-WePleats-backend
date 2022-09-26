const { categoryDao } = require('../models');

const getProductByCategory = async (categoryId) => {
    return await categoryDao.getProductByCategory(categoryId)
}

module.exports = {
    getProductByCategory
}