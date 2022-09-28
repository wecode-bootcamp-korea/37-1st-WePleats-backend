const { categoryService } = require("../services");

const getNewProductsList = async (req, res) => {
    const getNewProducts = await categoryService.getNewProductsList()
    res.status(201).json({ getNewProducts })
}

module.exports = {
    getNewProductsList
}