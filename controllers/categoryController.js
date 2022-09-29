const { categoryService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getNewProductsList = async (req, res) => {
    const getNewProducts = await categoryService.getNewProductsList()
    res.status(201).json({ getNewProducts })
}

const getBestCategory = asyncWrap(async (req, res) => {
    const products = await categoryService.getBestCategory()
    
    return res.status(200).json({ category:products })
})

module.exports = {
    getBestCategory,
    getNewProductsList
}