const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Product Schema
const productsSchema = new Schema({
  name: String,
  vendor: String,
  quantity: Number,
  price: Number,
  weight: Number,
  purchaseData: Date,
  manufacturedData: Date,
  creatAt: { type: Date, default: Date.now }
})


module.exports = productsSchema
