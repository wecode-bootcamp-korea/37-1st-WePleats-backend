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

const editCart = asyncWrap(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if ( !productId || !quantity ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.editCart( userId, productId, quantity );
    return res.status(200).json({ message: "Edit cart to product Success"})
})

const deleteCart = asyncWrap(async (req, res) => {
    const { userId, productId } = req.body;
    if ( productId.length == 0 ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await cartService.deleteCart( userId, productId );
    const result = await cartService.showCart( userId )
    return res.status(200).json({ cart: result})
})

module.exports = {
    showCart,
    addCart,
    editCart,
    deleteCart
}