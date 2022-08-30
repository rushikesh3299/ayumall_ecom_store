const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/verifyUser.middleware.js")

const {
  getProductsFromWishlist,
  addProductToWishlist,
  removeProductFromWishlist
} = require('../../controllers/wishlist.controller.js')


router.use(verifyUser)
router.route('/').get(getProductsFromWishlist)
router.route('/').post(addProductToWishlist)
router.route('/:productId').delete(removeProductFromWishlist)

module.exports = router;