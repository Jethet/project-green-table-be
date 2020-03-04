// routes/profile.js
const express = require('express');
const User = require('../models/User');
const profileRouter = express.Router();
const Table = require('./Table');


profileRouter.get('/', async (req, res, next) => {

  try {
    const user = await User.findById(req.session.currentUser._id)
    // const foundTables = await Table.find({ username: user.username }) pseudo example
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

profileRouter.post('/edit',(req,res, next)=>{
    const {username} = req.body;
    const id = req.session.currentUser._id;

    User.updateOne({_id: id},{username})
    .then(user => {
        res.redirect('/profile')
    })
    .catch(err => console.log(err))
});

// DELETE	/profile/:id/delete
profileRouter.get('/delete', function(req, res, next) {
    User.findOne({
      _id: req.session.currentUser._id
    })
    .then(user => {
       req.session.destroy()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
  });

module.exports = profileRouter;