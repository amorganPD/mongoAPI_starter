'use strict';

module.exports = function(app) {
  const user = require('./userController');

  app.route('/user/')
    .post(user.createUser)
    .put(user.updateUser);

  app.route('/user/:username')
    .get(user.getUser)
    .delete(user.deleteUser);
};