const { reviewService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const postReview = asyncWrap(async (req, res) => {
    const { userId, productId, comment } = req.body;
    const image = req.file.location;
    if ( !productId || !comment ) {
        const err = new Error("제품ID와 코멘트는 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.postReview( userId, productId, comment, image );
    return res.status(201).json({ message: "리뷰 작성 성공" })
})

const editReview =  asyncWrap(async (req, res) => {
    const { userId, productId, comment } = req.body;
    const image = req.file.location;
    if ( !productId || !comment ) {
        const err = new Error("제품ID와 코멘트는 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.editReview( userId, productId, comment, image );
    return res.status(200).json({ message: "리뷰 수정 성공"})
})

const deleteReview = asyncWrap(async (req, res) => {
    const { userId, productId } = req.body;
    if ( !productId ) {
        const err = new Error("제품ID는 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.deleteReview( userId, productId );
    return res.status(204).json({ message: "리뷰 삭제 성공"})
})


module.exports = {
    postReview,
    editReview,
    deleteReview
}