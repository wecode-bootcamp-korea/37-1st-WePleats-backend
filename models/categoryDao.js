const dataSource = require('./dataSource')

const getProductByCategory = async (categoryId) => {
    const productData = await dataSource.query(`
    SELECT
        products.id,
        products.name,
        products.category,
        products.color,
        products.price,
        products.new,
        products.create_at,
        main_categorys.main_category
        categorys.sub_category
        
    FROM products
    INNER JOIN categorys
    ON products.category=categorys.id
    INNER JOIN main_categorys
    ON main_categorys.id=categorys.main_category
    WHERE main_categorys.id=?`, [categoryId]
    )
    
    const getThumbImage = 
}

module.exports = {
    getProductByCategory
}