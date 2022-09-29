const { categoryDao } = require("../models");

const getNewProductsList = async() => {
    return await categoryDao.getNewProductsList()
}

const getBestCategory = async () => {
    return await categoryDao.getBestCategory()
}

module.exports = {
    getBestCategory,
    getNewProductsList
}