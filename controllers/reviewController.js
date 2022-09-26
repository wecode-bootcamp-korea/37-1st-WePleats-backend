const { reviewService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getReview = asyncWrap(async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.body
    if ( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({review: review})
})

const getPhotoReview = asyncWrap(async (req, res) => {
    const { productId } = req.query;
    const { userId } = req.body;
    if ( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    const review = await reviewService.getPhotoReview( productId, userId );
    return res.status(200).json({review: review})
})

const postReview = asyncWrap(async (req, res) => {
    const { userId, productId, comment } = req.body;
    console.log(req.body)
    const image = req.file;
    if ( !productId || !comment ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.postReview( userId, productId, comment, image );
    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({message:"Create Review Success",review: review})
})

const editReview =  asyncWrap(async (req, res) => {
    const { userId, reviewId, comment, productId } = req.body;
    const image = req.file;
    console.log(req.body)
    if ( !reviewId || !comment ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.editReview( userId, reviewId, comment, image );
    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({ message: "Update Review Success",review: review})
})

const deleteReview = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const { reviewId, productId } = req.query;
    if ( !reviewId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.deleteReview( userId, reviewId );
    const result = await reviewService.getReview( productId, userId );
    return res.status(200).json({review: result})
})


module.exports = {
    getReview,
    getPhotoReview,
    postReview,
    editReview,
    deleteReview
}