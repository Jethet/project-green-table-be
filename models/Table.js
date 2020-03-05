const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const tableSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { address: String, city: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  foodAndDrinks: [{ type: Schema.Types.ObjectId, ref: "FoodAndDrinks" }],
  guests: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      isComing: { type: Boolean, default: true }
    }
  ]
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
