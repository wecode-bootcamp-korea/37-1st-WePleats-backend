const appDataSource = require("./dataSource");

const getCartToProduct = async ( userId, productId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                *
            FROM carts
            WHERE user_id = ? AND product_id in (?)`,
            [ userId, productId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getCartToId = async ( userId, id ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                id
            FROM carts
            WHERE user_id =? AND id in (?) `,
            [ userId, id ]
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
                carts.id,
                carts.product_id as productId,
                pro.name,
                pro.price,
                carts.quantity,
                thum.thumbnail_url as thumbnailUrl
            FROM carts INNER JOIN products as pro ON carts.product_id = pro.id
            INNER JOIN thumbnail_images as thum ON thum.product_id = pro.id
            WHERE carts.user_id = ? AND thum.thumbnail_main = 1`,
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
            WHERE user_id = ? AND product_id in (?)`,
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
    getCartToId,
    getCart,
    addCart,
    updateCart,
    deleteCart
}