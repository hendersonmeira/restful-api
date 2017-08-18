const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Costumer Schema
const customerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  birthDay: Date,
  weight: Number,
  height: Number,
  sex: String,
  rich: Boolean,
  creatAt: { type: Date, default: Date.now }
})

module.exports = customerSchema
