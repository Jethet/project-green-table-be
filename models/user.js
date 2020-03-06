const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Table = require('./Table');

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  imageURL: String,
  city: String,
  preferences: {vegetarian: Boolean, vegan: Boolean, glutenFree: Boolean, nonAlcohol: Boolean},
  table: [{type: Schema.Types.ObjectId, ref: 'Table'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;