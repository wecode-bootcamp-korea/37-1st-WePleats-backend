const appDataSource = require("./dataSource");

const getOrderProduct = async ( userId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                products.id,
                products.name,
                carts.quantity,
                thumb.thumbnail_url
            FROM products INNER JOIN carts ON products.id = carts.product_id
            INNER JOIN thumbnail_images AS thumb ON products.id = thumb.product_id
            WHERE carts.check_in = 1 AND thumb.thumbnail_main = 1 AND carts.user_id = ?`,
            [ userId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getCouponToUser = async ( userId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                coupons.id,
                coupons.coupon_money,
                user_coupons.quantity
            FROM user_coupons INNER JOIN coupons ON user_coupons.coupon_id = coupons.id
            WHERE user_coupons.user_id = ?`,
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
    getOrderProduct,
    getCouponToUser
}