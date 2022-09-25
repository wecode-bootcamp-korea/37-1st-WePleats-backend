const appDataSource = require("./dataSource");

const getProductById = async ( productId ) => {
    try {
        const [ product ] = await appDataSource.query(
            `SELECT
                *
            FROM products
            WHERE id = ?`,
            [ productId ]
        )
        return product;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getProductById
}