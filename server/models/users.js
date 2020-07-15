const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: String,
  password: String,
})

module.exports = mongoose.model('Users', usersSchema);