const appDataSource = require("./dataSource");

const getCartToProduct = async ( userId, productId ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELETE
                *
            FROM carts
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getCart = async ( userId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                pro.id,
                pro.name,
                pro.price,
                carts.quantity,
                thum.thumnail_url
            FROM carts INNER JOIN products as pro ON carts.product_id = products.id
            INNER JOIN thumnail_images as thum ON thum.product_id = products.id
            WHERE carts.user_id = ?`,
            [ userId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const addCart = async ( userId, productId, quantity ) => {
    try {
        return await appDataSource.query(
            `INSERT INTO carts(
                user_id,
                product_id,
                quantity
            )VALUES(?, ?, ?)`,
            [ userId, productId, quantity ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

const updateCart = async ( userId, productId, quantity ) => {
    try {
        return await appDataSource.query(
            `UPDATE carts SET
                quantity = ?
            WHERE user_id = ? AND product_id = ?`,
            [ quantity, userId, productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

const deleteCart = async ( userId, productId ) => {
    try {
        return await appDataSource.query(
            `DELETE FROM carts
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getCartToProduct,
    getCart,
    addCart,
    updateCart,
    deleteCart
}