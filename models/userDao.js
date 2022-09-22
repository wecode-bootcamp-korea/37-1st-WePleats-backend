const appDataSource = require("./dataSource");

const getUserById = async ( id ) => {
    try {
        const [ user ] = await appDataSource.query(
            `SELECT
                *
            FROM users
            WHERE id = ?`,
            [ id ]
        )
        return user;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

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

module.exports = {
    getUserById,
    createUser
}