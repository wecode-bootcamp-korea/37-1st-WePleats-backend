const { reviewService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const postReview = asyncWrap(async (req, res) => {
    const { userId, productId, comment } = req.body;
    const image = req.file;
    if ( !productId || !comment ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.postReview( userId, productId, comment, image );
    return res.status(201).json({ message: "Create Review Sucess" })
})

const editReview =  asyncWrap(async (req, res) => {
    const { userId, reviewId, comment } = req.body;
    const image = req.file;
    if ( !reviewId || !comment ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.editReview( userId, reviewId, comment, image );
    return res.status(200).json({ message: "Update Review Sucess"})
})

const deleteReview = asyncWrap(async (req, res) => {
    const { userId, reviewId } = req.body;
    if ( !reviewId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.deleteReview( userId, reviewId );
    return res.status(204).json({ message: "Delete Review Sucess"})
})


module.exports = {
    postReview,
    editReview,
    deleteReview
}