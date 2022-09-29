const { SimpleConsoleLogger } = require('typeorm')
const dataSource = require('./dataSource')

const getProductByCategory = async (category, id, color) => {
    const productData = await dataSource.query(`
    SELECT
        products.id,
        products.name,
        products.category,
        products.price,
        products.new,
        products.create_at,
        main_categorys.main_category,
        categorys.sub_category,
        colors.color

    FROM products
    INNER JOIN categorys
        ON products.category=categorys.id
    INNER JOIN main_categorys
        ON main_categorys.id=categorys.main_category
    LEFT JOIN colors
        ON colors.id=products.color

    WHERE
    IF(?='main', categorys.main_category=?,
        IF(?='sub', products.category=?, null)
    )
    AND IF(?=?, products.color=?, products.id)
    `, [category, id, category, id, color, color, color]
    )

    let productIds = []
    for(const product of productData) {
        productIds.push(product.id)
    }

    const productThumbnailImages = await dataSource.query(`
        SELECT
        id,
        product_id,
        thumbnail_url,
        thumbnail_main
        FROM thumbnail_images
        WHERE product_id
        IN (?)
        `, [productIds]
    )

    for(let i=0; i<=productData.length-1; i++) {
        productData[i].thumbnail_url = []
        for(let j=0; j<=productThumbnailImages.length-1; j++) {
            if (productData[i].id === productThumbnailImages[j].product_id) {
                productData[i].thumbnail_url.push(productThumbnailImages[j].thumbnail_url)
            };
        }
    }

    return productData
}

const getBestCategory = async () => {
    try {
        return await appDataSource.query(
            `SELECT
                pro.id,
                pro.name,
                pro.price,
                colors.color,
                main.main_category,
                cate.sub_category,
                cate.id as category,
                pro.new,
            JSON_ARRAYAGG(thumb.thumbnail_url) AS thumbnail_url
            FROM (SELECT
                    product_id
                    FROM orders GROUP BY product_id
                    ORDER BY sum(quantity) DESC limit 12) AS sum
            INNER JOIN products AS pro ON pro.id = sum.product_id
            INNER JOIN colors ON pro.color = colors.id
            INNER JOIN categorys AS cate ON pro.category = cate.id
            INNER JOIN main_categorys AS main ON main.id = cate.main_category
            INNER JOIN thumbnail_images AS thumb ON thumb.product_id = pro.id
            GROUP BY pro.id`
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    getBestCategory,
    getProductByCategory
}