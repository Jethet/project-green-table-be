const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const tableSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  foodAndDrinks: [{ type: Schema.Types.ObjectId, ref: "FoodAndDrinks" }],
  guests: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
