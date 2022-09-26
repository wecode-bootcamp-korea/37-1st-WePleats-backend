const { categoryService } = require('../services');

const getProductByCategory = async (req, res) => {
    const {main,sub,color} = req.query
    if ((!main && !sub || color) || (main && sub)) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
    }
    const getProducts = await categoryService.getProductByCategory(main, sub, color)
	console.log("main",main)
    console.log("sub",sub)
    console.log("color",color)
	res.status(201).json({ getProducts });
}



module.exports = {
    getProductByCategory
}