const { categoryDao } = require("../models");

const getBestCategory = async () => {
    return await categoryDao.getBestCategory()
}

module.exports = {
    getBestCategory
}