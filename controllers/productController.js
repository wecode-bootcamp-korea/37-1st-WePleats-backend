const { productService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");

const getProduct = asyncWrap(async (req, res) => {
    const { productId } = req.params;

    const [ detail, review ] = await productService.getProduct(productId);
    
    return res.status(200).json({ product: detail, review: review})
})

module.exports = {
    getProduct
}
