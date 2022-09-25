const appDataSource = require("./dataSource");

const getReview = async ( productId ) => {
    try {
        return await appDataSource.query(
            `SELECT
                rv.id,
                users.name,
                rv.comment,
                rv.image_url,
                rv.create_at
            FROM reviews AS rv
            INNER JOIN users ON rv.user_id = users.id
            WHERE rv.product_id = ? `,
            [ productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getPhotoReview = async ( productId ) => {
    try {
        const review = await appDataSource.query(
            `SELETE
                rv.id,
                users.name,
                rv.comment,
                rv.image_url,
                rv.create_at
            FROM review as rv INNER JOIN users ON rv.user_id = users.id
            WHERE rv.image_url != "NULL" AND product_id = ?`,
            [ productId ]
        )
        return review;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
} 

const checkReview = async ( userId, reviewId ) => {
    try {
        const [ review ] = await appDataSource.query(
            `SELECT EXISTS(
                SELECT
                    *
                FROM reviews
                WHERE user_id = ? AND id = ?
            ) AS review`,
            [ userId, reviewId ]
        )
        return review;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}



const createReview = async ( userId, productId, comment, image ) => {
    try {
        return await appDataSource.query(
            `INSERT INTO reviews(
                user_id,
                product_id,
                comment,
                image_url
            )VALUES( ?, ?, ?, ? )`,
            [ userId, productId, comment, image ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const updateReview = async ( id, comment, image ) => {
    try {
        return await appDataSource.query(
            `UPDATE reviews SET
                comment = ?,
                image_url = ?
            WHERE id = ?`,
            [ comment, image, id ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const deleteReview = async ( reviewId ) => {
    try {
        return await appDataSource.query(
            `DELETE FROM reviews
            WHERE id = ?`,
            [ reviewId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    getReview,
    getPhotoReview,
    checkReview,
    createReview,
    updateReview,
    deleteReview
}