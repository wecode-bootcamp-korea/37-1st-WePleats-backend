const { categoryService } = require('../services');

const mainCategories = async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getMainCategories(categoryId)
	
	res.status(201).json({ getProducts });
}

const subCategories = async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getSubCategories(categoryId)
	
	res.status(201).json({ getProducts });
}

const color = async (req, res) => {
    const { colorId } = req.params
    if (!colorId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.color(colorId)
	
	res.status(201).json({ getProducts });
}

module.exports = {
    mainCategories,
    subCategories,
    color
}