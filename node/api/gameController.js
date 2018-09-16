'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('player');

exports.getPlayer = function(request, response) {
  Player.find({ username: request.params.username }, function(err, player) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(player);
    }
  });
};

exports.createPlayer = function(request, response) {
  var newPlayer = new Player(request.body);
  newPlayer.save(function(err, player) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(player);
    }
  });
};