const { categoryDao } = require('../models');
const dataSource = require('./dataSource')

const getMainCategories = async (categoryId) => {
    return await categoryDao.getMainCategories(categoryId)
}

const getSubCategories = async (categoryId) => {
    return await categoryDao.getSubCategories(categoryId)
}

const color = async (colorId) => {
    return await categoryDao.getColors(colorId)
}

module.exports = {
    getMainCategories,
    getSubCategories,
    color
}