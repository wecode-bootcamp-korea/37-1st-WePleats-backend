const { categoryDao } = require('../models');
const dataSource = require('./dataSource')

const getProductByCategory = async (categoryId) => {
    return await categoryDao.getProductByCategory(categoryId)
}

module.exports = {
    getProductByCategory
}