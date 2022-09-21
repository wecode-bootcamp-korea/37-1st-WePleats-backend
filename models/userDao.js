const dataSource = require('../util/orm')

const createUser = async (name, email, password, birthday, phone_number, address, gender, profile_image) => {
    const result = await dataSource.query(`
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
    const [user] = await dataSource.query(`
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
    const result = await dataSource.query(`
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

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}