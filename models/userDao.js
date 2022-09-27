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


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getOrderUserInfo
}