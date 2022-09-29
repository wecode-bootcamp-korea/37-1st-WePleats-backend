const { orderDao, cartDao, userDao, productDao } = require("../models")


const getOrder = async ( userId ) => {
    const [ cart ] = await cartDao.getCartToCheckProduct( userId );
    if ( !cart ) {
        const err = new Error("Shopping cart not in selected products");
        err.statusCode = 403;
        throw err
    }

    const user = await userDao.getOrderUserInfo( userId );
    const products = await orderDao.getOrderProduct( userId );
    const coupons = await orderDao.getCouponToUser( userId );

    for ( const el of products ) {
        el.price = el.price * el.quantity
    }

    user.product = products;
    user.coupon = coupons;

    return user
}

const getOrderList = async ( userId ) => {
    return await orderDao.getOrderList( userId );
}

const createOrder = async ( userId, address, couponId, point, price ) => {
    const products = await cartDao.getCartToCheckProduct( userId );
    if ( products.length == 0 ) {
        const err = new Error("Shopping cart not in selected products");
        err.statusCode = 403;
        throw err;
    }

    const user = await userDao.getOrderUserInfo( userId );
    if ( user.point < point ) {
        const err = new Error("There are few points");
        err.statusCode = 400;
        throw err;
    }

    const savePoint = price * 0.05 * user.grade
    
    if ( couponId ) {
        const useCoupon = await userDao.getCoupon( userId, couponId );
        if ( !useCoupon ) {
            const err = new Error("Coupon does not exist");
            err.statusCode = 400;
            throw err;
        }
    }

    const { insertId } = await orderDao.createOrderList( price, address );
    await orderDao.createOrder( userId, products, insertId );
    await cartDao.deleteCheckProduct( userId );
    await userDao.updateCoupon( userId, couponId );
    return await userDao.updatePoint( userId, user.point - point + savePoint );
}

const createProductToOrder = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId );
    if ( !product ) {
        const err = new Error("INVALID_PRODUCT");
        err.statusCode = 406;
        throw err;
    }
  
    const { cart } = await cartDao.getCartExists( userId, productId );
    if ( +cart ) {
        await cartDao.updateCart( userId, productId, quantity );
    }

    await cartDao.addCart( userId, productId, quantity );

    return await cartDao.updateCheck( userId, productId );
}


module.exports = {
    getOrder,
    createOrder,
    getOrderList,
    createProductToOrder
}