const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: {type: String, required: true, unique: true},
  password: String,
})

module.exports = mongoose.model('Users', usersSchema);