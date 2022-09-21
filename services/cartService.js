const { cartDao, productDao } = require("../models");

const showCart = async ( userId ) => {
    const cart = await cartDao.showCart( userId );
    for (const object of cart) {
        object.price = (object.price * object.quantity)
    }
    return cart
}

const addCart = async ( userId, productId, quantity ) => {
    const product = await productDao.searchProduct( productId )
    if ( !product ) {
        const err = new Error("존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err;
    }

    const cart = await cartDao.findCartToProduct( userId, productId );
    if ( !cart ) {
        return await cartDao.addCart( userId, productId, quantity );
    } else {
        quantity += cart.quantity
        return await cartDao.editCart( userId, productId, quantity );
    }
}

const editCart = async ( userId, productId, quantity ) => {
    const product = await productDao.searchProduct( productId )
    if ( !product ) {
        const err = new Error("존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err;
    }
    const cart = await cartDao.findCartToProduct( userId, productId );
    if( !cart ) {
        const err = new Error("장바구니에 존재하지 않는 제품 입니다.");
        err.statusCode = 406;
        throw err;
    }
    quantity += cart.quantity
    return await cartDao.editCart( userId, productId, quantity )
}

const deleteCart = async ( userId, productId ) => {
    const cart = await cartDao.findCartToProduct( userId, productId );
    if( !cart ) {
        const err = new Error("장바구니에 존재하지 않는 제품에 입니다.");
        err.statusCode = 406;
        throw err;
    }
    return await cartDao.deleteCart( userId, productId )
}

module.exports = {
    showCart,
    addCart,
    editCart,
    deleteCart
}