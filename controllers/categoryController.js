const { categoryService } = require('../services');

const getProductByCategory = async (req, res) => {
    const {category,id,color} = req.query
    if ((!category || !id )) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getProductByCategory(category, id, color)
	res.status(201).json({ getProducts });
}



module.exports = {
    getProductByCategory
}