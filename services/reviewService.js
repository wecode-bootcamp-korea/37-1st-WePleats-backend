const { reviewDao, productDao, orderDao } = require("../models")

const postReview = async ( userId, productId, comment, image ) => {
    if (image) {
        image = image.location
    }
    console.log(image)
    const searchProduct = await productDao.getProductById( productId );
    if (!searchProduct) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }
    const searchOrder = await orderDao.getOrder ( userId, productId );

    if (!searchOrder) {
        const err = new Error("Purchased products can be reviewd");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.createReview( userId, productId, comment, image );
}

const editReview = async ( userId, reviewId, comment, image ) => {
    if (image) {
        image = image.location
    }
    const review = await reviewDao.getReviewById( userId, reviewId );
    if (!review) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.updateReview( reviewId, comment, image );
}

const deleteReview = async ( userId, reviewId ) => {
    const review = await reviewDao.getReviewById( userId, reviewId );
    if (!review) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.deleteReview( reviewId )
}

module.exports = {
    postReview,
    editReview,
    deleteReview
}