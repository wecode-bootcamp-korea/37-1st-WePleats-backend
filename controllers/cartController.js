const { cartService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const showCart = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const result = await cartService.showCart( userId );
    return res.status(200).json({ cart: result })
})

const addCart = asyncWrap(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if ( !productId || !quantity ) {
        const err = new Error("제품ID와 수량은 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await cartService.addCart( userId, productId, quantity );
    return res.status(201).json({ message: "장바구니 추가"})
})

const editCart = asyncWrap(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if ( !productId || !quantity ) {
        const err = new Error("제품ID와 수량은 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await cartService.editCart( userId, productId, quantity );
    return res.status(200).json({ message: "장바구니 수정"})
})

const deleteCart = asyncWrap(async (req, res) => {
    const { userId, productId } = req.body;
    if ( !productId || !quantity ) {
        const err = new Error("제품ID는 필수 값 입니다.");
        err.statusCode = 400;
        throw err;
    }
    await cartService.deleteCart( userId, productId );
    return res.status(204).json({ message: "장바구니 물품 삭제"})
})

module.exports = {
    showCart,
    addCart,
    editCart,
    deleteCart
}