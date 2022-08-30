const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/verifyUser.middleware.js")

const {
  getProductsFromCart,
  addProductToCart,
  removeProductFromCart
} = require('../../controllers/cart.controller.js')


router.use(verifyUser)
router.route('/').get(getProductsFromCart)
router.route('/').post(addProductToCart)
router.route('/:productId').delete(removeProductFromCart)

module.exports = router;