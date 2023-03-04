const { Wishlist } = require("../models/wishlist.model.js");
const { Product } = require("../models/product.model.js");

//@desc Get wishlist of user
//@route GET -> /wishlist
//@access Protected
const getProductsFromWishlist = async (req, res) => {
  const userID = req.userID;
  let prodArr = []
  try {
    let wishlist = await Wishlist.findOne({ userID });
    if (!wishlist) {
      const newWishlist = new Wishlist({ userID, products: [] })
      const newEmptyWishlist = await newWishlist.save();
      wishlist = newEmptyWishlist
    }
    for (i in wishlist.products) {
      const product = await Product.findById(wishlist.products[i]._id)
      let quantity = wishlist.products[i].quantity
      prodArr.push({ product, quantity })
    }
    res.status(200).json({ "sucess": true, "wishlist": prodArr })
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

//@desc Add product to user wishlist
//@route POST -> /wishlist
//@access Protected
const addProductToWishlist = async (req, res) => {
  const userID = req.userID;
  const newProduct = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userID });
    let productAlradyInWishlist = false;
    if (!wishlist) {
      const newWishlist = new Wishlist({ userID, products: [] })
      const newEmptyWishlist = await newWishlist.save();
    }
    wishlist = await Wishlist.findOne({ userID });

    //Inrement quantity if product already in wishlist
    for (item in wishlist.products) {
      if (wishlist.products[item]._id.valueOf() == newProduct._id) {
        wishlist.products[item].quantity = wishlist.products[item].quantity + 1;
        productAlradyInWishlist = true;
      }
    }

    //Add new product 
    if (!productAlradyInWishlist) {
      wishlist.products.push(newProduct);
    }

    //Save vart changes to db
    wishlist = await wishlist.save()
    res.status(200).send(wishlist)
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

//@desc Delete product from user wishlist
//@route DELETE -> /wishlist/:productId
//@access Protected
const removeProductFromWishlist = async (req, res) => {
  const userID = req.userID;
  const { productId } = req.params;
  try {
    let wishlist = await Wishlist.findOne({ userID });
    const allProducts = wishlist.products;
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

    const newWishlist = await wishlist.updateOne({ userID, products: remainingProduct })
    res.status(200).json({ "sucess": true })
  }
  catch (error) {
    res.status(500).json({ "sucess": false, "message": error })
  }
}

module.exports = {
  getProductsFromWishlist,
  addProductToWishlist,
  removeProductFromWishlist
}