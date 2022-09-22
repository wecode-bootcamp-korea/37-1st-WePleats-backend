const appDataSource = require('./dataSource')
const reviewDao = require("./reviewDao");
const productDao = require("./productDao");
const orderDao = require("./orderDao")
const userDao = require('./userDao')


module.exports = {
    appDataSource,
    reviewDao,
    productDao,
    orderDao,
    userDao
}