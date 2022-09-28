const appDataSource = require('./dataSource')
const reviewDao = require("./reviewDao");
const productDao = require("./productDao");
const userDao = require('./userDao')
const cartDao = require("./cartDao")
const newProductsDao = require("./newProductsDao")


module.exports = {
    appDataSource,
    reviewDao,
    productDao,
    userDao,
    cartDao,
    newProductsDao
}