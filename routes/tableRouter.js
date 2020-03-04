const express = require("express");
const Table = require("../models/Table");
const User = require("../models/User");
const tableRouter = express.Router();
const FoodAndDrinks = require("../models/FoodAndDrinks");

// POST     /table    Sends table JSON data to server, create new table
tableRouter.post("/", async (req, res, next) => {
  try {
    const {
      dateAndTime,
      address,
      city,
      foodAndDrinksArray,
      guestsIdsArray
    } = req.body; // request body

    console.log({
      dateAndTime,
      address,
      city,
      foodAndDrinksArray,
      guestsIdsArray
    });

    const user = await req.session.currentUser;

    //Update foodAndDrinks with current user id
    foodAndDrinksArray.forEach(el => {
      el.userId = user._id;
    });

    const guestsArray = guestsIdsArray.map(guestId => {
      return {
        userId: guestId
      };
    });

    const createdFoodAndDrinks = await FoodAndDrinks.create(foodAndDrinksArray);
    const createdFoodAndDrinksIds = createdFoodAndDrinks.map(foodAndDrink => {
      return foodAndDrink._id;
    });

    const table = await Table.create({
      dateAndTime,
      location: { address, city },
      userId: user._id,
      foodAndDrinks: createdFoodAndDrinksIds,
      guests: guestsArray
    });

    res.status(201).json(table);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET      /table/:id  - gets one table JSON data from server
tableRouter.get("/:id", async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id); //this params refers to what is after the /: in the url
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE	/table/:id
tableRouter.delete("/", async (req, res, next) => {
  try {
    await Table.findByIdAndRemove(req.params.id);
    req.session.destroy(function(err) {
      res.status(204).send();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = tableRouter;
