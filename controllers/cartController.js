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
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.addCart( userId, productId, quantity );
    return res.status(201).json({ message: "Add cart to product Success"})
})

const checkToProduct = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.query;
    if( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.checkToProduct( userId, productId );
    const result = await cartService.showCart( userId );
    return res.status(200).json({ cart: result})
})

const editCart = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const { productId, quantity } = req.query;
    if ( !productId || !quantity ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.editCart( userId, productId, quantity );
    const result = await cartService.showCart( userId )
    return res.status(200).json({ cart: result })
})

const deleteCart = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.query;
    if ( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.deleteCart( userId, productId );
    const result = await cartService.showCart( userId )
    return res.status(200).json({ cart: result })
})

const cartToOrder = asyncWrap(async (req, res) => {
    const { userId, productId } = req.body;
    if( !productId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.cartToOrder( userId, productId )
    return res.status(200).json({ message: "orderOK" })
})

module.exports = {
    showCart,
    addCart,
    checkToProduct,
    editCart,
    deleteCart,
    cartToOrder
}