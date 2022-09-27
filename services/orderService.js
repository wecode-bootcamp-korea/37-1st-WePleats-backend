const { orderDao, cartDao, userDao } = require("../models")


const getOrder = async ( userId ) => {
    const { cart } = await cartDao.getProductToCheck( userId )
    if ( !+cart ) {
        const err = new Error("Shopping cart not in selected products")
        err.statusCode = 403;
        throw err
    }
    const user = await userDao.getOrderUserInfo( userId )
    const product = await orderDao.getOrderProduct( userId )
    const coupon = await orderDao.getCouponToUser( userId )
    user.product = product;
    user.coupon = coupon;
    return user
}

const createOrder = async ( userId ) => {
    const 
}

module.exports = {
    getOrder
}