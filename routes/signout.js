const express = require('express');
const User = require('./../models/User');
const signoutRouter  = require('signout');


signoutRouter.get('/', (req, res, next) => {
    User.findById(req.session.currentUser._id)
    .then(user => {
        res.render('/')
    })
    .catch(err => console.log(err))
});

module.exports = signoutRouter;