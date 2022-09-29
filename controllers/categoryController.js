const { categoryService } = require('../services');
const { asyncWrap } = require("../middleware/errorControl")

const getNewProductsList = async (req, res) => {
    const getNewProducts = await categoryService.getNewProductsList()
    res.status(201).json({ getNewProducts })
}
    
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

const getBestCategory = asyncWrap(async (req, res) => {
    const products = await categoryService.getBestCategory()
    
    return res.status(200).json({ category:products })
})

module.exports = {
    getBestCategory,
    getNewProductsList,
    getProductByCategory
}