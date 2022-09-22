const { categoryService } = require('../services');

const mainCategories = async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
}

const subCategories = async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
}

const color = async (req, res) => {
    const { colorId } = req.params
    if (!colorId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
}

module.exports = {
    mainCategories,
    subCategories,
    color
}