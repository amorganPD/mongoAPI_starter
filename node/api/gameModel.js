'use strict';

const mongoose = require('mongoose');
const uuidGenerate = require('uuid/v4');

const Schema = mongoose.Schema;

var gameInstanceSchema = new Schema({
  guid: {
    type: String,
    unique: true,
    default: uuidGenerate
  },
  name: {
    type: String,
    required: 'name required'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: ''
  },
  usersJoined: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  usersActive: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('GameInstance', gameInstanceSchema);