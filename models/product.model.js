const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: 'Product title is required'
  },
  image: {
    type: String
  },
  brand: {
    type: String,
    required: 'Product brand is required'
  },
  price: {
    type: Number,
    required: 'Product price is required'
  },
  weight: {
    type: String,
    required: 'Product weight is required'
  },
  description: {
    type: String,
    required: 'Product description is required'
  },
  ratings: {
    type: Number,
    required: 'Product rating is required'
  },
  categoryName: {
    type: String,
    required: 'Product category is required'
  },
  fastDelivery: {
    type: Boolean,
    default: false
  },
  offer: {
    type: Number,
    default: 0
  },
  avalQty: {
    type: Number,
    required: 'Available quantity information is required'
  },
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };