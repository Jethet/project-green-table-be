// routes/profile.js
const express = require('express');
const User = require('../models/User');
const profileRouter = express.Router();
const bcrypt = require('bcrypt')
const zxcvbn = require("zxcvbn");
const saltRounds = 10;


// profileRouter.get('/', (req, res, next) => {
//     User.findById(req.session.currentUser._id)
//     .then(user => {
//         res.render('profile',{user})
//     })
//     .catch(err => console.log(err))
// });

profileRouter.post('/edit',(req,res, next)=>{
    const {username} = req.body;
    const id = req.session.currentUser._id;
    // const salt = bcrypt.genSaltSync(saltRounds);  
    // const hashedPassword = bcrypt.hashSync(password, salt);

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