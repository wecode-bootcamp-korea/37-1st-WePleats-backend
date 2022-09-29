const userService = require('./userService');
const reviewService = require("./reviewService");
const productService = require("./productService");
const cartService = require("./cartService");
const categoryService = require("./categoryService")


module.exports = {
    reviewService,
    userService,
    productService,
    cartService,
    categoryService
}