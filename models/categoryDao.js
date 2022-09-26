const dataSource = require('./dataSource')

const getProductByCategory = async (main, sub, color) => {
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
    WHERE CASE
        WHEN ? = main
        THEN main_category.id
        WHEN ? = sub
        THEN categorys.id = ?
        WHEN ? = color
        THEN 

    )`, [main, sub, color]
    )
    
}

module.exports = {
    getProductByCategory
}