const { reviewDao, productDao, orderDao } = require("../models")

const postReview = async ( userId, productId, comment, image ) => {
    const searchProduct = await productDao.searchProduct( productId );
    if (!searchProduct) {
        const err = new Error("존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err
    }
    const searchOrder = await orderDao.searchOrder ( userId, productId );
    if (!searchOrder) {
        const err = new Error("구매 한 상품에 한해 리뷰가 가능합니다.");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.postReview( userId, productId, comment, image );
}

const editReview = async ( userId, productId, comment, image ) => {
    const searchProduct = await productDao.searchProduct( productId );
    if (!searchProduct) {
        const err = new Error("존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err
    }
    const review = await reviewDao.searchUserToReview ( userId, productId );
    if (!review) {
        const err = new Error("작성 된 리뷰가 없습니다.");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.editReview( review.id, comment, image ? image : review.image_url );
}

const deleteReview = async ( userId, productId ) => {
    const searchProduct = await productDao.searchProduct( productId );
    if (!searchProduct) {
        const err = new Error("존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err
    }
    const searchReview = await reviewDao.UserToReview ( userId, productId );
    if (!searchReview) {
        const err = new Error("작성 된 리뷰가 없습니다.");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.deleteReview( userId, productId )
}

module.exports = {
    postReview,
    editReview,
    deleteReview
}