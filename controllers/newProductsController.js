const { newProductsService } = require("../services");

const getNewProductsList = async (req, res) => {
    const getNewProducts = await newProductsService.getNewProductsList
    res.status(201).json({ getNewProducts })
}

module.exports = {
    getNewProductsList
}