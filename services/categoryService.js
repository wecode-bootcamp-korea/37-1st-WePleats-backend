const { categoryDao } = require("../models");

const getNewProductsList = async() => {
    return await categoryDao.getNewProductsList()
}

module.exports = {
    getNewProductsList
}