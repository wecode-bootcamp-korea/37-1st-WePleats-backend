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

module.exports = {
    createUser
}