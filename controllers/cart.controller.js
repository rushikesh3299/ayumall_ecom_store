const { Cart } = require("../models/cart.model.js");
const { Product } = require("../models/product.model.js");

//@desc Get cart of user
//@route GET -> /cart
//@access Protected
const getProductsFromCart = async (req, res) => {
  const userID = req.userID;
  let prodArr = []
  try {
    let cart = await Cart.findOne({ userID });
    if (!cart) {
      const newCart = new Cart({ userID, products: [] })
      const newEmptyCart = await newCart.save();
      cart = newEmptyCart
    }
    for (i in cart.products) {
      const product = await Product.findById(cart.products[i]._id)
      let quantity = cart.products[i].quantity
      prodArr.push({ product, quantity })
    }
    res.status(200).json({ "sucess": true, "cart": prodArr })
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

//@desc Add product to user cart
//@route POST -> /cart
//@access Protected
const addProductToCart = async (req, res) => {
  const userID = req.userID;
  const newProduct = req.body;

  try {
    let cart = await Cart.findOne({ userID });
    let productAlradyInCart = false;
    if (!cart) {
      const newCart = new Cart({ userID, products: [] })
      const newEmptyCart = await newCart.save();
    }
    cart = await Cart.findOne({ userID });

    //Inrement quantity if product already in cart
    for (item in cart.products) {
      if (cart.products[item]._id.valueOf() == newProduct._id) {
        cart.products[item].quantity = cart.products[item].quantity + 1;
        productAlradyInCart = true;
      }
    }

    //Add new product 
    if (!productAlradyInCart) {
      cart.products.push(newProduct);
    }

    //Save vart changes to db
    cart = await cart.save()
    res.status(200).send(cart)
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

//@desc Delete product from user cart
//@route DELETE -> /cart/:productId
//@access Protected
const removeProductFromCart = async (req, res) => {
  const userID = req.userID;
  const { productId } = req.params;
  try {
    let cart = await Cart.findOne({ userID });
    const allProducts = cart.products;
    let productToBeRemoved;

    //Remove unwanted product
    const remainingProduct = allProducts.filter(item => {
      if (item._id.valueOf() != productId) {
        return true
      }
      else {
        productToBeRemoved = item
      }
    })

    //Decrease product quantity if more than one
    if (productToBeRemoved.quantity > 1) {
      productToBeRemoved.quantity = productToBeRemoved.quantity - 1;
      remainingProduct.push(productToBeRemoved)
    }

    const newCart = await cart.updateOne({ userID, products: remainingProduct })
    res.status(200).json({ "sucess": true })
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

module.exports = {
  getProductsFromCart,
  addProductToCart,
  removeProductFromCart
}