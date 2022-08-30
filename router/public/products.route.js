const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  addNewProduct,
  getProductById
} = require('../../controllers/products.controller.js')

router.route('/').get(getAllProducts).post(addNewProduct)

router.route('/:productId').get(getProductById)

module.exports = router;