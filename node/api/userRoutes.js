'use strict';

module.exports = function(app) {
  const user = require('./userController');

  app.route('/user/')
    .post(user.createUser)
    .put(user.updateUser);
    // .delete(game.deleteUser);

  app.route('/user/:username')
    .get(user.getUser);
};