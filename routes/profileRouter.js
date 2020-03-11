// routes/profile.js
const express = require("express");
const User = require("../models/User");
const profileRouter = express.Router();

// GET all users
profileRouter.get("/all", async (req, res, next) => {
  console.log("inside :");
  try {
    const users = await User.find();
    console.log("users :", users);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all users
profileRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  console.log("username :", username);

  try {
    const user = await User.find({ username: username });
    console.log("user :", user);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET      /profile  - gets current (logged in) users profile
profileRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate({
      path: "table",
      // Populate the nested field foodAndDrinks inside of each table
      populate: { path: "foodAndDrinks" }
    });
    // from the cookie and session
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT     /profile
profileRouter.put("/", async (req, res, next) => {
  try {
    const { username, password } = req.body; // request body
    const id = await req.session.currentUser._id; // from the cookie and session

    User.updateOne({ _id: id }, { username, password });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE	/profile
profileRouter.delete("/", async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.session.currentUser._id);
    req.session.destroy(function(err) {
      res.status(204).send();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = profileRouter;
