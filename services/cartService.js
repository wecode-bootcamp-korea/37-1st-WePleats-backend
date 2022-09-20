const { cartDao } = require("../models");

const showCart = async ( userId ) => {
    const cart = await cartDao.showCart( userId );
    for (const object of cart) {
        object.price = (object.price * object.quantity)
    }
    return cart
}
module.exports = {
    showCart
}