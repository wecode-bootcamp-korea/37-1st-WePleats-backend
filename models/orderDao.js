const appDataSource = require("../util/orm");

const searchPurchase = async ( userId, productId ) => {
    try {
        const [ purchase ] = await appDataSource.query(
            `SELECT
                *
            FROM products
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
        return purchase;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}



module.exports = {
    searchPurchase
}