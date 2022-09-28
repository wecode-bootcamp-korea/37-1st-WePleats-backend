const { productDao,reviewDao } = require("../models");

const getProduct = async ( productId ) => {
    const product = await productDao.getProduct( productId );

    if ( !product ) throw BaseError("PRODUCT_DOES_NOT_EXISTS")

		product.reviews = await reviewDao.getReviews( productId );
    product.images  = await productDao.getProductImages( productId );

    return product
		/*
		 {
				"id" : 1,
				"name" : "모니터",
				"images" : [],
				"reviews" : [{
						"id" : 1,
						"content" : "너무 좋아요.",
						"productId" : 1
				 },
				 {
						"id" : 2,
						"content" : "너무 좋아요.",
						"productId" : 1
				 }]
		 }
		 */
}

module.exports = {
    getProduct
}
