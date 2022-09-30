const appDataSource = require('./dataSource')

const createUser = async (name, email, password, birthday, phone_number, address, gender, profile_image) => {
    const result = await appDataSource.query(`
    INSERT INTO users (
        name,
        email,
        password,
        birthday,
        phone_number,
        address,
        gender,
        profile_image
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, password, birthday, phone_number, address, gender, profile_image]
    )
    return result.insertId
}

const getUserByEmail = async (email) => {
    const [user] = await appDataSource.query(`
    SELECT
        id,
        name,
        email,
        password
    FROM users
    WHERE email=?`, [email]
    )

    return user
}

const getUserById = async (id) => {
    const result = await appDataSource.query(`
    SELECT
        id,
        name,
        email,
        password
    FROM users
    WHERE id=?`, [id]
    )

    return result[0]
}

const getOrderUserInfo = async ( userId ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELECT
                id,
                name,
                email,
                phone_number,
                address,
                grade,
                point
            FROM users
            WHERE id = ?`,
            [ userId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}    

const getCoupon = async ( userId, coupon ) => {
    try {
        const [ result ] = await appDataSource.query(
            `SELECT
                *
            FROM user_coupons
            WHERE user_id = ? AND coupon_id = ? AND quantity != 0`,
            [ userId, coupon ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const updateCoupon = async ( userId, couponId ) => {
    try {
        return await appDataSource.query(
            `UPDATE user_coupons SET
                quantity = quantity - 1
            WHERE user_id = ? AND coupon_id = ?`,
            [ userId, couponId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const updatePoint = async ( userId, point ) => {
    try {
        console.log(point)
        return await appDataSource.query(
            `UPDATE users SET
                point = ?
            WHERE id = ?`,
            [ point, userId ]
        )   
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const setCoupon = async ( userId ) => {
    return await appDataSource.query(
        `INSERT INTO user_coupons(
            user_id,
            coupon_id,
            quantity
        )VALUES(?, 3, 2)`,
        [ userId ]
    )
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getOrderUserInfo,
    getCoupon,
    updateCoupon,
    updatePoint,
    setCoupon
}