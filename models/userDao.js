const appDataSource = require('./dataSource')

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

module.exports = {
    getUserByEmail,
    getUserById
}