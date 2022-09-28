const { reviewService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getReview = asyncWrap(async (req, res) => {
		// GET :8000/reviews?productId=1
		// GET :8000/products/1/reviews
    const { productId } = req.params;
    const { user } = req.user

    const reviews = await reviewService.getReview( productId, user.id );

    return res.status(200).json({ reviews })
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
		// PATCH :8000/reviews/1
	  const { reviewId } = req.params
    const { userId, reviewId, comment, productId } = req.body;

    const image = req.file;

    if ( !reviewId || !comment ) throw new Error("KEY_ERROR");

    await reviewService.editReview( userId, reviewId, comment, image );

    const review = await reviewService.getReview( productId, userId );

    return res.status(200).json({ message: "Update Review Success",review: review})
})

const deleteReview = asyncWrap(async (req, res) => {
		// DELETE :8000/reviews/1
    const { userId } = req.body;
    const { reviewId } = req.params;

    await reviewService.deleteReview( userId, reviewId );

    return res.status(204)
})


module.exports = {
    getReview,
    getPhotoReview,
    postReview,
    editReview,
    deleteReview
}
