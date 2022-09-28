const appDataSource = require("./dataSource");

const getNewProductsList = async () => {
    const newProductData = await appDataSource.query(`
    SELECT
        products.id,
        products.name,
        products.category,
        products.price,
        products.new,
        products.create_at,
        main_categorys.main_category,
        categorys.sub_category
    FROM products
    INNER JOIN categorys
        ON products.category=categorys.id
    INNER JOIN main_categorys
        ON main_categorys.id=categorys.main_category
    
    WHERE
    products.new=1
    `)

    let productIds = []
    for(const product of newProductData) {
        productIds.push(product.id)
    }

    const productThumbnailImages = await appDataSource.query(`
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

    for(let i=0; i<=newProductData.length-1; i++) {
        newProductData[i].thumbnail_url = []
        for(let j=0; j<=productThumbnailImages.length-1; j++) {
            if (newProductData[i].id === productThumbnailImages[j].product_id) {
                newProductData[i].thumbnail_url.push(productThumbnailImages[j].thumbnail_url)
            };
        }
    }

    return newProductData
}

module.exports = {
    getNewProductsList
}