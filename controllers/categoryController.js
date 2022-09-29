const { categoryService } = require('../services');
const { asyncWrap } = require("../middleware/errorControl")

const getNewProductsList = asyncWrap(async (req, res) => {
    const getProducts = await categoryService.getNewProductsList()
    res.status(201).json({ getProducts })
})
    
const getProductByCategory = asyncWrap(async (req, res) => {
    const {category,id,color} = req.query
    console.log(req.query)
    if ((!category || !id )) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getProductByCategory(category, id, color)
	res.status(201).json({ getProducts });
})

const getBestCategory = asyncWrap(async (req, res) => {
    const getProducts = await categoryService.getBestCategory()
    
    return res.status(200).json({ getProducts })
})

module.exports = {
    getBestCategory,
    getNewProductsList,
    getProductByCategory
}