// routes/signup.js
const express = require('express');
const signupRouter = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const zxcvbn = require("zxcvbn");
const saltRounds = 10;
const parser = require('../config/cloudinary');
//GET route to get signup form
signupRouter.get('/', (req, res, next) => {
    res.render('auth-views/signup');
});
//POST route to create new user
signupRouter.post('/', parser.single('photo'), (req, res, next) => {
    let imageURL;
    const { username, email, password } = req.body;
    if (!req.file){
        imageURL = '/images/user2.png';
    } else {
      imageURL = req.file.secure_url;
    };

    console.log("Print req.body", req.body)
    if (username === "" || email === "" || password === ""){
        res.render("auth-views/signup", {
          errorMessage: "Please provide the required username and password"
    });
    return;
};
    //Check if user already exists
    User.findOne({username})
    .then( (user) => {
        if(user!== null) {
            res.render("auth-views/signup", {
              errorMessage: "This username is already taken, please choose another username"
            });
            return;
         };
    // Create user with encrypted password
        const salt = bcrypt.genSaltSync(saltRounds);  
        const hashedPassword = bcrypt.hashSync(password, salt);
        User.create({username, email, password: hashedPassword, imageURL})
        .then( (createdUser) => {
            req.session.currentUser = createdUser;  // this creates a session for user to be logged in right after signup
            console.log('INSIDE');
            res.redirect('/home')
        })
        .catch(err => console.log(err))
    });
});

module.exports = signupRouter;