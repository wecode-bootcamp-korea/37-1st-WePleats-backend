const { productService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");

const detailProduct = asyncWrap(async (req, res) => {
    const { productId } = req.params;
    if ( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    const [ detail, review ] = await productService.detailProduct( productId );
    return res.status(200).json({ product: detail, review: review})
})

module.exports = {
    detailProduct
}