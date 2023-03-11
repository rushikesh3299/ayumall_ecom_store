const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  userID: { type: String },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  }]
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)
module.exports = { Wishlist }