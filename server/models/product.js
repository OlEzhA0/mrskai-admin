const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  title: String,
  descr: String,
  color: String,
  price: String,
  modelParam: String,
  care: String,
  composition: String,
  sizes: String,
  lastPrice: String,
  type: String,
  photos: [String],
  previewPhoto: String,
});

module.exports = mongoose.model('products', commentSchema);