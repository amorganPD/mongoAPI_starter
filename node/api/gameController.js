'use strict';

const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');

exports.getGameInstance = function(request, response) {
  GameInstance.find({ guid: request.params.guid }, function(err, gameInstance) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else {
      response.json(gameInstance);
    }
  });
};

exports.deleteGameInstance = function(request, response) {
  GameInstance.updateOne({ guid: request.params.guid }, { _status: 'Deleted'}, function(err, gameInstance) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else {
      response.json(gameInstance);
    }
  });
};

exports.updateGameInstance = function(request, response) {
  GameInstance.updateOne({ guid: request.body.guid }, request.body, function(err, gameInstance) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else {
      response.json(gameInstance);
    }
  });
};

exports.createGameInstance = function(request, response) {
  var newGameInstance = new GameInstance(request.body);
  User.updateOne({ _id: newGameInstance.creator._id }, {$push: { gameInstances: newGameInstance.guid } }, function(err, userUpdate) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else if (userUpdate.n == 0) {
      let error = {
        noCreatorFound: true,
        description: "no user of creator _id found"
      }
      response.json(error);
    }
    else {
      newGameInstance.save(function(err, gameInstance) {
        if (err) {
          response.status(500);
          response.send(err);
        }
        else {
          response.json(gameInstance);
        }
      });
    }
  });
};

exports.addActiveUser = function(request, response) {
  User.findOne({ username: request.params.username }, function(err, user) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else if (user.length == 0) {
      let error = {
        noUserFound: true,
        description: "user " + request.params.username + " not found."
      }
      response.json(error);
    }
    else {
      GameInstance.updateOne({ guid: request.params.guid }, { $addToSet: { allUsers: user._id, activeUsers: user._id } }, function(err, usersUpdate) {
        if (err) {
          response.status(500);
          response.send(err);
        }
        else {
          response.json(usersUpdate);
        }
      });
    }
  });
};

exports.removeActiveUser = function(request, response) {
  User.findOne({ username: request.params.username }, function(err, user) {
    if (err) {
      response.status(500);
      response.send(err);
    }
    else if (user.length == 0) {
      let error = {
        noUserFound: true,
        description: "user " + request.params.username + " not found."
      }
      response.json(error);
    }
    else {
      GameInstance.updateOne({ guid: request.params.guid }, { $pull: { activeUsers: user._id } }, function(err, usersUpdate) {
        if (err) {
          response.status(500);
          response.send(err);
        }
        else {
          response.json(usersUpdate);
        }
      });
    }
  });
};