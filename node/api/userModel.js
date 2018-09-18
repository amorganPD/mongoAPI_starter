'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: 'username required',
    unique: true
  },
  displayName: {
    type: String,
    required: ''
  },
  gameInstances: [{
    type: String
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);