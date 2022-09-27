const { orderService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getOrder = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const result = await orderService.getOrder( userId );
    return res.status(200).json({ order: result })
})

const createOrder = asyncWrap(async ( req, res) => {
    const { userId, address, coupon, point } = req.body;
    await orderService.createOrder( userId, address, coupon, point );
    return res.status(201).json({ message: "order Success"})
})

module.exports = {
    getOrder,
    createOrder
}