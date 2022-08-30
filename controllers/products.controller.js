const { Product } = require("../models/product.model.js");

//@desc Get All Products
//@route GET -> /products
//@access Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ 'products': products, 'sucess': true })
  } catch (error) {
    res.status(500).json({ 'sucess': false })
  }
}

//@desc Add new Products
//@route POST -> /products
//@access Public
const addNewProduct = async (req, res) => {
  try {
    const receivedProduct = req.body;
    const newProduct = new Product(receivedProduct);
    const newlyAddedProduct = await newProduct.save();
    res.status(201).json({ 'product': newlyAddedProduct, 'sucess': true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ 'sucess': false })
  }
}

//@desc Get specific Product
//@route Get -> /products/:productID
//@access Public
const getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId)
    if (!product) {
      res.status(400).json({ 'sucess': false, 'message': 'Product not found' })
    }
    res.status(200).json({ 'sucess': true, 'product': product })
  } catch (error) {
    res.status(400).json({
      'sucess': false, 'message': 'Couldn\'t retrive product'
    })
  }
}

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById
}