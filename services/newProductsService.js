const { newProductsDao } = require("../models");

const getNewProductsList = async() => {
    const newProducts = await newProductsDao.getNewProductsList()
    return newProducts
}

module.exports = {
    getNewProductsList
}