// routes/profile.js
const express = require('express');
const User = require('../models/User');
const profileRouter = express.Router();


// GET      /profile  - gets current (logged in) users profile
profileRouter.get('/', async (req, res, next) => {
  
  try {
    const user = await User.findById(req.session.currentUser._id) // from the cookie and session
    res.status(200).json(user)
  }
  catch (err) {
    res.status(500).json(err)
  } 
});

// PUT     /profile
profileRouter.put('/', async (req,res, next) => {

  try {
    const {username, password } = req.body; // request body
    const id = await req.session.currentUser._id; // from the cookie and session

    User.updateOne({_id: id},{ username, password })
    } catch(err) {
    res.status(500).json(err)
};
});

// DELETE	/profile
profileRouter.delete('/', async (req, res, next) => {

  try {
      await User.findByIdAndRemove(req.session.currentUser._id);
      req.session.destroy(function(err){
        res.status(204).send()
      })
      
    } catch(err) {
      res.status(500).json(err)
    };
});

module.exports = profileRouter;