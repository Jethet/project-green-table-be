const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const foodAndDrinksSchema = new Schema({
  dishType: {
    type: String,
    enum: [
      "hotDish",
      "coldDish",
      "snack",
      "desert",
      "nonAlcoholDrink",
      "alcoholDrink"
    ]
  },
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isGlutenFree: { type: Boolean, default: false },
  isAlcohol: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  userType: { type: String, enum: ["guest", "host"] }
});

const FoodAndDrinks = mongoose.model("FoodAndDrinks", foodAndDrinksSchema);

module.exports = FoodAndDrinks;
