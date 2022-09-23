const appDataSource = require("./dataSource");

const getOrder = async ( userId, productId ) => {
    try {
        const [ order ] = await appDataSource.query(
            `SELECT
                *
            FROM orders
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
        return order;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}



module.exports = {
    getOrder
}