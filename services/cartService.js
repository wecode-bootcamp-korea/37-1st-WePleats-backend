const { cartDao, productDao } = require("../models");

const showCart = async ( userId ) => {
    const cart = await cartDao.getCart( userId );
    for (const object of cart) {
        object.price = ( object.price * object.quantity );
        object.deliveryfee = 0;
        if( object.price < 50000 )
        object.deliveryfee = 3000;
    }
    return cart
}

const addCart = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId );
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }
    const { cart } = await cartDao.getCartExists( userId, productId );
    if ( +cart ) {
        const num = await cartDao.getCartQuantity( userId, productId );
        quantity += num.quantity;
        return await cartDao.updateCart( userId, productId, quantity );
    }
    return await cartDao.addCart( userId, productId, quantity );
}

const checkToProduct = async ( userId, productId, check ) => {
    if ( !Array.isArray( productId ) ) {
        productId = [ productId ];
    }
    const { cart } = await cartDao.getCartToProduct( userId, productId );
    if ( !+cart ) {
        const err = new Error("Products is not in cart");
        err.statusCode = 406;
        throw err;
    }
    return await cartDao.updateCheck( userId, productId, check )
}

const editCart = async ( userId, productId, quantity ) => {
    const { cart } = await cartDao.getCartExists( userId, productId );
    if( !+cart ) {
        const err = new Error("This product not in cart");
        err.statusCode = 406;
        throw err;
    }
    return await cartDao.updateCart( userId, productId, quantity )
}

const deleteCart = async ( userId, productId ) => {
    if ( !Array.isArray( productId ) ) {
        productId = [ productId ];
    }
    const { cart } = await cartDao.getCartToProduct( userId, productId );
    if ( !+cart ) {
        const err = new Error("Products is not in cart");
        err.statusCode = 406;
        throw err;
    }
    return await cartDao.deleteCart( userId, productId );
}

const cartToOrder = async ( userId, productId ) => {
    const { cart } = await cartDao.getCartCheckProduct( userId, productId );
    if ( !+cart ) {
        const err = new Error("The product you requested does not match the product in the cart.");
        err.statusCode = 406;
        throw err;
    }
    return
}

module.exports = {
    showCart,
    addCart,
    checkToProduct,
    editCart,
    deleteCart,
    cartToOrder
}