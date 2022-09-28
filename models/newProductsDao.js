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
    products.new=0
    `)

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

    return newProductData
}

module.exports = {
    getNewProductsList
}