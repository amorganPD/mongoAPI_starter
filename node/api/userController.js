'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = function(request, response) {
  User.find({ username: request.params.username }, function(err, user) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(user);
    }
  });
};

exports.updateUser = function(request, response) {
  User.updateOne({ username: request.body.username }, request.body, function(err, user) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(user);
    }
  });
};

exports.createUser = function(request, response) {
  var newUser = new User(request.body);
  newUser.save(function(err, user) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(user);
    }
  });
};