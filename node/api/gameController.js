'use strict';

const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const Player = mongoose.model('Player');

exports.getGameInstance = function(request, response) {
  GameInstance.find({ guid: request.params.guid }, function(err, gameInstance) {
    if (err) {
      response.send(err);
    }
    else {
      response.json(gameInstance);
    }
  });
};

exports.createGameInstance = function(request, response) {
  var newGameInstance = new GameInstance(request.body);
  Player.countDocuments({ _id: newGameInstance.creator._id }, function(err, count) {
    if (err) {
      response.send(err);
    }
    else if (count == 0) {
      let error = {
        noCreatorFound: true,
        description: "no player of creator _id found"
      }
      response.json(error);
    }
    else {
      newGameInstance.save(function(err, gameInstance) {
        if (err) {
          response.send(err);
        }
        else {
          // Update gameInstances for the player who created the new game
          response.json(gameInstance);
        }
      });
    }
  });
};