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
    AND IF(?=?, products.color=1, products.id)
    `, [category, id, category, id, color, color, color]
    )

    WHERE
        if(?=?, products.category=3, )
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

    console.log(productData.length)
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

module.exports = {
    getProductByCategory
}