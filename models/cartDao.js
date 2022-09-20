const appDataSource = require("../util/orm");

const showCart = async ( userId ) => {
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

module.exports = {
    showCart
}