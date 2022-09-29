const { categoryDao } = require("../models");

const getBestCategory = async () => {
    return await categoryDao.getBestCategory()
}

const getProductByCategory = async (category, id, color) => {
    return await categoryDao.getProductByCategory(category, id, color)
}

module.exports = {
    getBestCategory,
    getProductByCategory
}