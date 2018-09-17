'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var playerSchema = new Schema({
  username: {
    type: String,
    required: 'username required',
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  displayName: {
    type: String,
    required: ''
  },
  gameInstances: [{
    type: String
  }]
});

module.exports = mongoose.model('Player', playerSchema);