const { productService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");

const getProduct = asyncWrap(async (req, res) => {
    const { productId } = req.params;

    if ( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    const detail = await productService.getProduct( productId );
    
    return res.status(200).json({ product: detail })
})

module.exports = {
    getProduct
}