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
  allUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  activeUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  _status: {
    type: String,
    enum: ['Active', 'Deleted'],
    default: 'Active'
  },
  _dateCreated: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('GameInstance', gameInstanceSchema);