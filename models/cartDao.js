const appDataSource = require("./dataSource");

const getCartExists = async ( userId, productId ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELECT EXISTS(
                SELECT
                    *
                FROM carts
                WHERE user_id = ? AND product_id = ?) AS cart`,
                [ userId, productId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getCartQuantity = async ( userId, productId ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELECT
                quantity
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

const getCartToProduct = async ( userId, productId ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELECT IF(
                COUNT(*) = ?, 1, NULL) AS cart
            FROM carts
            WHERE user_id = ? AND product_id IN (?)`,
            [ productId.length, userId, productId ]
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
                thum.thumbnail_url as thumbnailUrl,
                carts.check_in as checkIn
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
        console.log(err)
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

const getCartToCheckProduct = async ( userId ) => {
    try {
        const products = await appDataSource.query(
            `SELECT
                products.id,
                carts.quantity,
                products.price
            FROM carts INNER JOIN products ON products.id = carts.product_id
            WHERE user_id = ? AND check_in = 1`,
            [ userId ]
        )
        return products
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

const deleteCheckProduct = async ( userId ) => {
    try {
        return await appDataSource.query(
            `DELETE FROM carts
            WHERE user_id = ? AND check_in = 1`,
            [ userId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

const updateCheck = async ( userId, productId ) => {
    try {
        await appDataSource.query(
            `UPDATE carts SET
                check_in = 0
            WHERE user_id = ?`,
            [ userId ]
        )
        return await appDataSource.query(
            `UPDATE carts SET
                check_in = 1
            WHERE user_id = ? AND product_id IN (?)`,
            [ userId, productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        err.statusCode = 500;
        throw error;
    }
}

const getCartCount = async ( userId ) => {
    const [result] = await appDataSource.query(
        `SELECT
            COUNT(*) as count
        FROM carts
        WHERE user_id = ?`,
        [ userId ]
    )
    return result
}

module.exports = {
    getCartExists,
    getCartQuantity,
    getCartToProduct,
    getCart,
    addCart,
    updateCart,
    deleteCart,
    getCartToCheckProduct,
    deleteCheckProduct,
    updateCheck,
    getCartCount
}