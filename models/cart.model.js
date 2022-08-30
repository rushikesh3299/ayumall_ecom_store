const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  userID: { type: String },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = { Cart }