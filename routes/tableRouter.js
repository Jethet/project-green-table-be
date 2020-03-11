const express = require("express");
const { isLoggedIn } = require("../helpers/middlewares.js");
const Table = require("../models/Table");
const User = require("../models/User");
const tableRouter = express.Router();
const FoodAndDrinks = require("../models/FoodAndDrinks");

// POST     /table    Sends table JSON data to server, create new table
tableRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { date, time, address, city, foodAndDrinksArray, guestsIdsArray } = req.body; // request body

    console.log({
      date,
      time,
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

    const createdFoodAndDrinks = await FoodAndDrinks.create(foodAndDrinksArray);
    const createdFoodAndDrinksIds = createdFoodAndDrinks.map(foodAndDrink => {
      return foodAndDrink._id;
    });

    const table = await Table.create({
      date,
      time,
      address,
      city,
      userId: user._id,
      foodAndDrinks: createdFoodAndDrinksIds,
      guests: guestsIdsArray
    });

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          table: table._id
        }
      }
    );

    res.status(201).json(table);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all tables for logged in user  /table/all
tableRouter.get("/all", isLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const allTables = await Table.find({ userId });

  res.status(200).json(allTables);
});

// GET      /table/:id  - gets one table JSON data from server
tableRouter.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id); //this params refers to what is after the /: in the url
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT      /table/:id  - updates a table's JSON data and sends to server
tableRouter.put("/:id", isLoggedIn, async (req, res, next) => {
  const { date, time, address, city, foodAndDrinksArray, guestsIdsArray } = req.body;

  const id = req.params.id; // from the cookie and session
  try {
    const tableUpdated = await Table.findOneAndUpdate(
      { _id: id },
      {
        date,
        time,
        address,
        city,
        foodAndDrinksArray,
        guestsIdsArray
      },
      { new: true }
    );
    res.status(200).json(tableUpdated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE	/table/:id
tableRouter.delete("/:id", isLoggedIn, async (req, res, next) => {
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
