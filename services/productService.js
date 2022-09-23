const { productDao,reviewDao } = require("../models");

const detailProduct = async ( productId ) => {
    const product = await productDao.getProductById( productId );
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }
    const detailProduct = await productDao.getProductDetail( productId );
    const productReview = await reviewDao.getReviewByProduct( productId );
    const productImage = await productDao.getProductImage( productId );
    detailProduct.image_url = productImage
    return [ detailProduct, productReview ]
}

module.exports = {
    detailProduct
}