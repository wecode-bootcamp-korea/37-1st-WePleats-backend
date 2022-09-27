const { reviewDao, productDao, orderDao } = require("../models")

const getReview = async ( productId, userId ) => {
    const searchProduct = await productDao.getProductById( productId );

    if ( !searchProduct ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }

    const review = await reviewDao.getReview( productId, userId )
    return review
}

const getPhotoReview = async ( productId, userId ) => {
    const searchProduct = await productDao.getProductById( productId );

    if ( !searchProduct ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }

    const review = await reviewDao.getPhotoReview( productId, userId )
    return review
}

const postReview = async ( userId, productId, comment, image ) => {
    const searchProduct = await productDao.getProductById( productId );
    if ( !searchProduct ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err
    }

    const searchOrder = await orderDao.getOrder( userId, productId );
    if ( !searchOrder ) {
        const err = new Error("Purchased products can be reviewd");
        err.statusCode = 403;
        throw err
    }

    const { review } = await reviewDao.getReviewExists( userId, productId );
    if ( +review ) {
        const err = new Error("Only one review can be created")
        err.statusCode = 403;
        throw err
    }
    if ( image ) image = image.location;
    return await reviewDao.createReview( userId, productId, comment, image );
}

const editReview = async ( userId, reviewId, comment, image ) => {
    const { review } = await reviewDao.checkReview( userId, reviewId );
    if ( review == 0 ) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }

    if ( image ) image = image.location;
    const { image_url } = await reviewDao.getImageToReview( reviewId );
    return await reviewDao.updateReview( reviewId, comment, image ? image : image_url );
}

const deleteReview = async ( userId, reviewId ) => {
    const { review } = await reviewDao.checkReview( userId, reviewId );
    if ( review == 0 ) {
        const err = new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    
    return await reviewDao.deleteReview( reviewId )
}

module.exports = {
    getReview,
    getPhotoReview,
    postReview,
    editReview,
    deleteReview
}