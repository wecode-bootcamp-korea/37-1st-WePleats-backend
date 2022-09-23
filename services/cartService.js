const { cartDao, productDao } = require("../models");

const showCart = async ( userId ) => {
    const cart = await cartDao.getCart( userId );
    for (const object of cart) {
        object.price = (object.price * object.quantity)
        object.deliveryfee = 0;
        if( object.price < 50000)
        object.deliveryfee = 3000;
    }
    return cart
}

const addCart = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId )
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }

    const cart = await cartDao.getCartToProduct( userId, productId );
    if ( !cart ) {
        return await cartDao.addCart( userId, productId, quantity );
    } else {
        quantity += cart.quantity
        return await cartDao.updateCart( userId, productId, quantity );
    }
}

const editCart = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId )
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }
    const cart = await cartDao.getCartToProduct( userId, productId );
    if( !cart ) {
        const err = new Error("This product not in Cart");
        err.statusCode = 406;
        throw err;
    }
    quantity += cart.quantity
    return await cartDao.updateCart( userId, productId, quantity )
}

const deleteCart = async ( userId, productId ) => {
    for(const el of productId ) {
        const cart = await cartDao.getCartToProduct( userId, el.productId )
        if( !cart ) {
            const err = new Error("This product not in Cart");
            err.statusCode = 406;
            throw err;
        }
        await cartDao.deleteCart( userId, el.productId )
    }
    return
}

module.exports = {
    showCart,
    addCart,
    editCart,
    deleteCart
}