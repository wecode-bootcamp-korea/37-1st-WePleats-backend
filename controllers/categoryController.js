const { categoryService } = require('../services');

const getProductByCategory = async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getProductByCategory(categoryId)
	
	res.status(201).json({ getProducts });
}

module.exports = {
    getProductByCategory
}