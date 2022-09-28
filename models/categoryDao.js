const appDataSource = require("./dataSource");

const getBestCategory = async () => {
    try {
        return await appDataSource.query(
            `select
                pro.id,
                pro.name,
                pro.price,
                colors.color,
                main.main_category,
                cate.sub_category,
                cate.id as category,
                pro.new,
            JSON_ARRAYAGG(thumb.thumbnail_url) AS thumbnail_url
            from (select
                    product_id
                    from orders group by product_id
                    order by sum(quantity) desc limit 12) as sum
            inner join products as pro on pro.id = sum.product_id
            inner join colors on pro.color = colors.id
            inner join categorys as cate on pro.category = cate.id
            inner join main_categorys as main on main.id = cate.main_category
            inner join thumbnail_images as thumb on thumb.product_id = pro.id
            group by pro.id`
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    getBestCategory
}