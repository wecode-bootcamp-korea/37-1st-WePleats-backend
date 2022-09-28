const { categoryService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getBestCategory = asyncWrap(async (req, res) => {
    const products = await categoryService.getBestCategory()
    
    return res.status(200).json({ category:products })
})

module.exports = {
    getBestCategory
}