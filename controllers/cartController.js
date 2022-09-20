const { cartService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const showCart = asyncWrap(async(req, res) => {
    const { userId } = req.body;
    const result = await cartService.showCart( userId );
    return res.status(201).json({ cart: result })
})


module.exports = {
    showCart
}