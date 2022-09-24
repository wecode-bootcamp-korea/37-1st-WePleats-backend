const appDataSource = require("./dataSource");

const getReview = async ( productId ) => {
    try {
        return await appDataSource.query(
            `SELECT
                id,
                user_id,
                comment,
                image_url,
                create_at
            FROM reviews
            WHERE product_id = ?`,
            [ productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getReviewByUserId = async ( userId, productId ) => {
    try {
        const [ review ] = await appDataSource.query(
            `SELECT
                *
            FROM reviews
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
        return review;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getReviewByProduct = async ( productId ) => {
    try {
        const review = await appDataSource.query(
            `SELECT
                users.name,
                rv.comment,
                rv.image_url,
                rv.create_at
            FROM reviews as rv INNER JOIN users ON rv.user_id = users.id
            WHERE product_id = ?`,
            [ productId ]
        )
        return review;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getPhotoReviewByProductId = async ( productId ) => {
    try {
        const review = await appDataSource.query(
            `SELETE
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

const deleteReview = async ( userId, productId ) => {
    try {
        return await appDataSource.query(
            `DELETE FROM reviews
            WHERE user_id = ? AND product_id = ?`,
            [ userId, productId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    getReview,
    getReviewByUserId,
    getReviewByProduct,
    getPhotoReviewByProductId,
    createReview,
    updateReview,
    deleteReview
}