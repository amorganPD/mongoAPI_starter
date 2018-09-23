'use strict';

module.exports = function(app) {
  const user = require('./userController');

  app.route('/api/user/')
    .post(user.createUser)
    .put(user.updateUser);

  app.route('/api/user/:username')
    .get(user.getUser)
    .delete(user.deleteUser);
};