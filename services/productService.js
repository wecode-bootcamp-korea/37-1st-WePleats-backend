const { productDao,reviewDao } = require("../models");

const getProduct = async ( productId ) => {
    const product = await productDao.getProductDetail( productId );
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }

    const reviews = await reviewDao.getReviewByProduct( productId );
    const images = await productDao.getProductImage( productId );
    product.image_url = images

    return [ product, reviews ]
}

module.exports = {
    getProduct
}