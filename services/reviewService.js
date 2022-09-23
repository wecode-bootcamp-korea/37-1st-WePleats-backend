const { reviewDao, productDao, orderDao } = require("../models")

const getReview = async (productId) => {
    const searchProduct = await productDao.getProductById( productId );
    if (!searchProduct) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }
    const review = await reviewDao.getReview(productId)
    return review
}

const postReview = async ( userId, productId, comment, image ) => {
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

const editReview = async ( userId, productId, comment, image ) => {
    const searchProduct = await productDao.getProductById( productId );
    if (!searchProduct) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }
    const review = await reviewDao.getReviewByProduct ( userId, productId );
    if (!review) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.editReview( review.id, comment, image ? image : review.image_url );
}

const deleteReview = async ( userId, productId ) => {
    const searchProduct = await productDao.getProductById( productId );
    if (!searchProduct) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }
    const searchReview = await reviewDao.getReviewByProduct ( userId, productId );
    if (!searchReview) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.deleteReview( userId, productId )
}

module.exports = {
    getReview,
    postReview,
    editReview,
    deleteReview
}