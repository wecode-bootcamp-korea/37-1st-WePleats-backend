const { cartDao } = require("../models");

const showCart = async ( userId ) => {
    const cart = await cartDao.showCart( userId );
    let totalAmount = 0;
    let deliveryFee = 3000;
    for (const object of cart) {
        object.price = (object.price * object.quantity)
        totalAmount += object.price
    }
    if ( totalAmount > 50000 ) {
        deliveryFee = 0
    }
    cart.totalAmount = totalAmount;
    cart.deleveryFee = deliveryFee;
    return cart
}
module.exports = {
    showCart
}